import { locationPreview } from './cmps/location-preview.js';
import { makeId } from './util.js';

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
    elGoBtn.addEventListener('click', onGo)
}

function onGo() {
    
let address = document.querySelector('input[name = "search"]').value;

var coord = getLocationCoor(address)

setLocation(lat, lng)
getWeather(lat, lng)

}




function addLocation(id, address, weather) {

    const elTBody = document.querySelector('.table-body');

    const locationItem = new locationPreview(id, address, weather, onDeleteItem, onUpdateItem)
    console.log(locationItem);

    const elRow = locationItem.render();
    console.log(elRow)
    elTBody.appendChild(elRow);
}

function onDeleteItem() {
    console.log('delete');
}
function onUpdateItem() {
    console.log('update');
}


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
        setLocation(position.latLng, map);
    });
}

function onUserLocation() {
    navigator.geolocation.getCurrentPosition(goToUserLocation)
}

function goToUserLocation(position) {
    initMap(position.coords.latitude, position.coords.longitude)
}




// function onAddMarker(latLng, map) {

//     gLocations.push(latLng);
//     console.log(latLng)

//     var marker = new google.maps.Marker({
//         pos: latLng,
//         map: map
//     });
// }