'use strict';

$(document).ready(function () {


    function addDays(date, days) {
        let result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    function mode(array) {
        if (array.length == 0)
            return null;
        let modeMap = {};
        let maxEl = array[0], maxCount = 1;
        for (let i = 0; i < array.length; i++) {
            let el = array[i];
            if (modeMap[el] == null)
                modeMap[el] = 1;
            else
                modeMap[el]++;
            if (modeMap[el] > maxCount) {
                maxEl = el;
                maxCount = modeMap[el];
            }
        }
        return maxEl;
    }

    function average(array) {
        let total = 0;
        for (let i = 0; i < array.length; i++) {
            total += array[i];
        }
        return total / array.length;
    }

    function capitalize(string) {
        if (string !== null) {
            let arr = string.split(" ");
            for (let i = 0; i < arr.length; i++) {
                arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
            }
            return arr.join(" ")
        }
    }

    function createChart(divName, timeBrackets, dayTemps) {
        const ctx = document.getElementById(divName).getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'line',
            default: {
                font: {
                    family: "Poppins', sans-serif",
                    weight: 'bolder'
                }
            },
            data: {
                labels: timeBrackets,
                datasets: [{
                    label: 'Temperature',
                    backgroundColor: 'rgba(161, 198, 247, 1)',
                    borderColor: 'rgb(47, 128, 237)',
                    data: dayTemps,
                }]
            },
            options: {
                legend: {display: false},
                scales: {
                    grid: {display: false},
                    yAxes: [{
                        grid: {display: false},
                        // display: false,
                        ticks: {
                            beginAtZero: false,
                        }
                    }]
                }
            },
        });
    }


        let currentWeather = {};
        let weatherForecast = {};

        mapboxgl.accessToken = MAPBOX_TOKEN;
        let map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v9',
            zoom: 10,
        });

        map.on('load', function () {
            map.resize();
        });

        function loadMapCurrent() {
            const lngLat = marker.getLngLat();
            $.get("http://api.openweathermap.org/data/2.5/weather", {
                APPID: OPEN_WEATHER_APPID,
                lat: lngLat.lat,
                lon: lngLat.lng,
                units: "imperial"
            }).done(function (data) {
                currentWeather = data;
                console.log(data)
                let currentWeatherDesc = currentWeather.weather[0].description;
                $('#currentLocation').html(currentWeather.name);
                $('#currentTemp').html(Math.round(currentWeather.main.temp));
                $('#currentConditions').html(capitalize(currentWeatherDesc));
                $('#feelsLikeTemp').html(Math.round(currentWeather.main.feels_like));
                $('.currentLowTemp').html(Math.round(currentWeather.main.temp_min));
                $('.currentHighTemp').html(Math.round(currentWeather.main.temp_max));
                $('#currentHumidity').html(Math.round(currentWeather.main.humidity));
                $('#currentPressure').html(Math.round(currentWeather.main.pressure));
                $('#currentWindSpeed').html(Math.round(currentWeather.wind.speed));
                $('#currentWeatherIcon').html('<img src="http://openweathermap.org/img/w/' + currentWeather.weather[0].icon + '.png" id="currentWeatherIconImg" alt="Weather Icon">')
                $('.currentWeatherWrapBG').attr('src', `../img/${currentWeather.weather[0].main}.jpg`)
            });
        }

        function searchBox(searchTerm) {
            geocode(searchTerm, MAPBOX_TOKEN).then(function (result) {
                map.setCenter(result);
                map.setZoom(3);
                marker.setLngLat(result).addTo(map);
                loadMapCurrent();
                loadMapForecast();
            });
        }

        searchBox("dallas");

        $('#searchBox').click(function (e) {
            e.preventDefault();
            searchBox($('#searchBoxInput').val())
        })


        let marker = new mapboxgl.Marker({
            draggable: true
        });

        function add_marker(event) {
            let coordinates = event.lngLat;
            marker.setLngLat(coordinates).addTo(map);
            loadMapCurrent();
            loadMapForecast()
        }

        map.on('click', add_marker);
        marker.on('dragend', loadMapCurrent);
        marker.on('dragend', loadMapForecast);

        function loadMapForecast() {
            const lngLat = marker.getLngLat();
            $.get("http://api.openweathermap.org/data/2.5/forecast", {
                APPID: OPEN_WEATHER_APPID,
                lat: lngLat.lat,
                lon: lngLat.lng,
                units: "imperial"
            }).done(function (data) {
                weatherForecast = data;
                console.log(weatherForecast)
                // let chart1 = {}
                // chart1.dateTime = [];
                // chart1.temps = [];
                // chart1.description = [];
                // chart1.humidity = [];
                // chart1.pressure = [];
                // chart1.wind = [];
                // chart1.backgroundWeather = '';
                // let chart2 = {}
                // chart2.dateTime = [];
                // chart2.temps = [];
                // chart2.description = [];
                // chart2.humidity = [];
                // chart2.pressure = [];
                // chart2.wind = [];
                // chart2.backgroundWeather = '';
                // let chart3 = {}
                // chart3.dateTime = [];
                // chart3.temps = [];
                // chart3.description = [];
                // chart3.humidity = [];
                // chart3.pressure = [];
                // chart3.wind = [];
                // chart3.backgroundWeather = '';
                // let chart4 = {}
                // chart4.dateTime = [];
                // chart4.temps = [];
                // chart4.description = [];
                // chart4.humidity = [];
                // chart4.pressure = [];
                // chart4.wind = [];
                // chart4.backgroundWeather = '';
                // let chart5 = {}
                // chart5.dateTime = [];
                // chart5.temps = [];
                // chart5.description = [];
                // chart5.humidity = [];
                // chart5.pressure = [];
                // chart5.wind = [];
                // chart5.backgroundWeather = '';

                let charts = {
                    chart1: [],
                    chart2: [],
                    chart3: [],
                    chart4: [],
                    chart5: [],
                }

                let currentTime = new Date(currentWeather.dt * 1000);
                let currentDate = currentTime.toLocaleDateString();

                weatherForecast.list.forEach(function (forecastData) {
                    let forecastDataDate = new Date(forecastData.dt * 1000);
                    let forecastDataDateOnly = forecastDataDate.toLocaleDateString();
                    let forecastDataTime = forecastDataDate.toLocaleTimeString();
                    if (currentDate === forecastDataDateOnly) {
                        charts.chart1.push(forecastData);
                        $('#day1Header').html('Today')
                    } else if (forecastDataDateOnly === (addDays(currentTime, 1).toLocaleDateString())) {
                        charts.chart2.push(forecastData);
                        $('#day2Header').html(addDays(currentTime, 1).toLocaleDateString())
                        if (forecastDataTime === '12:00:00 AM') {
                            charts.chart1.push(forecastData);
                        }
                    } else if (forecastDataDateOnly === (addDays(currentTime, 2).toLocaleDateString())) {
                        charts.chart3.push(forecastData);
                        $('#day3Header').html(addDays(currentTime, 2).toLocaleDateString())
                        if (forecastDataTime === '12:00:00 AM') {
                            charts.chart2.push(forecastData);
                        }
                    } else if (forecastDataDateOnly === (addDays(currentTime, 3).toLocaleDateString())) {
                        charts.chart4.push(forecastData);
                        $('#day4Header').html(addDays(currentTime, 3).toLocaleDateString())
                        if (forecastDataTime === '12:00:00 AM') {
                            charts.chart3.push(forecastData);
                        }
                    } else if (forecastDataDateOnly === (addDays(currentTime, 4).toLocaleDateString())) {
                        charts.chart5.push(forecastData);
                        $('#day5Header').html(addDays(currentTime, 4).toLocaleDateString())
                        if (forecastDataTime === '12:00:00 AM') {
                            charts.chart4.push(forecastData);
                        }
                    }
                })

                function populateForecastTabs(chart) {
                    let dateTime = [];
                    let temps = [];
                    let description = [];
                    let humidity = [];
                    let pressure = [];
                    let wind = [];
                    chart.forEach(function (data) {
                        let forecastDataDate = new Date(data.dt * 1000);
                        let forecastDataTime = forecastDataDate.toLocaleTimeString();
                        dateTime.push(forecastDataTime);
                        temps.push(Math.round(data.main.temp));
                        description.push(data.weather[0].description);
                        humidity.push(data.main.humidity);
                        pressure.push(data.main.pressure);
                        wind.push(data.wind.speed);
                    })
                    let tempsSorted = Array.from(temps).sort(function (a, b) {
                        return a - b
                    });
                    console.log(dateTime);
                    console.log(temps);
                    console.log(description);
                    console.log(humidity);
                    console.log(pressure);
                    console.log(wind);
                }

                populateForecastTabs(charts.chart1);
            })

            //     createChart("chart1", chart1.dateTime, chart1.temps);
            //     createChart("chart2", chart2.dateTime, chart2.temps);
            //     createChart("chart3", chart3.dateTime, chart3.temps);
            //     createChart("chart4", chart4.dateTime, chart4.temps);
            //     createChart("chart5", chart5.dateTime, chart5.temps);
            //
            //     let chart1Sorted = Array.from(chart1.temps).sort(function (a, b) {
            //         return a - b
            //     });
            //     $('#day1Low').html(Math.round(chart1Sorted[0]));
            //     $('#day1High').html(Math.round(chart1Sorted.reverse()[0]));
            //     $('#forecast1-description').html(capitalize(mode(chart1.description)));
            //     $('#forecast1-humidity').html(Math.round(average(chart1.humidity)));
            //     $('#forecast1-pressure').html(Math.round(average(chart1.pressure)));
            //     $('#forecast1-wind').html(Math.round(average(chart1.wind)));
            //     let chart2Sorted = Array.from(chart2.temps).sort(function (a, b) {
            //         return a - b
            //     });
            //     $('.day2Low').html(Math.round(chart2Sorted[0]));
            //     $('.day2High').html(Math.round(chart2Sorted.reverse()[0]));
            //     $('#forecast2-description').html(capitalize(mode(chart2.description)));
            //     $('#forecast2-humidity').html(Math.round(average(chart2.humidity)));
            //     $('#forecast2-pressure').html(Math.round(average(chart2.pressure)));
            //     $('#forecast2-wind').html(Math.round(average(chart2.wind)));
            //     let chart3Sorted = Array.from(chart3.temps).sort(function (a, b) {
            //         return a - b
            //     });
            //     $('.day3Low').html(Math.round(chart3Sorted[0]));
            //     $('.day3High').html(Math.round(chart3Sorted.reverse()[0]));
            //     $('#forecast3-description').html(capitalize(mode(chart3.description)));
            //     $('#forecast3-humidity').html(Math.round(average(chart3.humidity)));
            //     $('#forecast3-pressure').html(Math.round(average(chart3.pressure)));
            //     $('#forecast3-wind').html(Math.round(average(chart3.wind)));
            //     let chart4Sorted = Array.from(chart4.temps).sort(function (a, b) {
            //         return a - b
            //     });
            //     $('.day4Low').html(Math.round(chart4Sorted[0]));
            //     $('.day4High').html(Math.round(chart4Sorted.reverse()[0]));
            //     $('#forecast4-description').html(capitalize(mode(chart4.description)));
            //     $('#forecast4-humidity').html(Math.round(average(chart4.humidity)));
            //     $('#forecast4-pressure').html(Math.round(average(chart4.pressure)));
            //     $('#forecast4-wind').html(Math.round(average(chart4.wind)));
            //     let chart5Sorted = Array.from(chart5.temps).sort(function (a, b) {
            //         return a - b
            //     });
            //     $('.day5Low').html(Math.round(chart5Sorted[0]));
            //     $('.day5High').html(Math.round(chart5Sorted.reverse()[0]));
            //     $('#forecast5-description').html(capitalize(mode(chart5.description)));
            //     $('#forecast5-humidity').html(Math.round(average(chart5.humidity)));
            //     $('#forecast5-pressure').html(Math.round(average(chart5.pressure)));
            //     $('#forecast5-wind').html(Math.round(average(chart5.wind)));
            // });
            // }


        }
    })
