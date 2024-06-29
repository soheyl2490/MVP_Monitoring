$(document).ready(function (e) {

    setInterval(() => {

        Highcharts.charts.forEach((chart, i) => {
            if (chart.renderTo.id == "div_motorSpeed") {
                const point = chart.series[0].points[0],
                    inc = Math.round((Math.random() - 0.5) * 1000);

                let newVal = point.y + inc;
                if (newVal < 0 || newVal > 3000) {
                    newVal = point.y - inc;
                }

                //var audio = new Audio('/assets/cutoff405.mp3');

                //if (newVal > 1500) {
                //    audio.play();
                //} else {
                //    audio.pause();
                //}

                point.update(newVal);
            }
            if (chart.renderTo.id == "div_motorCurrent") {

                const point = chart.series[0].points[0],
                    inc = (Math.random() - 0.5) * 3;

                let newVal = point.y + inc;
                if (newVal < -20 || newVal > 6) {
                    newVal = point.y - inc;
                }

                point.update(newVal, false);
                chart.redraw();
            }
            if (chart.renderTo.id == "div_temperature") {

                const point = chart.series[0].points[0],
                    inc = (Math.random()) * 6;

                let newVal = point.y + inc;
                if (newVal < -30 || newVal > 60) {
                    newVal = point.y - inc;
                }

                point.update(Number(newVal.toFixed(1)), false);
                chart.redraw();
            }
            if (chart.renderTo.id == "div_temperature1") {

                const point = chart.series[0].points[0],
                    inc = (Math.random()) * 10;

                let newVal = point.y + inc;
                if (newVal < -30 || newVal > 100) {
                    newVal = point.y - inc;
                }

                point.update(Number(newVal.toFixed(1)), false);
                chart.redraw();
            }
        });


    }, 500);

    $('body').on('click', '.highcharts-title', function (e) {
        $('#kt_modal_create_campaign').modal('show')
    });

    var gaugeOptions = {
        chart: { type: 'solidgauge' },
        title: null,
        pane: {
            size: '90%',
            startAngle: -180,
            endAngle: 90,
            background: {
                backgroundColor: '#EEE',
                innerRadius: '95%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },
        tooltip: { enabled: false },

        // the value axis
        yAxis: {
            stops: [
                [0.1, '#00f'],
                [0.2, '#0f0'],
                [0.3, '#f00']
            ],
            lineWidth: 0,
            minorTickInterval: 0,
            tickPixelInterval: 50,
            tickWidth: 1,
            labels: {
                enabled: true,
                distance: 10
            },
            plotBands: [{
                from: -30,
                to: 30,
                color: '#55BF3B', // green
                thickness: 20,
                borderRadius: '50%'
            }, {
                from: 30,
                to: 50,
                color: '#DDDF0D', // yellow
                thickness: 20
            }, {
                from: 50,
                to: 100,
                color: '#be4b15', // red
                thickness: 20
            }]
        },
        plotOptions: {
            solidgauge: {
                innerRadius: '95%',
                dataLabels: {
                    y: 5,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        }
    };

    $('#div_temperature').highcharts(Highcharts.merge(gaugeOptions, {
        yAxis: {
            min: -30,
            max: 60
        },
        title: {
            text: 'دمای موتور'
        },
        credits: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: [{
            name: 'inTemp',
            data: [-15.5], /////// Temp Value //////////
            dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:25px;color:' + ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y} &deg;C</span><br/>' + '<span style="font-size:12px;color:silver"></span></div>'
            }
        }]
    }));

    $('#div_temperature1').highcharts(Highcharts.merge(gaugeOptions, {
        yAxis: {
            min: -30,
            max: 100
        },
        title: {
            text: 'دمای یاتاقان'
        },
        exporting: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'inTemp',
            data: [50.5], /////// Temp Value //////////
            dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:25px;color:' + ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y} &deg;C</span><br/>' + '<span style="font-size:12px;color:silver"></span></div>'
            }
        }]
    }));

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
            size: '140%'
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
                valueSuffix: ' RPM'
            },
            dataLabels: {
                format: '{y} RPM',
                borderWidth: 0,
                color: (
                    Highcharts.defaultOptions.title &&
                    Highcharts.defaultOptions.title.style &&
                    Highcharts.defaultOptions.title.style.color
                ) || '#333333',
                style: {
                    fontSize: '22px'
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
            min: 0,
            max: 20,
            minorTickPosition: 'outside',
            tickPosition: 'outside',
            labels: {
                rotation: 'auto',
                distance: 20
            },
            plotBands: [{
                from: 15,
                to: 20,
                color: '#C02316',
                innerRadius: '100%',
                outerRadius: '105%'
            }],
            pane: 0,
            title: {
                text: '<span style="font-size:22px">A</span>',
                y: 60
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
            data: [10],
            yAxis: 0,
            dataLabels: {
                format: '{y} RPM',
                borderWidth: 0,
                color: (
                    Highcharts.defaultOptions.title &&
                    Highcharts.defaultOptions.title.style &&
                    Highcharts.defaultOptions.title.style.color
                ) || '#333333',
                style: {
                    fontSize: '22px'
                }
            },
        }]
    });

    /////////////////////////////////////////////

    Highcharts.chart('div_chart1', {
        chart: {
            type: 'spline'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ],
            accessibility: {
                description: 'Months of the year'
            }
        },
        exporting: {
            enabled: false
        },
        yAxis: {
            title: {
                text: ''
            },
            labels: {
                format: ''
            }
        },
        tooltip: {
            crosshairs: true,
            shared: true
        },
        plotOptions: {
            spline: {
                marker: {
                    radius: 4,
                    lineColor: '#666666',
                    lineWidth: 1
                }
            }
        },
        series: [{
            name: '',
            marker: {
                symbol: 'square'
            },
            data: [5.2, 5.7, 8.7, 13.9, 18.2, 21.4, 25.0, {
                y: 26.4,
                marker: {
                    symbol: 'url(https://www.highcharts.com/samples/graphics/sun.png)'
                },
                accessibility: {
                    description: 'Sunny symbol, this is the warmest point in the ' +
                        'chart.'
                }
            }, 22.8, 17.5, 12.1, 7.6]

        }, {
            name: '',
            marker: {
                symbol: 'diamond'
            },
            data: [{
                y: 1.5,
                marker: {
                    symbol: 'url(https://www.highcharts.com/samples/graphics/snow.png)'
                },
                accessibility: {
                    description: 'Snowy symbol, this is the coldest point in the ' +
                        'chart.'
                }
            }, 1.6, 3.3, 5.9, 10.5, 13.5, 14.5, 14.4, 11.5, 8.7, 4.7, 2.6]
        }]
    });


    // Data retrieved https://en.wikipedia.org/wiki/List_of_cities_by_average_temperature
    Highcharts.chart('div_chart4', {
        chart: {
            type: 'line'
        },
        title: {
            text: 'نمودار دمای موتور'
        },
        subtitle: {
            text: ''
        },
        exporting: {
            enabled: false
        },
        xAxis: {
            categories: [
                '1', '2', '3', '4', '5', '6', '7', '8', '9',
                '10', '11', '12'
            ]
        },
        yAxis: {
            title: {
                text: 'دما (°C)'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: [{
            name: 'دما',
            data: [
                -2.9, -3.6, -0.6, 4.8, 10.2, 14.5, 17.6, 16.5, 12.0, 6.5,
                2.0, -0.9
            ]
        }]
    });

    // Data retrieved https://en.wikipedia.org/wiki/List_of_cities_by_average_temperature
    Highcharts.chart('div_chart5', {
        chart: {
            type: 'line'
        },
        title: {
            text: 'نمودار دمای یاتاقان'
        },
        subtitle: {
            text: ''
        },
        exporting: {
            enabled: false
        },
        xAxis: {
            categories: [
                '1', '2', '3', '4', '5', '6', '7', '8', '9',
                '10', '11', '12'
            ]
        },
        yAxis: {
            title: {
                text: 'دما (°C)'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: [{
            name: 'دما',
            data: [
                18.0, 18.2, 20.1, 17.9, 32.2, 36.4, 39.8, 37.4, 15.5, 40,
                22.0, 12.8
            ]
        }]
    });

    // Data retrieved https://en.wikipedia.org/wiki/List_of_cities_by_average_temperature
    Highcharts.chart('div_chart6', {
        chart: {
            type: 'line'
        },
        title: {
            text: 'نمودار دور موتور'
        },
        subtitle: {
            text: ''
        },
        exporting: {
            enabled: false
        },
        xAxis: {
            categories: [
                '1', '2', '3', '4', '5', '6', '7', '8', '9',
                '10', '11', '12'
            ]
        },
        yAxis: {
            title: {
                text: 'دور موتور (RPM)'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: [{
            name: 'دور موتور',
            data: [
                -5.9, -2.6, -0.6, 4.8, 10.2, 24.5, 17.6, 16.5, 12.0, 6.5,
                2.0, -1.9
            ]
        }]
    });

    // Data retrieved https://en.wikipedia.org/wiki/List_of_cities_by_average_temperature
    Highcharts.chart('div_chart7', {
        chart: {
            type: 'line'
        },
        title: {
            text: 'نمودار جریان موتور'
        },
        subtitle: {
            text: ''
        },
        exporting: {
            enabled: false
        },
        xAxis: {
            categories: [
                '1', '2', '3', '4', '5', '6', '7', '8', '9',
                '10', '11', '12'
            ]
        },
        yAxis: {
            title: {
                text: 'جریان (A)'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: [{
            name: 'ماه جاری',
            data: [
                26.0, 19, 13.1, 21.9, 32.2, 16.4, 39.8, 39.4, 35.5, 29.2,
                22.0, 17.8
            ]
        }, {
            name: 'ماه قبل',
            data: [
                -2.9, -3.6, -0.6, 4.8, 10.2, 14.5, 17.6, 16.5, 12.0, 6.5,
                2.0, -0.9
            ]
        }]
    });

});