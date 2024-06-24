var data = {
    "class": "GraphLinksModel",
    "nodeDataArray": [
        { "key": 1, "pos": "-770 100", "icon": "ballMer", "color": "blue", "text": "بالمیل مدولار", "description": "", "imgsrc": "" },
        { "key": 2, "pos": "-670 100", "icon": "ballMer", "color": "blue", "text": "بالمیل مدولار", "description": "", "imgsrc": "" },
        { "key": 3, "pos": "-390 20", "icon": "ballMer", "color": "blue", "text": "بالمیل کانتینیوز 1", "description": "", "imgsrc": "" },
        { "key": 4, "pos": "-390 170", "icon": "ballMer", "color": "red", "text": "بالمیل کانتینیوز 2", "description": "", "imgsrc": "" },
        { "key": 5, "pos": "-150 -20", "icon": "ballMer", "color": "blue", "text": "بالمیل بچ 7", "description": "", "imgsrc": "" },
        { "key": 6, "pos": "-150 120", "icon": "ballMer", "color": "red", "text": "بالمیل بچ 6", "description": "", "imgsrc": "" },
        { "key": 7, "pos": "-150 250", "icon": "ballMer", "color": "blue", "text": "بالمیل بچ 5", "description": "", "imgsrc": "" },
        { "key": 8, "pos": "-250 320", "icon": "ballMer", "color": "blue", "text": "بالمیل بچ 4", "description": "", "imgsrc": "" },
        { "key": 9, "pos": "-250 180", "icon": "ballMer", "color": "blue", "text": "بالمیل بچ 3", "description": "", "imgsrc": "" },
        { "key": 10, "pos": "-250 10", "icon": "ballMer", "color": "blue", "text": "بالمیل بچ 2", "description": "", "imgsrc": "" },
        { "key": 11, "pos": "-250 -100", "icon": "ballMer", "color": "blue", "text": "بالمیل بچ 1", "description": "", "imgsrc": "" },
        { "key": 12, "pos": "-50 250", "icon": "funnel", "color": "green", "text": "اسپری درایر A", "description": "", "imgsrc": "" },
        { "key": 13, "pos": "-50 120", "icon": "funnel", "color": "blue", "text": "اسپری درایر B", "description": "", "imgsrc": "" },
        { "key": 14, "pos": "-50 -20", "icon": "funnel", "color": "blue", "text": "اسپری درایر C", "description": "", "imgsrc": "" },
        { "key": 15, "pos": "50 150", "icon": "factory", "color": "blue", "text": "سیلو خاک A", "description": "", "imgsrc": "" },
        { "key": 16, "pos": "50 20", "icon": "factory", "color": "blue", "text": "سیلو خاک B&C", "description": "", "imgsrc": "" },
    ],
    "linkDataArray": [
        { "from": 1, "to": 2 },
        { "from": 2, "to": 3 },
        { "from": 2, "to": 4 },
        { "from": 3, "to": 11 },
        { "from": 3, "to": 10 },
        { "from": 4, "to": 8 },
        { "from": 4, "to": 9 },
        { "from": 11, "to": 5 },
        { "from": 10, "to": 5 },
        { "from": 10, "to": 6 },
        { "from": 9, "to": 7 },
        { "from": 8, "to": 7 },
        { "from": 9, "to": 6 },
        { "from": 5, "to": 14 },
        { "from": 6, "to": 13 },
        { "from": 7, "to": 12 },
        { "from": 12, "to": 15 },
        { "from": 13, "to": 16 },
        { "from": 14, "to": 16 },
    ]
}

