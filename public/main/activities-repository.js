/**
    * @class 
    */
class ActivityRepository {
    constructor(googleMaps) {
        this.googleMaps = googleMaps;
        this.markers = [];
    }

    // push a marker to the array.
    addMarker(markerObj) {
        this.markers.push(markerObj);
    }

    // Shows any markers currently in the array.
    showMarkers() {
        this.setMapOnAll(this.googleMaps);
    }

    // Deletes all markers in the array by removing references to them.
    deleteMarkers() {
        this.clearMarkers();
        this.markers = [];
    }
    
    // Removes the markers from the map, but keeps them in the array.    
    clearMarkers() {
        this.setMapOnAll(null);
    }

    // Sets the map on all markers in the array.
    setMapOnAll(map) {
        for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(map);
        }
    }

}

export default ActivityRepository