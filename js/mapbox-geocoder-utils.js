"use strict";


mapboxgl.accessToken = MAPBOX_TOKEN;
let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    zoom: 10,
    center: [-86.63486, 30.44811]
});

let restaurants = [
    {
        name: "Stewbys",
        foodType: "Fish Tacos",
        price: "Cheap",
        location: [-86.63486, 30.44811],
        marker: '',
        popup: ''
    },
    {
        name: "Burrito Del Sol",
        foodType: "Burritos",
        price: "Average",
        location: [-86.62525, 30.40585],
        marker: '',
        popup: ''
    },
    {
        name: "Johnny Hustons",
        foodType: "Burgers",
        price: "Average",
        location: [-86.903965, 30.40256],
        marker: '',
        popup: ''
    }
]

function createMarkers(){
    restaurants.forEach(function (restaurant){
        restaurant.marker = new mapboxgl.Marker()
            .setLngLat(restaurant.location)
            .addTo(map);

        restaurant.popup = new mapboxgl.Popup()
            .setHTML("<h5>" + restaurant.name + "</h5><p>" + restaurant.foodType + "</p><p>" + restaurant.price + " food!</p>")
            .setLngLat(restaurant.location)

        restaurant.marker.setPopup(restaurant.popup);
    })
}

createMarkers(restaurants);

// var stewbys = new mapboxgl.Marker()
//     .setLngLat([-86.903965, 30.40256])
//     .addTo(map);
//
// var stewbysPopup = new mapboxgl.Popup()
//     .setHTML("<p>Fish Tacos!</p>")
//
// stewbys.setPopup(stewbysPopup)



// the  geocode method from mapbox-geocoder-utils.js
// geocode("7634 Navarre Pkwy, Navarre, FL 32566", MAPBOX_TOKEN).then(function (result) {
//     console.log(result);
//     map.setCenter(result);
//     map.setZoom(14);
// });


/***
 * geocode is a method to search for coordinates based on a physical address and return
 * @param {string} search is the address to search for the geocoded coordinates
 * @param {string} token is your API token for MapBox
 * @returns {Promise} a promise containing the latitude and longitude as a two element array
 *
 * EXAMPLE:
 *
 *  geocode("San Antonio", API_TOKEN_HERE).then(function(results) {
 *      // do something with results
 *  })
 *
 */
function geocode(search, token) {
    var baseUrl = 'https://api.mapbox.com';
    var endPoint = '/geocoding/v5/mapbox.places/';
    return fetch(baseUrl + endPoint + encodeURIComponent(search) + '.json' + "?" + 'access_token=' + token)
        .then(function (res) {
            return res.json();
            // to get all the data from the request, comment out the following three lines...
        }).then(function (data) {
            return data.features[0].center;
        });
}


/***
 * reverseGeocode is a method to search for a physical address based on inputted coordinates
 * @param {object} coordinates is an object with properties "lat" and "lng" for latitude and longitude
 * @param {string} token is your API token for MapBox
 * @returns {Promise} a promise containing the string of the closest matching location to the coordinates provided
 *
 * EXAMPLE:
 *
 *  reverseGeocode({lat: 32.77, lng: -96.79}, API_TOKEN_HERE).then(function(results) {
 *      // do something with results
 *  })
 *
 */
function reverseGeocode(coordinates, token) {
    var baseUrl = 'https://api.mapbox.com';
    var endPoint = '/geocoding/v5/mapbox.places/';
    return fetch(baseUrl + endPoint + coordinates.lng + "," + coordinates.lat + '.json' + "?" + 'access_token=' + token)
        .then(function (res) {
            return res.json();
        })
        // to get all the data from the request, comment out the following three lines...
        .then(function (data) {
            return data.features[0].place_name;
        });
}