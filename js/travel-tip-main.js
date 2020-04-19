import { locationPreview } from './cmps/location-preview.js';

const body = document.getElementsByTagName("body")[0];

body.addEventListener("load", init());


function init() {
    addBtnEventLstnrs();
    setTimeout(initMap, 1000);
}

function addBtnEventLstnrs() {
    let elMyLocationBtn = document.querySelector('.my-location-btn')
    let elGoBtn = document.querySelector('.go-btn')

    elMyLocationBtn.addEventListener('click', onUserLocation)
    elGoBtn.addEventListener('click', addLocation)
}

function addLocation() {
    debugger
    locationPreview('3231', 'ramat-gam', 'sunny', onDeleteItem(), onUpdateItem())
}

function onDeleteItem() {
    // console.log(this);
}
function onUpdateItem() {
    // console.log(this);
}

var gTempMarkerData;

var gLocations = [];

function initMap(lat = 29.558244, lng = 34.955198) {

    var elMap = document.querySelector('.map');
    var options = {
        center: { lat, lng },
        zoom: 15
    };

    var map = new google.maps.Map(
        elMap,
        options
    );

    var marker = new google.maps.Marker({
        position: { lat, lng },
        map,
        title: 'Marker'
    });
    map.addListener('click', function (position) {
        // alert(position.latLng)
        onAddMarker(position.latLng, map);
    });
}

function onAddMarker(latLng, map) {

    gLocations.push(latLng);
    console.log(latLng)

    var marker = new google.maps.Marker({
        pos: latLng,
        map: map
    });
}

function onUserLocation() {
    navigator.geolocation.getCurrentPosition(goToUserLocation)
}

function goToUserLocation(position) {
    initMap(position.coords.latitude, position.coords.longitude)
}