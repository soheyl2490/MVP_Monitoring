function init() {
    if (window.goSamples) goSamples(); // init for these samples -- you don"t need to call this

    // Since 2.2 you can also author concise templates with method chaining instead of GraphObject.make
    // For details, see https://gojs.net/latest/intro/buildingObjects.html
    const $ = go.GraphObject.make;

    myDiagram = new go.Diagram('myDiagramDiv', { 'undoManager.isEnabled': true });

    // These properties are what change an object from being a value indicator,
    // such as a needle or a bar or a thumb of a slider, to being a controller
    // that the user can drag to change the value of the instrument.
    // This assumes that the scale (a "Graduated" Panel) is named "SCALE".
    // The alwaysVisible parameter determines whether the object's visibility
    // is controlled by the "SCALE"'s Panel.isEnabled property.
    function sliderActions(alwaysVisible) {
        return [
            {
                isActionable: true,
                actionDown: (e, obj) => {
                    obj._dragging = true;
                    obj._original = obj.part.data.value;
                },
                actionMove: (e, obj) => {
                    if (!obj._dragging) return;
                    var scale = obj.part.findObject('SCALE');
                    var pt = e.diagram.lastInput.documentPoint;
                    var loc = scale.getLocalPoint(pt);
                    var val = Math.round(scale.graduatedValueForPoint(loc));
                    // just set the data.value temporarily, not recorded in UndoManager
                    e.diagram.model.commit((m) => {
                        m.set(obj.part.data, 'value', val);
                    }, null); // null means skipsUndoManager
                },
                actionUp: (e, obj) => {
                    if (!obj._dragging) return;
                    obj._dragging = false;
                    var scale = obj.part.findObject('SCALE');
                    var pt = e.diagram.lastInput.documentPoint;
                    var loc = scale.getLocalPoint(pt);
                    var val = Math.round(scale.graduatedValueForPoint(loc));
                    e.diagram.model.commit((m) => {
                        m.set(obj.part.data, 'value', obj._original);
                    }, null); // null means skipsUndoManager
                    // now set the data.value for real
                    e.diagram.model.commit((m) => {
                        m.set(obj.part.data, 'value', val);
                    }, 'dragged slider');
                },
                actionCancel: (e, obj) => {
                    obj._dragging = false;
                    e.diagram.model.commit((m) => {
                        m.set(obj.part.data, 'value', obj._original);
                    }, null); // null means skipsUndoManager
                },
            },
            alwaysVisible ? {} : new go.Binding('visible', 'isEnabled').ofObject('SCALE'),
            new go.Binding('cursor', 'isEnabled', (e) => (e ? 'pointer' : '')).ofObject('SCALE'),
        ];
    }

    // These helper functions simplify the node templates

    function commonScaleBindings() {
        return [
            new go.Binding('graduatedMin', 'min'),
            new go.Binding('graduatedMax', 'max'),
            new go.Binding('graduatedTickUnit', 'unit'),
            new go.Binding('isEnabled', 'editable'),
        ];
    }

    function commonSlider(vert) {
        return $(go.Shape,
            'RoundedRectangle',
            {
                name: 'SLIDER',
                fill: 'white',
                desiredSize: vert ? new go.Size(20, 6) : new go.Size(6, 20),
                alignment: vert ? go.Spot.Top : go.Spot.Right,
            },
            sliderActions(false)
        );
    }

    function commonNodeStyle() {
        return [
            { locationSpot: go.Spot.Center },
            { fromSpot: go.Spot.BottomRightSides, toSpot: go.Spot.TopLeftSides },
            new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        ];
    }

    myDiagram.nodeTemplateMap.add(
        'Horizontal',
        $(go.Node,
            'Auto',
            commonNodeStyle(),
            // {
            //   resizable: true,
            //   resizeObjectName: "PATH",
            //   resizeAdornmentTemplate:
            //     $(go.Adornment, "Spot",
            //       $(go.Placeholder),
            //       $(go.Shape, { fill: "dodgerblue", width: 8, height: 8, alignment: go.Spot.Right, cursor: "e-resize" }))
            // },
            $(go.Shape, { fill: 'lightgray', stroke: 'gray' }),
            $(go.Panel,
                'Table',
                { margin: 1, stretch: go.Stretch.Fill },
                // header information
                $(go.TextBlock, { row: 0, font: 'bold 10pt sans-serif' }, new go.Binding('text')),
                $(go.Panel,
                    'Spot',
                    { row: 1 },
                    $(go.Panel,
                        'Graduated',
                        { name: 'SCALE', margin: new go.Margin(0, 6), graduatedTickUnit: 10, isEnabled: false },
                        commonScaleBindings(),
                        $(go.Shape, { geometryString: 'M0 0 H200', height: 0, name: 'PATH' }),
                        $(go.Shape, { geometryString: 'M0 0 V16', alignmentFocus: go.Spot.Center, stroke: 'gray' }),
                        $(go.Shape, { geometryString: 'M0 0 V20', alignmentFocus: go.Spot.Center, interval: 5, strokeWidth: 1.5 })
                    ),
                    $(go.Panel,
                        'Spot',
                        { alignment: go.Spot.Left, alignmentFocus: go.Spot.Left, alignmentFocusName: 'BAR' },
                        // the indicator (a bar)
                        $(go.Shape,
                            { name: 'BAR', fill: 'red', strokeWidth: 0, height: 8 },
                            new go.Binding('fill', 'color'),
                            new go.Binding('desiredSize', 'value', (v, shp) => {
                                var scale = shp.part.findObject('SCALE');
                                var path = scale.findMainElement();
                                var len = ((v - scale.graduatedMin) / (scale.graduatedMax - scale.graduatedMin)) * path.geometry.bounds.width;
                                return new go.Size(len, 10);
                            })
                        ),
                        commonSlider(false)
                    )
                ),
                // state information
                $(go.TextBlock, '0', { row: 2, alignment: go.Spot.Left }, new go.Binding('text', 'min')),
                $(go.TextBlock, '100', { row: 2, alignment: go.Spot.Right }, new go.Binding('text', 'max')),
                $(go.TextBlock,
                    { row: 2, background: 'white', font: 'bold 10pt sans-serif', isMultiline: false, editable: true },
                    new go.Binding('text', 'value', (v) => v.toString()).makeTwoWay((s) => parseFloat(s))
                )
            )
        )
    );

    myDiagram.nodeTemplateMap.add(
        'Vertical',
        $(go.Node,
            'Auto',
            commonNodeStyle(),
            // {
            //   resizable: true,
            //   resizeObjectName: "PATH",
            //   resizeAdornmentTemplate:
            //     $(go.Adornment, "Spot",
            //       $(go.Placeholder),
            //       $(go.Shape, { fill: "dodgerblue", width: 8, height: 8, alignment: go.Spot.Top, cursor: "n-resize" }))
            // },
            $(go.Shape, { fill: 'lightgray', stroke: 'gray' }),
            $(go.Panel,
                'Table',
                { margin: 1, stretch: go.Stretch.Fill },
                // header information
                $(go.TextBlock, { row: 0, font: 'bold 10pt sans-serif' }, new go.Binding('text')),
                $(go.Panel,
                    'Spot',
                    { row: 1 },
                    $(go.Panel,
                        'Graduated',
                        { name: 'SCALE', margin: new go.Margin(6, 0), graduatedTickUnit: 10, isEnabled: false },
                        commonScaleBindings(),
                        // NOTE: path goes upward!
                        $(go.Shape, { geometryString: 'M0 0 V-200', width: 0, name: 'PATH' }),
                        $(go.Shape, { geometryString: 'M0 0 V16', alignmentFocus: go.Spot.Center, stroke: 'gray' }),
                        $(go.Shape, { geometryString: 'M0 0 V20', alignmentFocus: go.Spot.Center, interval: 5, strokeWidth: 1.5 })
                    ),
                    $(go.Panel,
                        'Spot',
                        { alignment: go.Spot.Bottom, alignmentFocus: go.Spot.Bottom, alignmentFocusName: 'BAR' },
                        // the indicator (a bar)
                        $(go.Shape,
                            { name: 'BAR', fill: 'red', strokeWidth: 0, height: 8 },
                            new go.Binding('fill', 'color'),
                            new go.Binding('desiredSize', 'value', (v, shp) => {
                                var scale = shp.part.findObject('SCALE');
                                var path = scale.findMainElement();
                                var len = ((v - scale.graduatedMin) / (scale.graduatedMax - scale.graduatedMin)) * path.geometry.bounds.height;
                                return new go.Size(10, len);
                            })
                        ),
                        commonSlider(true)
                    )
                ),
                // state information
                $(go.TextBlock, '0', { row: 2, alignment: go.Spot.Left }, new go.Binding('text', 'min')),
                $(go.TextBlock, '100', { row: 2, alignment: go.Spot.Right }, new go.Binding('text', 'max')),
                $(go.TextBlock,
                    { row: 2, background: 'white', font: 'bold 10pt sans-serif', isMultiline: false, editable: true },
                    new go.Binding('text', 'value', (v) => v.toString()).makeTwoWay((s) => parseFloat(s))
                )
            )
        )
    );

    myDiagram.nodeTemplateMap.add(
        'NeedleMeter',
        $(go.Node,
            'Auto',
            commonNodeStyle(),
            $(go.Shape, { fill: 'darkslategray' }),
            $(go.Panel,
                'Spot',
                $(go.Panel,
                    'Position',
                    $(go.Panel,
                        'Graduated',
                        { name: 'SCALE', margin: 10 },
                        commonScaleBindings(),
                        $(go.Shape, { name: 'PATH', geometryString: 'M0 0 A120 120 0 0 1 200 0', stroke: 'white' }),
                        $(go.Shape, { geometryString: 'M0 0 V10', stroke: 'white' }),
                        $(go.TextBlock, { segmentOffset: new go.Point(0, 12), segmentOrientation: go.Orientation.Along, stroke: 'white' })
                    ),
                    $(go.Shape,
                        { stroke: 'red', strokeWidth: 4, isGeometryPositioned: true },
                        new go.Binding('geometry', 'value', (v, shp) => {
                            var scale = shp.part.findObject('SCALE');
                            var pt = scale.graduatedPointForValue(v);
                            var geo = new go.Geometry(go.GeometryType.Line);
                            geo.startX = 100 + scale.margin.left;
                            geo.startY = 90 + scale.margin.top;
                            geo.endX = pt.x + scale.margin.left;
                            geo.endY = pt.y + scale.margin.top;
                            return geo;
                        }),
                        sliderActions(true)
                    )
                ),
                $(go.TextBlock,
                    { alignment: new go.Spot(0.5, 0.5, 0, 20), stroke: 'white', font: 'bold 10pt sans-serif' },
                    new go.Binding('text'),
                    new go.Binding('stroke', 'color')
                ),
                $(go.TextBlock,
                    { alignment: go.Spot.Top, margin: new go.Margin(4, 0, 0, 0) },
                    { stroke: 'white', font: 'bold italic 13pt sans-serif', isMultiline: false, editable: true },
                    new go.Binding('text', 'value', (v) => v.toString()).makeTwoWay((s) => parseFloat(s)),
                    new go.Binding('stroke', 'color')
                )
            )
        )
    );

    myDiagram.nodeTemplateMap.add(
        'CircularMeter',
        $(go.Node,
            'Table',
            commonNodeStyle(),
            $(go.Panel,
                'Auto',
                { row: 0 },
                $(go.Shape, 'Circle', { stroke: 'orange', strokeWidth: 5, spot1: go.Spot.TopLeft, spot2: go.Spot.BottomRight }, new go.Binding('stroke', 'color')),
                $(go.Panel,
                    'Spot',
                    $(go.Panel,
                        'Graduated',
                        {
                            name: 'SCALE',
                            margin: 14,
                            graduatedTickUnit: 2.5, // tick marks at each multiple of 2.5
                            stretch: go.Stretch.None, // needed to avoid unnecessary re-measuring!!!
                        },
                        commonScaleBindings(),
                        // the main path of the graduated panel, an arc starting at 135 degrees and sweeping for 270 degrees
                        $(go.Shape, { name: 'PATH', geometryString: 'M-70.7107 70.7107 B135 270 0 0 100 100 M0 100', stroke: 'white', strokeWidth: 4 }),
                        // three differently sized tick marks
                        $(go.Shape, { geometryString: 'M0 0 V10', stroke: 'white', strokeWidth: 1 }),
                        $(go.Shape, { geometryString: 'M0 0 V12', stroke: 'white', strokeWidth: 2, interval: 2 }),
                        $(go.Shape, { geometryString: 'M0 0 V15', stroke: 'white', strokeWidth: 3, interval: 4 }),
                        $(go.TextBlock, {
                            // each tick label
                            interval: 4,
                            alignmentFocus: go.Spot.Center,
                            font: 'bold italic 14pt sans-serif',
                            stroke: 'white',
                            segmentOffset: new go.Point(0, 30),
                        })
                    ),
                    $(go.TextBlock,
                        { alignment: new go.Spot(0.5, 0.9), stroke: 'white', font: 'bold italic 14pt sans-serif', editable: true },
                        new go.Binding('text', 'value', (v) => v.toString()).makeTwoWay((s) => parseFloat(s)),
                        new go.Binding('stroke', 'color')
                    ),
                    $(go.Shape,
                        { fill: 'red', strokeWidth: 0, geometryString: 'F1 M-6 0 L0 -6 100 0 0 6z x M-100 0' },
                        new go.Binding('angle', 'value', (v, shp) => {
                            // this determines the angle of the needle, based on the data.value argument
                            var scale = shp.part.findObject('SCALE');
                            var p = scale.graduatedPointForValue(v);
                            var path = shp.part.findObject('PATH');
                            var c = path.actualBounds.center;
                            return c.directionPoint(p);
                        }),
                        sliderActions(true)
                    ),
                    $(go.Shape, 'Circle', { width: 2, height: 2, fill: '#444' })
                )
            ),
            $(go.TextBlock, { row: 1, font: 'bold 11pt sans-serif' }, new go.Binding('text'))
        )
    );

    myDiagram.nodeTemplateMap.add(
        'BarMeter',
        $(go.Node,
            'Table',
            commonNodeStyle(),
            { scale: 0.8 },
            $(go.Panel,
                'Auto',
                { row: 0 },
                $(go.Shape, 'Circle', { stroke: 'orange', strokeWidth: 5, spot1: go.Spot.TopLeft, spot2: go.Spot.BottomRight }, new go.Binding('stroke', 'color')),
                $(go.Panel,
                    'Spot',
                    $(go.Panel,
                        'Graduated',
                        {
                            name: 'SCALE',
                            margin: 14,
                            graduatedTickUnit: 2.5, // tick marks at each multiple of 2.5
                            stretch: go.Stretch.None, // needed to avoid unnecessary re-measuring!!!
                        },
                        commonScaleBindings(),
                        // the main path of the graduated panel, an arc starting at 135 degrees and sweeping for 270 degrees
                        $(go.Shape, { name: 'PATH', geometryString: 'M-70.7107 70.7107 B135 270 0 0 100 100 M0 100', stroke: 'white', strokeWidth: 4 }),
                        // three differently sized tick marks
                        $(go.Shape, { geometryString: 'M0 0 V10', stroke: 'white', strokeWidth: 1 }),
                        $(go.Shape, { geometryString: 'M0 0 V12', stroke: 'white', strokeWidth: 2, interval: 2 }),
                        $(go.Shape, { geometryString: 'M0 0 V15', stroke: 'white', strokeWidth: 3, interval: 4 }),
                        $(go.TextBlock, {
                            // each tick label
                            interval: 4,
                            alignmentFocus: go.Spot.Center,
                            font: 'bold italic 14pt sans-serif',
                            stroke: 'white',
                            segmentOffset: new go.Point(0, 30),
                        })
                    ),
                    $(go.TextBlock,
                        { alignment: go.Spot.Center, stroke: 'white', font: 'bold italic 14pt sans-serif', editable: true },
                        new go.Binding('text', 'value', (v) => v.toString()).makeTwoWay((s) => parseFloat(s)),
                        new go.Binding('stroke', 'color')
                    ),
                    $(go.Shape,
                        { fill: 'red', strokeWidth: 0 },
                        new go.Binding('geometry', 'value', (v, shp) => {
                            var scale = shp.part.findObject('SCALE');
                            var p0 = scale.graduatedPointForValue(scale.graduatedMin);
                            var pv = scale.graduatedPointForValue(v);
                            var path = shp.part.findObject('PATH');
                            var radius = path.actualBounds.width / 2;
                            var c = path.actualBounds.center;
                            var a0 = c.directionPoint(p0);
                            var av = c.directionPoint(pv);
                            var sweep = av - a0;
                            if (sweep < 0) sweep += 360;
                            var layerThickness = 8;
                            return new go.Geometry()
                                .add(new go.PathFigure(-radius, -radius)) // always make sure the Geometry includes the top left corner
                                .add(new go.PathFigure(radius, radius)) // and the bottom right corner of the whole circular area
                                .add(
                                    new go.PathFigure(p0.x - radius, p0.y - radius)
                                        .add(new go.PathSegment(go.SegmentType.Arc, a0, sweep, 0, 0, radius, radius))
                                        .add(new go.PathSegment(go.SegmentType.Line, pv.x - radius, pv.y - radius))
                                        .add(new go.PathSegment(go.SegmentType.Arc, av, -sweep, 0, 0, radius - layerThickness, radius - layerThickness).close())
                                );
                        }),
                        sliderActions(true)
                    ),
                    $(go.Shape, 'Circle', { width: 2, height: 2, fill: '#444' })
                )
            ),
            $(go.TextBlock, { row: 1, font: 'bold 11pt sans-serif' }, new go.Binding('text'))
        )
    );

    myDiagram.linkTemplate = $(go.Link,
        { routing: go.Routing.AvoidsNodes, corner: 12 },
        $(go.Shape, { isPanelMain: true, stroke: 'gray', strokeWidth: 9 }),
        $(go.Shape, { isPanelMain: true, stroke: 'lightgray', strokeWidth: 5 }),
        $(go.Shape, { isPanelMain: true, stroke: 'whitesmoke' })
    );

    myDiagram.model = new go.GraphLinksModel(
        [
            { key: 2, value: 23, text: 'Circular Meter', category: 'CircularMeter', loc: '250 -120', editable: true, color: 'skyblue' },
            { key: 3, value: 56, text: 'Needle Meter', category: 'NeedleMeter', loc: '250 110', editable: true, color: 'lightsalmon' },
            { key: 5, value: 23, max: 200, unit: 5, text: 'Bar Meter', category: 'BarMeter', loc: '550 200', editable: true, color: 'orange' },
        ],
        [
        ]
    );

    loop(); // start a simple simulation
}

function loop() {
    setTimeout(() => {
        myDiagram.commit((diag) => {
            diag.links.each((l) => {
                if (Math.random() < 0.2) return;
                var prev = l.fromNode.data.value;
                var now = l.toNode.data.value;
                if (prev > (l.fromNode.data.min || 0) && now < (l.toNode.data.max || 100)) {
                    diag.model.set(l.fromNode.data, 'value', prev - 1);
                    diag.model.set(l.toNode.data, 'value', now + 1);
                }
            });
        });
        loop();
    }, 500);
}
window.addEventListener('DOMContentLoaded', init);