var activities;

function search(){
    $.ajax({ method: "GET", url: "/activities/mine?username="+localStorage.username})
    .then(function(result){
        activities = result;
        render();
    });
}

function render() {
    activities.forEach(activity => $(".row").append(
        "<div class=\"card activity mb-3 col-4\">"+
            "<div class=\"card-body\">"+
                "<h3 class=\"card-title\">"+
                    activity.category+" - "+activity.subject+
                "</h3>"+
                "<p class=\"card-text\">"+
                    activity.address+"<br>"+
                    activity.date+ " "+ activity.time+
                "</p>"+
            "</div>"+
            "<div class=\"card-body pt-0\">"+
                "<p class=\"card-text\">"+
                    activity.fullDsc+
                "</p>"+
                "<a class=\"btn btn-danger\" href=\"/activities/cancel?id="+activity._id+"&username="+localStorage.username+"\">Cancel activity</a>"+
            "</div>"+
        "</div>"
    ));
}
// login
function login(){
    if (localStorage.username){
        return true;
    }
    $('#loginModal').modal({backdrop: 'static', keyboard: false});
    return false;
}
function logout(){
    localStorage.removeItem("username");
}

$("#submitlogin").click(function(){
    localStorage.username = $("#username").val();
    $('#loginModal').modal('hide');
    search();
})

$("#add-activity").click(function () {
    if(login())
        $("<a href=\"/add-activity/index.html\"></a>").appendTo(document.body)[0].click();
})

$("#search-activity-submit").click(function () {
    if (login())
        $("<a href=\"/search-activity/index.html?q="+$("#search-activity").val()+"\"></a>").appendTo(document.body)[0].click();
})

// start
if(login())
    search();