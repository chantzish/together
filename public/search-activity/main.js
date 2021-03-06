var map;
var currentLoc;
var activities;
// var markers;
function initMap() {
    map = new google.maps.Map(document.getElementById('map-canvas'), {
      center: currentLoc,
      zoom: 15,
      fullscreenControl: false
    });

    var markers = [];

    // For each activity, get the address and location.
    var bounds = new google.maps.LatLngBounds();
    bounds.extend(currentLoc);
    var addressLoc;
    activities.forEach(function(activity) {
        if (!activity.addressLoc) {
            console.log("Returned activity contains no location");
            return;
        }
        // lat then lng
        addressLoc = new google.maps.LatLng(activity.addressLoc.coordinates[1], activity.addressLoc.coordinates[0]);
        
        // Create a marker for each activity.
        markers.push(new google.maps.Marker({
            map: map,
            title: activity.subject,
            label: {
                text: activity.category,
                color: 'white'
                // ,fontSize: "8px"
            },
            icon: {
                url:"https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi-dotless2_hdpi.png",
                labelOrigin: new google.maps.Point(27,27)
            },
            position: addressLoc
        }));
        bounds.extend(addressLoc);
    });
    // Don't zoom in too far on only one marker
    if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
        var extendPoint1 = new google.maps.LatLng(bounds.getNorthEast().lat() + 0.01, bounds.getNorthEast().lng() + 0.01);
        var extendPoint2 = new google.maps.LatLng(bounds.getNorthEast().lat() - 0.01, bounds.getNorthEast().lng() - 0.01);
        bounds.extend(extendPoint1);
        bounds.extend(extendPoint2);
    }
    // todo: set current location as the center
    map.fitBounds(bounds);
}

// get current location for map center
function getCurrentLocation(){
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
                currentLoc = {lat: 32.050593605888004, lng: 34.766852259635925};
            }
            search();
        }
    };
    xhr.send(null);
}

function search(){
    var url_string = window.location.href
    var url = new URL(url_string);
    var q = url.searchParams.get("q");
    $('#search-activity').val(q);
    $.ajax({ method: "GET", url: "/activities/search?q="+q+"&around="+currentLoc.lng+","+currentLoc.lat})
    .then(function(result){
        activities = result;
        render();
        initMap();
    });
}

function render() {
    activities.forEach(activity => $('.content-area').append(
        "<div class=\"card activity mb-3\" data-index=\""+activity._id+"\">"+
            "<div class=\"card-body\" data-toggle=\"collapse\" data-target=\"#collapse"+activity._id+"\">"+
                "<h3 class=\"card-title\">"+
                    activity.category+" - "+activity.subject+
                "</h3>"+
                "<p class=\"card-text\">"+
                    activity.address+"<br>"+
                    activity.date+ " "+ activity.time+
                "</p>"+
            "</div>"+
            "<div class=\"card-body collapse pt-0\" id=\"collapse"+activity._id+"\" data-parent=\".content-area\">"+
                "<p class=\"card-text\">"+
                    activity.fullDsc+
                "</p>"+
                "<p class=\"card-text\">"+
                    "Joined: "+activity.members.join(", ")+
                "</p>"+
                "<button type=\"button\" class=\"btn btn-info join\">Join activity</button>"+
            "</div>"+
        "</div>"
    ));
    $(".join").click(function () {
        if(login( function(){$(".collapse.show").find(".join")[0].click();} ))
            $("<a href=\"/activities/join?id="+$(this).closest(".activity").data().index+"&username="+localStorage.username+"\"></a>").appendTo(document.body)[0].click();
    });
}

var loginCallback = function(){};
function login(callback){
    if (localStorage.username){
        return true;
    }
    $('#loginModal').modal('show');
    loginCallback = callback;
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
    loginCallback();
});

$("#add-activity").click(function () {
    if(login( function(){$("#add-activity")[0].click()} ))
        $("<a href=\"/add-activity/index.html\"></a>").appendTo(document.body)[0].click();
});

$("#search-activity-submit").click(function () {
    // ?
    // if(login())
        $("<a href=\"/search-activity/index.html?q="+$("#search-activity").val()+"\"></a>").appendTo(document.body)[0].click();
});

$("#my-activities").click(function () {
    if(login( function(){$("#my-activities")[0].click()} ))
        $("<a href=\"/my-activities/index.html\"></a>").appendTo(document.body)[0].click();
});

$("#toggle-login").click(function () {
    if(login( function(){} )){
        logout();
        loginOutButton();
    }
});

loginOutButton();