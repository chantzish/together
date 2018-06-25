
import GoogleMaps from './google-maps.js';
import ActivityRepository from './activities-repository.js';
import EventsHandler from './events-handler.js';

let googleMaps = new GoogleMaps();
let activityRepository = new ActivityRepository(googleMaps);
let eventsHandler = new EventsHandler(googleMaps, activityRepository);
eventsHandler.getAllActivities();
eventsHandler.searchActivities();

// to sort
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

$("#add-activity").click(function () {
    if(login())
        $("<a href=\"/add-activity/index.html\"></a>").appendTo(document.body)[0].click();
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



