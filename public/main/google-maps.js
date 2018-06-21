/**
 * @class 
 */

class GoogleMaps {
    constructor() {
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
            zoom: 8,
            center: new google.maps.LatLng(51.508742, -0.120850)
        });
        this.geocoder = new google.maps.Geocoder();
    }
    /* initalizeMap() {
        var myLatlng = new google.maps.LatLng(-25.363882, 131.044922);
        var mapOptions = {
            panControl: true,
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.SMALL
            },
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                mapTypeId: google.maps.MapTypeId.HYBRID
            },
            scaleControl: true,
            streetViewControl: true,
            overviewMapControl: true,
            rotateControl: true,
            zoom: 8,
            center: myLatlng
        }
    }        */          
}
export default GoogleMaps;