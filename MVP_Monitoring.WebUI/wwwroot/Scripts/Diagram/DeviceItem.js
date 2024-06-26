$(document).ready(function (e) {

    $('body').on('click', '.highcharts-title', function (e) {
        $('#kt_modal_create_campaign').modal('show')
    });

    Highcharts.chart('div_temperature', {
        chart: {
            events: {
                load: function () {
                    var chart = this,
                        yAxis = chart.yAxis[0],
                        xAxis = chart.xAxis[0];

                    chart.renderer.path([
                        'M', xAxis.toPixels(0) - 100, yAxis.toPixels(53),
                        'L', xAxis.toPixels(0), yAxis.toPixels(53)
                    ]).attr({
                        'stroke-width': 1,
                        stroke: 'red'
                    }).add();

                    chart.renderer.text(
                        '53°',
                        xAxis.toPixels(0) - 100,
                        yAxis.toPixels(53) - 10
                    ).attr({
                        stroke: 'black'
                    }).css({
                        fontSize: 20
                    }).add();

                    chart.renderer.text(
                        '',
                        xAxis.toPixels(0) - 100,
                        yAxis.toPixels(53) + 30
                    ).attr({
                        stroke: 'black'
                    }).css({
                        fontSize: 14
                    }).add();
                }
            }
        },
        title: {
            text: 'دمای موتور'
        },
        xAxis: {
            visible: false
        },
        yAxis: {
            visible: false
        },
        colorAxis: {
            visible: false,
            stops: [
                [0, '#00bfff'],
                [0.3, '#007bff'],
                [0.35, '#0dc200'],
                [0.5, '#bbff99'],
                [0.55, '#ff8400'],
                [0.9, '#ff0000']
            ],
        },
        series: [{
            pointWidth: 40,
            type: 'column',
            borderWidth: 0,
            threshold: 15,
            data: [
                [0, 85],
                [0, 80],
                [0, 75],
                [0, 70],
                [0, 65],
                [0, 60],
                [0, 55],
                [0, 50],
                [0, 45],
                [0, 40],
                [0, 35],
                [0, 30],
                [0, 25],
                [0, 20]
            ]
        }],
        exporting: {
            enabled: false
        }
    });

    Highcharts.chart('div_temperature_1', {
        chart: {
            events: {
                load: function () {
                    var chart = this,
                        yAxis = chart.yAxis[0],
                        xAxis = chart.xAxis[0];

                    chart.renderer.path([
                        'M', xAxis.toPixels(0) - 100, yAxis.toPixels(53),
                        'L', xAxis.toPixels(0), yAxis.toPixels(53)
                    ]).attr({
                        'stroke-width': 1,
                        stroke: 'red'
                    }).add();

                    chart.renderer.text(
                        '40°',
                        xAxis.toPixels(0) - 100,
                        yAxis.toPixels(53) - 40
                    ).attr({
                        stroke: 'black'
                    }).css({
                        fontSize: 20
                    }).add();

                    chart.renderer.text(
                        '',
                        xAxis.toPixels(0) - 100,
                        yAxis.toPixels(53) + 80
                    ).attr({
                        stroke: 'black'
                    }).css({
                        fontSize: 14
                    }).add();
                }
            }
        },
        title: {
            text: 'دمای یاتاقان'
        },
        xAxis: {
            visible: false
        },
        yAxis: {
            visible: false
        },
        colorAxis: {
            visible: false,
            stops: [
                [0, '#00bfff'],
                [0.3, '#007bff'],
                [0.35, '#0dc200'],
                [0.5, '#bbff99'],
                [0.55, '#ff8400'],
                [0.9, '#ff0000']
            ],
        },
        series: [{
            pointWidth: 40,
            type: 'column',
            borderWidth: 0,
            threshold: 15,
            data: [
                [0, 85],
                [0, 80],
                [0, 75],
                [0, 70],
                [0, 65],
                [0, 60],
                [0, 55],
                [0, 50],
                [0, 45],
                [0, 40],
                [0, 35],
                [0, 30],
                [0, 25],
                [0, 20]
            ]
        }],
        exporting: {
            enabled: false
        }
    });

    Highcharts.chart('div_motorSpeed', {

        chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false,
            height: '80%'
        },

        title: {
            text: 'دور موتور'
        },

        pane: {
            startAngle: -90,
            endAngle: 89.9,
            background: null,
            center: ['50%', '75%'],
            size: '110%'
        },

        // the value axis
        yAxis: {
            min: 0,
            max: 3000,
            tickPixelInterval: 72,
            tickPosition: 'inside',
            tickColor: Highcharts.defaultOptions.chart.backgroundColor || '#FFFFFF',
            tickLength: 20,
            tickWidth: 2,
            minorTickInterval: null,
            labels: {
                distance: 20,
                style: {
                    fontSize: '14px'
                }
            },
            lineWidth: 0,
            plotBands: [{
                from: 0,
                to: 1000,
                color: '#55BF3B', // green
                thickness: 20,
                borderRadius: '50%'
            }, {
                from: 1000,
                to: 1500,
                color: '#DDDF0D', // yellow
                thickness: 20
            },
            {
                from: 1500,
                to: 3000,
                color: '#DF5353', // red
                thickness: 20,
                borderRadius: '50%'
            },]
        },
        exporting: {
            enabled: false
        },
        series: [{
            name: 'Speed',
            data: [1000],
            tooltip: {
                valueSuffix: ' km/h'
            },
            dataLabels: {
                format: '{y} km/h',
                borderWidth: 0,
                color: (
                    Highcharts.defaultOptions.title &&
                    Highcharts.defaultOptions.title.style &&
                    Highcharts.defaultOptions.title.style.color
                ) || '#333333',
                style: {
                    fontSize: '16px'
                }
            },
            dial: {
                radius: '80%',
                backgroundColor: 'gray',
                baseWidth: 12,
                baseLength: '0%',
                rearLength: '0%'
            },
            pivot: {
                backgroundColor: 'gray',
                radius: 6
            }

        }]

    });

    // Add some life
    setInterval(() => {
        const chart = Highcharts.charts[0];
        if (chart && !chart.renderer.forExport) {
            const point = chart.series[0].points[0],
                inc = Math.round((Math.random() - 0.5) * 20);

            let newVal = point.y + inc;
            if (newVal < 0 || newVal > 200) {
                newVal = point.y - inc;
            }

            point.update(newVal);
        }

    }, 3000);

    Highcharts.chart('div_motorCurrent', {
        chart: {
            type: 'gauge',
            plotBorderWidth: 1,
            plotBackgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#FFF4C6'],
                    [0.3, '#FFFFFF'],
                    [1, '#FFF4C6']
                ]
            },
            plotBackgroundImage: null,
            height: 200
        },

        title: {
            text: 'جریان موتور'
        },

        pane: {
            startAngle: -90,
            endAngle: 89.9,
            background: null,
            center: ['50%', '75%'],
            size: '110%'
        },

        exporting: {
            enabled: false
        },

        tooltip: {
            enabled: false
        },

        yAxis: [{
            min: -20,
            max: 6,
            minorTickPosition: 'outside',
            tickPosition: 'outside',
            labels: {
                rotation: 'auto',
                distance: 20
            },
            plotBands: [{
                from: 0,
                to: 6,
                color: '#C02316',
                innerRadius: '100%',
                outerRadius: '105%'
            }],
            pane: 0,
            title: {
                y: -40
            }
        }],

        plotOptions: {
            gauge: {
                dataLabels: {
                    enabled: false
                },
                dial: {
                    radius: '100%'
                }
            }
        },

        series: [{
            name: 'Channel A',
            data: [-10],
            yAxis: 0
        }]
    }
    );

    ///////////////////////////////////////////

    Highcharts.chart('div_chart_1 ', {
        chart: {
            type: 'area'
        },
        title: {
            text: 'Greenhouse gases from Norwegian economic activity',
            align: 'left'
        },
        subtitle: {
            text: 'Source: ' +
                '<a href="https://www.ssb.no/en/statbank/table/09288/"' +
                'target="_blank">SSB</a>',
            align: 'left'
        },
        yAxis: {
            title: {
                useHTML: true,
                text: 'Million tonnes CO<sub>2</sub>-equivalents'
            }
        },
        tooltip: {
            shared: true,
            headerFormat: '<span style="font-size:12px"><b>{point.key}</b></span>' +
                '<br>'
        },
        plotOptions: {
            series: {
                pointStart: 2012
            },
            area: {
                stacking: 'normal',
                lineColor: '#666666',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#666666'
                }
            }
        },
        series: [{
            name: 'Ocean transport',
            data: [13234, 12729, 11533, 17798, 10398, 12811, 15483, 16196, 16214]
        }, {
            name: 'Households',
            data: [6685, 6535, 6389, 6384, 6251, 5725, 5631, 5047, 5039]

        }, {
            name: 'Agriculture and hunting',
            data: [4752, 4820, 4877, 4925, 5006, 4976, 4946, 4911, 4913]
        }, {
            name: 'Air transport',
            data: [3164, 3541, 3898, 4115, 3388, 3569, 3887, 4593, 1550]

        }, {
            name: 'Construction',
            data: [2019, 2189, 2150, 2217, 2175, 2257, 2344, 2176, 2186]
        }]
    });

});