function init() {
    // Abstract colors
    var Colors = {
        red: '#be4b15',
        green: '#52ce60',
        blue: '#6ea5f8',
        lightred: '#fd8852',
        lightblue: '#afd4fe',
        lightgreen: '#b9e986',
        pink: '#faadc1',
        purple: '#d689ff',
        orange: '#f08c00',
    };

    var ColorNames = [];
    for (var n in Colors) ColorNames.push(n);

    // a conversion function for translating general color names to specific colors
    function colorFunc(colorname) {
        var c = Colors[colorname];
        if (c) return c;
        return 'gray';
    }


    // Icons derived from SVG paths designed by freepik: http://www.freepik.com/
    var Icons = {};
    Icons.ballMer =
        'F M98.5,77.4c-2.3,0-4.2,1.9-4.2,4.2c0,2.3,1.9,4.2,4.2,4.2s4.2-1.9,4.2-4.2C102.7,79.3,100.8,77.4,98.5,77.4z\
        M98.5,119.6c-2.3,0-4.2,1.9-4.2,4.2c0,2.3,1.9,4.2,4.2,4.2s4.2-1.9,4.2-4.2C102.7,121.4,100.8,119.6,98.5,119.6z\
        M140.6,77.4c-2.3,0-4.2,1.9-4.2,4.2c0,2.3,1.9,4.2,4.2,4.2s4.2-1.9,4.2-4.2C144.9,79.3,143,77.4,140.6,77.4z\
        M140.6,119.6c-2.3,0-4.2,1.9-4.2,4.2c0,2.3,1.9,4.2,4.2,4.2s4.2-1.9,4.2-4.2C144.9,121.4,143,119.6,140.6,119.6z\
        M237.6,77.4c-0.6-0.5-2.3-8.4-8.4-8.4h-16.9c-3.9,0-6.8,5.1-8.4,8.4H187V43.7c0-5.5-7.2-4.2-12.6-4.2c-3.9,0-6.8,0.9-8.4,4.2H77.4c0-5.5-3-8.4-8.4-8.4H52.1c-5.5,0-8.4,3-8.4,8.4V69H31.1c-5.5,0-8.4,3-8.4,8.4h-4.2c-5.5,0-8.4,3-8.4,8.4v33.7c0,5.5,3,8.4,8.4,8.4c0,5.5,3,8.4,8.4,8.4V187c-5.5,0-8.4,3-8.4,8.4v16.9c0,5.5,3,8.4,8.4,8.4H202c5.5,0,9.9-4.5,9.9-9.9v-13.9c0-5.5-2.6-9.9-8-9.9v-50.6V128c1.6,3.3,4.5,8.4,8.4,8.4h16.9c5.6,0,7.9-8,8.4-8.4c0,0,8.4-13.6,8.4-16.9V94.3C246,91.8,237.6,77.4,237.6,77.4z M22.6,119.6h-4.2V85.9h4.2V119.6z M170.1,52.1h8.4v101.1h-8.4V52.1z M73.2,52.1h92.7v101.1H73.2V52.1z M77.4,161.7h88.5c0,0,0,4.2,8.4,4.2c12.6,0,12.6-4.2,12.6-4.2V128h8.4v42.1v8.4v8.4H35.3v-8.4v-8.4v-33.7h8.4v33.7H69C74.5,170.1,77.4,167.2,77.4,161.7z M52.1,43.7H69v16.9H52.1V43.7z M52.1,64.8H69v21.1H52.1V64.8z M52.1,91.5H69v22.3H52.1V91.5z M52.1,119.6H69v20.7H52.1V119.6z M52.1,144.9H69v16.9H52.1V144.9z M26.9,77.4h21.5V128H26.9V77.4z M203.9,212.3h-177v-16.9h177V212.3z M207.6,119.6H187V85.9h20.6V119.6z M237.6,111.1l-8.4,16.9h-16.9V77.4h16.9l8.4,16.9V111.1z';

    Icons.funnel =
        'F M 36.962 88.228 c -0.525 0 -1.051 -0.138 -1.52 -0.413 c -0.917 -0.539 -1.48 -1.523 -1.48 -2.587 V 47.806 c 0 -2.227 -0.812 -4.373 -2.287 -6.042 L 0.751 6.758 c -0.781 -0.884 -0.971 -2.144 -0.486 -3.22 C 0.75 2.463 1.82 1.772 3 1.772 h 16.394 c 1.657 0 3 1.343 3 3 s -1.343 3 -3 3 h -9.74 l 26.52 30.019 c 2.444 2.767 3.79 6.324 3.79 10.015 V 80.12 l 10.076 -5.618 V 47.806 c 0 -3.692 1.346 -7.248 3.79 -10.015 L 80.347 7.772 H 34.021 c -1.657 0 -3 -1.343 -3 -3 s 1.343 -3 3 -3 H 87 c 1.18 0 2.25 0.691 2.734 1.767 c 0.485 1.076 0.295 2.335 -0.486 3.22 L 58.324 41.764 c -1.475 1.669 -2.286 3.814 -2.286 6.042 v 28.458 c 0 1.088 -0.589 2.091 -1.539 2.62 l -16.076 8.964 C 37.969 88.102 37.465 88.228 36.962 88.228 z\
        M 71.054 25.823 H 18.947 c -1.657 0 -3 -1.343 -3 -3 s 1.343 -3 3 -3 h 52.107 c 1.657 0 3 1.343 3 3 S 72.711 25.823 71.054 25.823 z\
        M 62.535 35.466 h -35.07 c -1.657 0 -3 -1.343 -3 -3 s 1.343 -3 3 -3 h 35.07 c 1.657 0 3 1.343 3 3 S 64.192 35.466 62.535 35.466 z';

    Icons.factory =
        'F M 14.838 42.647 c -0.552 0 -1 -0.448 -1 -1 V 14.86 c 0 -0.552 0.448 -1 1 -1 h 1.98 v -0.95 l -5.645 -5.569 L 5.5 12.938 v 0.922 h 2.008 c 0.552 0 1 0.448 1 1 v 26.787 c 0 0.552 -0.448 1 -1 1 s -1 -0.448 -1 -1 V 15.86 H 4.5 c -0.552 0 -1 -0.448 -1 -1 v -2.34 c 0 -0.268 0.107 -0.524 0.298 -0.712 l 6.673 -6.583 c 0.389 -0.384 1.016 -0.384 1.404 0 l 6.673 6.583 c 0.252 0.249 0.352 0.609 0.27 0.946 v 2.106 c 0 0.552 -0.448 1 -1 1 h -1.98 v 25.787 C 15.838 42.199 15.39 42.647 14.838 42.647 z\
        M 89 68.502 h -1.888 V 48.91 c 0 -0.553 -0.447 -1 -1 -1 h -7.342 h -6.432 h -5.783 V 28.354 c 0 -0.552 -0.447 -1 -1 -1 h -7.342 h -6.432 H 45 h -7.342 h -6.432 h -6.782 c -0.552 0 -1 0.448 -1 1 V 47.91 h -6.342 H 10.67 H 3.888 c -0.552 0 -1 0.447 -1 1 v 19.592 H 1 c -0.552 0 -1 0.447 -1 1 v 8.02 c 0 0.553 0.448 1 1 1 h 7.393 v 5.542 c 0 0.553 0.448 1 1 1 h 13.928 c 0.552 0 1 -0.447 1 -1 v -5.542 h 41.357 v 5.542 c 0 0.553 0.447 1 1 1 h 13.928 c 0.553 0 1 -0.447 1 -1 v -5.542 H 89 c 0.553 0 1 -0.447 1 -1 v -8.02 C 90 68.949 89.553 68.502 89 68.502 z M 30.226 49.91 v 7.524 c 0 0.553 0.448 1 1 1 h 6.432 c 0.552 0 1 -0.447 1 -1 V 49.91 H 44 v 18.557 H 25.444 V 49.91 H 30.226 z M 32.226 49.91 h 4.432 v 6.524 h -4.432 V 49.91 z M 52.782 49.91 h 4.432 v 6.524 h -4.432 V 49.91 z M 51.782 58.435 h 6.432 c 0.553 0 1 -0.447 1 -1 V 49.91 h 5.342 v 18.557 H 46 V 49.91 h 4.782 v 7.524 C 50.782 57.987 51.229 58.435 51.782 58.435 z M 85.112 68.467 H 66.556 V 49.91 h 4.783 v 7.524 c 0 0.553 0.447 1 1 1 h 6.432 c 0.553 0 1 -0.447 1 -1 V 49.91 h 5.342 V 68.467 z M 77.771 49.91 v 6.524 h -4.432 V 49.91 H 77.771 z M 64.556 47.91 h -6.342 h -6.432 H 46 V 29.354 h 4.782 v 7.524 c 0 0.552 0.447 1 1 1 h 6.432 c 0.553 0 1 -0.448 1 -1 v -7.524 h 5.342 V 47.91 z M 57.214 29.354 v 6.524 h -4.432 v -6.524 H 57.214 z M 36.658 29.354 v 6.524 h -4.432 v -6.524 H 36.658 z M 25.444 29.354 h 4.782 v 7.524 c 0 0.552 0.448 1 1 1 h 6.432 c 0.552 0 1 -0.448 1 -1 v -7.524 H 44 V 47.91 h -6.342 h -6.432 h -5.782 V 29.354 z M 16.102 49.91 v 6.524 H 11.67 V 49.91 H 16.102 z M 4.888 49.91 H 9.67 v 7.524 c 0 0.553 0.448 1 1 1 h 6.432 c 0.552 0 1 -0.447 1 -1 V 49.91 h 5.342 v 18.557 H 4.888 V 49.91 z M 22.321 83.063 H 10.393 v -4.542 h 11.928 V 83.063 z M 79.606 83.063 H 67.679 v -4.542 h 11.928 V 83.063 z M 88 76.521 h -7.394 H 66.679 H 23.321 H 9.393 H 2 v -6.02 h 86 V 76.521 z\
        M 82.492 42.647 c -0.553 0 -1 -0.448 -1 -1 V 14.86 c 0 -0.552 0.447 -1 1 -1 h 1.979 v -0.95 l -5.645 -5.568 l -5.673 5.596 v 0.922 h 2.008 c 0.553 0 1 0.448 1 1 v 26.787 c 0 0.552 -0.447 1 -1 1 s -1 -0.448 -1 -1 V 15.86 h -2.008 c -0.553 0 -1 -0.448 -1 -1 v -2.34 c 0 -0.268 0.107 -0.524 0.298 -0.712 l 6.673 -6.583 c 0.389 -0.384 1.016 -0.384 1.404 0 l 6.673 6.583 c 0.253 0.25 0.352 0.61 0.27 0.948 v 2.104 c 0 0.552 -0.447 1 -1 1 h -1.979 v 25.787 C 83.492 42.199 83.045 42.647 82.492 42.647 z\
        M 48.665 23.397 c -0.553 0 -1 -0.448 -1 -1 V 14.86 c 0 -0.552 0.447 -1 1 -1 h 1.979 v -0.95 L 45 7.341 l -5.673 5.596 v 0.922 h 2.008 c 0.552 0 1 0.448 1 1 v 7.537 c 0 0.552 -0.448 1 -1 1 s -1 -0.448 -1 -1 V 15.86 h -2.008 c -0.552 0 -1 -0.448 -1 -1 v -2.34 c 0 -0.268 0.107 -0.524 0.298 -0.712 l 6.673 -6.583 c 0.389 -0.384 1.016 -0.384 1.404 0 l 6.673 6.583 c 0.253 0.25 0.352 0.61 0.27 0.948 v 2.104 c 0 0.552 -0.447 1 -1 1 h -1.979 v 6.537 C 49.665 22.949 49.218 23.397 48.665 23.397 z';

    var IconNames = [];
    for (var n in Icons) IconNames.push(n);

    // A data binding conversion function. Given a name, return the Geometry.
    // If there is only a string, replace it with a Geometry object, which can be shared by multiple Shapes.
    function geoFunc(geoname) {
        var geo = Icons[geoname];
        if (typeof geo === 'string') {
            geo = Icons[geoname] = go.Geometry.parse(geo, true);
        }
        return geo;
    }

    // Since 2.2 you can also author concise templates with method chaining instead of GraphObject.make
    // For details, see https://gojs.net/latest/intro/buildingObjects.html
    const $ = go.GraphObject.make; // for conciseness in defining templates
    myDiagram = new go.Diagram(
        'myDiagramDiv', // create a Diagram for the DIV HTML element
        {
            initialAutoScale: go.AutoScale.Uniform, // scale to show all of the contents
            ChangedSelection: onSelectionChanged, // view additional information
            maxSelectionCount: 1, // don't allow users to select more than one thing at a time
            isReadOnly: true,
        }
    );

    myDiagram.nodeTemplate = $(go.Node,
        'Spot',
        {
            locationObjectName: 'PORT',
            locationSpot: go.Spot.Top, // location point is the middle top of the PORT
            linkConnected: updatePortHeight,
            linkDisconnected: updatePortHeight,
            toolTip: $('ToolTip', $(go.TextBlock, { margin: 4, width: 140 }, new go.Binding('text', '', (data) => data.text + ':\n\n' + data.description))),
        },
        new go.Binding('location', 'pos', go.Point.parse).makeTwoWay(go.Point.stringify),
        // The main element of the Spot panel is a vertical panel housing an optional icon,
        // plus a rectangle that acts as the port
        $(go.Panel,
            'Vertical',
            $(go.Shape,
                {
                    width: 80,
                    height: 80,
                    stroke: null,
                    strokeWidth: 0,
                    fill: 'gray',
                },
                new go.Binding('height', 'icon', () => 80),
                new go.Binding('fill', 'color', colorFunc),
                new go.Binding('geometry', 'icon', geoFunc)
            ),
            $(go.Shape,
                {
                    name: 'PORT',
                    width: 40,
                    height: 24,
                    margin: new go.Margin(-1, 0, 0, 0),
                    stroke: null,
                    strokeWidth: 0,
                    fill: 'gray',
                    portId: '',
                    fromLinkable: true,
                    toLinkable: true,
                },
                new go.Binding('fill', 'color', colorFunc)
            ),
            $(go.TextBlock,
                {
                    font: '14px IRANSansWeb,Inter, Helvetica, sans-serif',
                    textAlign: 'center',
                    margin: 3,
                    maxSize: new go.Size(100, NaN),
                    alignment: go.Spot.Top,
                    alignmentFocus: go.Spot.Bottom,
                    editable: true,
                },
                new go.Binding('text').makeTwoWay()
            )
        )
    );

    function updatePortHeight(node, link, port) {
        var sideinputs = 0;
        var sideoutputs = 0;
        node.findLinksConnected().each((l) => {
            if (l.toNode === node && l.toSpot === go.Spot.LeftSide) sideinputs++;
            if (l.fromNode === node && l.fromSpot === go.Spot.RightSide) sideoutputs++;
        });
        var tot = Math.max(sideinputs, sideoutputs);
        tot = Math.max(1, Math.min(tot, 2));
        port.height = tot * (10 + 2) + 2; // where 10 is the link path's strokeWidth
    }

    myDiagram.linkTemplate = $(go.Link,
        {
            layerName: 'Background',
            routing: go.Routing.Orthogonal,
            corner: 15,
            reshapable: true,
            resegmentable: true,
            fromSpot: go.Spot.RightSide,
            toSpot: go.Spot.LeftSide,
        },
        // make sure links come in from the proper direction and go out appropriately
        new go.Binding('fromSpot', 'fromSpot', go.Spot.parse),
        new go.Binding('toSpot', 'toSpot', go.Spot.parse),
        new go.Binding('points').makeTwoWay(),
        // mark each Shape to get the link geometry with isPanelMain: true
        $(go.Shape,
            { isPanelMain: true, stroke: 'gray', strokeWidth: 10 },
            // get the default stroke color from the fromNode
            new go.Binding('stroke', 'fromNode', (n) => go.Brush.lighten((n && Colors[n.data.color]) || 'gray')).ofObject(),
            // but use the link's data.color if it is set
            new go.Binding('stroke', 'color', colorFunc)
        ),
        $(go.Shape, { isPanelMain: true, stroke: 'white', strokeWidth: 3, name: 'PIPE', strokeDashArray: [20, 40] })
    );

    var SpotNames = ['Top', 'Left', 'Right', 'Bottom', 'TopSide', 'LeftSide', 'RightSide', 'BottomSide'];

    myDiagram.model = go.Model.fromJson(data);

    loop(); // animate some flow through the pipes
}

var opacity = 1;
var down = true;
function loop() {
    var diagram = myDiagram;
    setTimeout(() => {
        var oldskips = diagram.skipsUndoManager;
        diagram.skipsUndoManager = true;
        diagram.links.each((link) => {
            var shape = link.findObject('PIPE');
            var off = shape.strokeDashOffset - 3;
            // animate (move) the stroke dash
            shape.strokeDashOffset = off <= 0 ? 60 : off;
            // animte (strobe) the opacity:
            if (down) opacity = opacity - 0.01;
            else opacity = opacity + 0.003;
            if (opacity <= 0) {
                down = !down;
                opacity = 0;
            }
            if (opacity > 1) {
                down = !down;
                opacity = 1;
            }
            shape.opacity = opacity;
        });
        diagram.skipsUndoManager = oldskips;
        loop();
    }, 60);
}

function onSelectionChanged() {
    var node = myDiagram.selection.first();
    if (!(node instanceof go.Node)) return;
    var data = node.data;

    window.location.href = "/Diagram/DeviceItems?id=" + data.key
}
window.addEventListener('DOMContentLoaded', init);