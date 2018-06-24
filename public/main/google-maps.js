/**
 * @class 
 */

class GoogleMaps {
    constructor() {
        getCurrentLocation();
        // this.TogetherMap = new google.maps.Map(document.getElementById('map-canvas'), {
        //     panControl: true,
        //     zoomControl: true,
        //     zoomControlOptions: {
        //         style: google.maps.ZoomControlStyle.SMALL
        //     },
        //     mapTypeControl: false,
        //     mapTypeControlOptions: {
        //         style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        //         mapTypeId: google.maps.MapTypeId.HYBRID
        //     },
        //     fullscreenControl: false,
        //     scaleControl: true,
        //     streetViewControl: true,
        //     overviewMapControl: true,
        //     rotateControl: true,
        //     zoom: 8,
        //     center: new google.maps.LatLng(51.508742, -0.120850)
        // });
        // this.geocoder = new google.maps.Geocoder();
    }
    // get current location for map center
    getCurrentLocation() {
        var xhr = new XMLHttpRequest();
        xhr.open('post', 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBc_ZPpAaLuPC3My03ZuZ2NBWThEPPxOj8');
        xhr.onreadystatechange = function () {
            var DONE = 4; // readyState 4 means the request is done.
            var OK = 200; // status 200 is a successful return.
            if (xhr.readyState === DONE) {
                if (xhr.status === OK) {
                    currentLoc = JSON.parse(xhr.response).location;
                    // if (map){
                    //     map.panTo(currentLoc);
                    // }
                } else {
                    console.log('Error: ' + xhr.status);
                    currentLoc = { lat: 32.050593605888004, lng: 34.766852259635925 };
                }
                initalizeMap(currentLoc);
            }
        };
        xhr.send(null);
    }
     initalizeMap(currentLoc) {
       this.TogetherMap = new google.maps.Map(document.getElementById('map-canvas'), {
            panControl: true,
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.SMALL
            },
            mapTypeControl: false,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                mapTypeId: google.maps.MapTypeId.HYBRID
            },
            fullscreenControl: false,
            scaleControl: true,
            streetViewControl: true,
            overviewMapControl: true,
            rotateControl: true,
            zoom: 15,
            center: currentLoc
        });
        this.geocoder = new google.maps.Geocoder();
    }
}
export default GoogleMaps;