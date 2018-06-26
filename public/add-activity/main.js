var marker; // remove global?
var map;
var addressLoc;
var geocoder; // remove global?
var currentLoc;

function initMap() {
    map = new google.maps.Map(document.getElementById('map-canvas'), {
      // todo: check the current location and set normal zoom.
      zoom: 15,
      center: currentLoc || {lat: 32.050593605888004, lng: 34.766852259635925},
      fullscreenControl: false
    });
    geocoder = new google.maps.Geocoder();

    google.maps.event.addListener(map, 'click', function(event) {
        addressLoc = event.latLng;
        // reverse geocode the location and put the result in the addressLoc field and marker
        deleteMarker(marker);
        reverseGeocode(geocoder, event.latLng, map.getBounds());
    });

    // event listener for typing in the address search box
    var input = document.getElementById('address');
    var searchBox = new google.maps.places.SearchBox(input);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });
    
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // Clear out the old marker.
      deleteMarker(marker);

      // get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      
      if (!places[0].geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      // ?
    //   var icon = {
    //     url: places[0].icon,
    //     size: new google.maps.Size(71, 71),
    //     origin: new google.maps.Point(0, 0),
    //     anchor: new google.maps.Point(17, 34),
    //     scaledSize: new google.maps.Size(25, 25)
    //   };

      // Create a marker for the place.
      marker = addMarker(map, places[0].name || places[0].geometry.location.toString(), places[0].geometry.location);

      if (places[0].geometry.viewport) {
        // Only geocodes have viewport. // ?
        bounds.union(places[0].geometry.viewport);
      } else {
        bounds.extend(places[0].geometry.location);
      }
      
      map.fitBounds(bounds);

      // event listener for choosing a result or pressing enter in the address search box
      addressLoc = places[0].geometry.location;
    });
}

// bounds ?
function reverseGeocode(geocoder, loc, bounds){
    geocoder.geocode({'location': loc, 'bounds': bounds}, function(results, status) {
        if (status === 'OK') {
          if (results[0]){
            document.getElementById('address').value = results[0].formatted_address;
            marker = addMarker(map, results[0].formatted_address, loc);
          }
          else {
            document.getElementById('address').value = loc; // like: (32.082732,34.8237695)
            marker = addMarker(map, loc.toString(), loc);
          }
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

function deleteMarker(marker){
    if (marker)
    marker.setMap(null);
    /// remove the marker pointer to completely delete
}

function addMarker(map, name, loc){
    var marker = new google.maps.Marker({
        map: map,
        title: name,
        position: loc
    });
    return marker;
}

// get current location for map center
var xhr = new XMLHttpRequest();
xhr.open('post', 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBc_ZPpAaLuPC3My03ZuZ2NBWThEPPxOj8');
xhr.onreadystatechange = function () {
    var DONE = 4; // readyState 4 means the request is done.
    var OK = 200; // status 200 is a successful return.
    if (xhr.readyState === DONE) {
        if (xhr.status === OK) {
            currentLoc =JSON.parse(xhr.response).location;
            if (map){
                map.panTo(currentLoc);
            }
        } else {
            console.log('Error: ' + xhr.status);
        }
    }
};
xhr.send(null);

// set css for search boxes
$(document.body).bind("DOMNodeInserted",function(){
    $(".pac-container").addClass("list-group").removeClass("pac-logo");
    $(".pac-item").addClass("list-group-item");
    $(".ui-menu-item-wrapper").removeClass("ui-menu-item-wrapper");
});

// category search box section
$( "#category" ).autocomplete({
    source: "/categories/search",
    classes: {
        "ui-autocomplete": "pac-container list-group"
}
});
// open the search menu when focusing (and search box not empty)
$( "#category" ).on("focus",function(){$(this).autocomplete("search")})
// close on enter
$( "#category" ).keypress(function(e){if(e.which==13){$(this).autocomplete("close");}})

$( "#category" ).data().uiAutocomplete._renderItem = function( ul, item ) {
    re = new RegExp("("+$("#category").val()+")(.*)", "i")
    return $( "<li>" )
      .append("<span class=\"pac-icon pac-icon-search\"></span>"+
              "<span class=\"pac-item-query\">"+
                (item.label.split(re)[0] || "")+
                "<span class=\"pac-matched\">"+
                item.label.split(re)[1]+
                "</span>"+
                (item.label.split(re)[2] || "")+
              "</span>" )
      .addClass("list-group-item").addClass("pac-item")
      .appendTo( ul );
}

// login

function login(){
    if (localStorage.username){
        return true;
    }
    $('#loginModal').modal('show');
    return false;
}
function logout(){
    localStorage.removeItem("username");
}

function loginOutButton(){
    if(localStorage.username){
        $("#toggle-login").text("Logout");
    }
    else {
        $("#toggle-login").text("Login");
    }
}

$("#submitlogin").click(function(){
    localStorage.username = $("#username").val();
    $('#loginModal').modal('hide');
    loginOutButton();
});

$("#my-activities").click(function () {
    if(login())
        $("<a href=\"/my-activities/index.html\"></a>").appendTo(document.body)[0].click();
});

$("#toggle-login").click(function () {
    if(login()){
        logout();
        loginOutButton();
    }
});

loginOutButton();

// submit section

$("#submit").click( function () { // todo: add validation checking
    if(login())
        $("<form action=\"/activities/new\" method=\"post\" style=\"display: none;\">"+
        "<input type=\"text\" name=\"addressLoc\" value=\'"+(JSON.stringify(addressLoc) || "")+"\'>"+
        "<input type=\"text\" name=\"address\" value=\""+($("#address").val() || "")+"\">"+
        "<input type=\"text\" name=\"category\" value=\""+($("#category").val() || "")+"\">"+
        "<input type=\"text\" name=\"time\" value=\""+($("#time").val() || "")+"\">"+
        "<input type=\"text\" name=\"date\" value=\""+($("#date").val() || "")+"\">"+
        "<input type=\"text\" name=\"subject\" value=\""+($("#subject").val() || "")+"\">"+
        "<input type=\"text\" name=\"fullDsc\" value=\""+($("#fullDsc").val() || "")+"\">"+
        "<input type=\"text\" name=\"username\" value=\""+(localStorage.username || "")+"\">"+
        "</form>").appendTo(document.body)[0].submit();
});
