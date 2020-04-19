import { locationPreview } from './cmps/location-preview.js';
import { makeId } from './util.js';



const GOOGLE_API_KEY = 'AIzaSyCX5xnl43gRFcQsE-LEyVOFsMEqJ8fe17Y'
document.getElementsByTagName("body")[0].addEventListener("load", init());


function init() {
    addBtnEventLstnrs();
    setTimeout(initMap, 1000);
    onGo();
}

function addBtnEventLstnrs() {
    let elMyLocationBtn = document.querySelector('.my-location-btn');
    let elGoBtn = document.querySelector('.go-btn');
    let elLocationDisplay = document.querySelector('.copy-location');

    elMyLocationBtn.addEventListener('click', onUserLocation)
    elGoBtn.addEventListener('click', onGo)
    elLocationDisplay.addEventListener('click', onCopyLocation)
}

function onCopyLocation() {

    var text = document.querySelector('.location-display').innerText
    var copyText = document.querySelector("#input");
    copyText.value = text

    copyText.select();
    document.execCommand("copy");
}

function onMapClick(latLng) {

    let latLngArr = latLng.split('')
    let latLngArrShort = latLngArr.splice(1, latLngArr.length - 2)
    let latLngJoint = latLngArrShort.join('')
    let latLngSplit = latLngJoint.split(', ')

    let latLngObj = {
        lat : parseFloat(latLngSplit[0]),
        lng : parseFloat(latLngSplit[1])
    }

    let address = getAddressFromCoord(latLngObj)
        address.then(res => {
            addLocation(makeId(3), res, 'sunny')
            renderLocationDeclaretion(res)
    })

}

function onGo() {

    let address = document.querySelector('input[name = "search"]').value;



    var coord = getLocationCoor(address)
        .then(res => getAddressFromCoord(res))
        .then(ans => {
            addLocation(makeId(3), ans, 'sunny')
            renderLocationDeclaretion(ans)
        })
}

function renderLocationDeclaretion(address) {
    document.querySelector('.location-display').innerText = address;
}

function getLocationCoor(address) {

    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address},+CA&key=${GOOGLE_API_KEY}`)
        .then(ans => ans.data)
        .then(data => data.results)
        .then(res => res[0].geometry.location)

}

function getAddressFromCoord(coord) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coord.lat},${coord.lng}&key=${GOOGLE_API_KEY}`)
        .then(res => res.data)
        .then(res => res.results[0].formatted_address)
}


function addLocation(id, address, weather) {

    const elTBody = document.querySelector('.table-body');

    const locationItem = new locationPreview(id, address, weather, onDeleteItem, onUpdateItem)


    const elRow = locationItem.render();

    elTBody.appendChild(elRow);
}

function onDeleteItem() {

}
function onUpdateItem() {

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
        onMapClick(position.latLng.toString(), map);
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