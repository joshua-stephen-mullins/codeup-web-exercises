'use strict';

$(document).ready(function () {
    function addDays(date, days) {
        let result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    function mode(array) {
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
                scales: {grid: {display: false}, yAxes: [{grid: {display: false}, ticks: {beginAtZero: false,}}]}
            },
        });
    }

    let currentWeather = {}, weatherForecast = {};

    mapboxgl.accessToken = MAPBOX_TOKEN;
    let map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9',
        zoom: 10,
    });

    function loadMap() {
        const lngLat = marker.getLngLat();
        $.get("http://api.openweathermap.org/data/2.5/weather", {
            APPID: OPEN_WEATHER_APPID,
            lat: lngLat.lat,
            lon: lngLat.lng,
            units: "imperial"
        }).done(function (data) {
            currentWeather = data;
            $('#currentLocation').html(currentWeather.name);
            $('#currentTemp').html(Math.round(currentWeather.main.temp));
            $('#currentConditions').html(capitalize(currentWeather.weather[0].description));
            $('#feelsLikeTemp').html(Math.round(currentWeather.main.feels_like));
            $('.currentLowTemp').html(Math.round(currentWeather.main.temp_min));
            $('.currentHighTemp').html(Math.round(currentWeather.main.temp_max));
            $('#currentHumidity').html(Math.round(currentWeather.main.humidity));
            $('#currentPressure').html(Math.round(currentWeather.main.pressure));
            $('#currentWindSpeed').html(Math.round(currentWeather.wind.speed));
            $('.currentWeatherWrapBG').attr('src', `../img/${currentWeather.weather[0].main}.jpg`)
        });
        $.get("http://api.openweathermap.org/data/2.5/forecast", {
            APPID: OPEN_WEATHER_APPID,
            lat: lngLat.lat,
            lon: lngLat.lng,
            units: "imperial"
        }).done(function (data) {
            weatherForecast = data;
            let chart = [[], [], [], [], [], []];
            let currentTime = new Date(currentWeather.dt * 1000);
            let currentDate = currentTime.toLocaleDateString();

            for (let f = 0; f < 5; f++) {
                for (let ft = 0; ft < weatherForecast.list.length; ft++) {
                    let forecastData = weatherForecast.list[ft]
                    let forecastDataDate = new Date(forecastData.dt * 1000);
                    let forecastDataDateOnly = forecastDataDate.toLocaleDateString();
                    let forecastDataTime = forecastDataDate.toLocaleTimeString();
                    if (forecastDataDateOnly === (addDays(currentTime, f).toLocaleDateString())) {
                        chart[f].push(forecastData);
                        if (forecastDataTime === '12:00:00 AM') {
                            chart[f - 1].push(forecastData);
                        }
                    }
                }
            }

            function populateForecastTabs(i, chart) {
                let dateTime = [], temps = [], description = [], humidity = [], pressure = [], wind = [];
                chart.forEach(function (data) {
                    let forecastDataDate = new Date(data.dt * 1000);
                    let forecastDataTime = forecastDataDate.toLocaleTimeString();
                    dateTime.push(forecastDataTime);
                    temps.push(Math.round(data.main.temp));
                    description.push(data.weather[0].main);
                    humidity.push(data.main.humidity);
                    pressure.push(data.main.pressure);
                    wind.push(data.wind.speed);
                })
                let tempsSorted = Array.from(temps).sort(function (a, b) {
                    return a - b
                });
                $(`#day${i + 1}Header`).html(addDays(currentTime, 1).toLocaleDateString())
                $(`.day${i + 1}Low`).html(Math.round(tempsSorted[0]));
                $(`.day${i + 1}High`).html(Math.round(tempsSorted.reverse()[0]));
                $(`#forecast${i + 1}-description`).html(capitalize(mode(description)));
                $(`#forecast${i + 1}-humidity`).html(Math.round(average(humidity)));
                $(`#forecast${i + 1}-pressure`).html(Math.round(average(pressure)));
                $(`#forecast${i + 1}-wind`).html(Math.round(average(wind)));
                $(`.day${i + 1}WeatherWrapBG`).attr('src', `../img/${(mode(description))}.jpg`)
                createChart(`chart${i + 1}`, dateTime, temps);
            }
            for (let i = 0; i < 5; i++) {
                populateForecastTabs(i, chart[i])
            }
        })
    }

    function searchBox(searchTerm) {
        geocode(searchTerm, MAPBOX_TOKEN).then(function (result) {
            map.setCenter(result);
            marker.setLngLat(result).addTo(map);
            loadMap();
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
        loadMap();
    }

    map.on('click', add_marker);
    marker.on('dragend', loadMap);
})
