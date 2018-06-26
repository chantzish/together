
import GoogleMaps from './google-maps.js';
import ActivityRepository from './activities-repository.js';
import EventsHandler from './events-handler.js';

let googleMaps = new GoogleMaps();
let activityRepository = new ActivityRepository(googleMaps);
let eventsHandler = new EventsHandler(googleMaps, activityRepository);
eventsHandler.getAllActivities();
eventsHandler.searchActivities();

// to sort
window.loginCallback = function(){};
function login(callback){
    if (localStorage.username){
        return true;
    }
    $('#loginModal').modal('show');
    window.loginCallback = callback;
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
    window.loginCallback();
});

$("#add-activity").click(function () {
    if(login( function(){$("#add-activity")[0].click();} ))
        $("<a href=\"/add-activity/index.html\"></a>").appendTo(document.body)[0].click();
});

$("#my-activities").click(function () {
    if(login( function(){$("#my-activities")[0].click();} ))
        $("<a href=\"/my-activities/index.html\"></a>").appendTo(document.body)[0].click();
});

$("#toggle-login").click(function () {
    if(login(function(){})){
        logout();
        loginOutButton();
    }
});

loginOutButton();



