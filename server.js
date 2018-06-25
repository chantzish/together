// todo: add tags from user
var availableTags = [
    "sport",
    "chess",
    "gaming",
    "reading",
    "politics",
    "cooking",
    "meeting",
    "educating",
    "cinema",
    "coding"
];

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var consolidate = require("consolidate");
var Handlebars = require("handlebars");

// Configure the Handlebars engine
app.engine("html", consolidate.handlebars);
app.set("view engine", "html");
app.set("views", __dirname + "/views");

var Activity = require("./models/togetherModel");
mongoose.connect(process.env.CONNECTION_STRING || 'mongodb://user:Resu1234@sandbox-shard-00-00-m73f0.gcp.mongodb.net:27017,sandbox-shard-00-01-m73f0.gcp.mongodb.net:27017,sandbox-shard-00-02-m73f0.gcp.mongodb.net:27017/activityDB?ssl=true&replicaSet=Sandbox-shard-0&authSource=admin&retryWrites=true',
 function (error, result){
    if(error) { return console.error(error); }
    console.log ("DB connection established!!!");
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/categories/search', function(req, res){
    // res.set('Access-Control-Allow-Origin', '*');
    res.send(availableTags.filter(tag => req.query.term && tag.search(req.query.term) >= 0));
});
app.get('/activities/search', function(req, res){
    // console.log(req.query.q+" "+req.query.around);
    // {position: {$geoWithin: { $centerSphere: [ [ -10.732611054687766, 49.24238287959241 ], 0.15427981245264843 ]}}}
    //addressLoc: {$geoWithin: { $centerSphere: [ [ req.query.around.split(',')[0], req.query.around.split(',')[1] ], 0.0003 ]}}},
    Activity.find({ $or: [{'category': {$regex: req.query.q}}, {'subject': {$regex: req.query.q}}],
    addressLoc: {$near: {$geometry: { type: "Point" , coordinates: [ req.query.around.split(',')[0] , req.query.around.split(',')[1] ]}}}},
    // addressLoc: {$geoWithin: { $centerSphere: [ [ req.query.around.split(',')[0], req.query.around.split(',')[1] ], 0.0003 ]}}},
    function (error, result){
        // error handling?
        if(error) { console.error(error);res.send("failed");return; }
        console.log ("result of find is: "+result);
        var activities = result;
        res.send(activities);
    });
});
app.post('/activities/new',function(req, res){
    // res.set('Access-Control-Allow-Origin', '*');
    // res.send("you have added a new activity!")
    // console.log(req.body);
    var newActivity = new Activity({
        addressLoc: {type: "Point",coordinates: [JSON.parse(req.body.addressLoc).lng,JSON.parse(req.body.addressLoc).lat]},
        address: req.body.address,
        category: req.body.category,
        time: req.body.time,
        date: req.body.date,
        subject: req.body.subject,
        fullDsc: req.body.fullDsc,
        creator: req.body.username,
        members: [req.body.username]
    });
    newActivity.save(function (error, result){
        var message
        if(error) { console.error(error);message = "failed creating activity"; }
        else{console.log ("result of save is: "+result);message = "activity created successfully";}
        res.render("status", {
            message: message,
            href: "/my-activities/index.html"
        });
    });
    // res.send(JSON.stringify(req.body));
})
app.get('/activities/join',function(req, res){
    // console.log(req.query.id);
    Activity.update({ _id: req.query.id }, { $addToSet: { 'members': req.query.username }}, function (error, result){
        var message
        if(error) { console.error(error);message = "failed joining activity"; }
        else{console.log ("result of update-push is: "+result);message = "joined activity successfully";}
        res.render("status", {
            message: message,
            href: "/my-activities/index.html"
        });
    });
});

app.get('/activities/mine',function(req, res){
    Activity.find({ members: req.query.username }, function (error, result){
        // error response?
        if(error) { console.error(error);res.send("failed");return; }
        console.log ("result of find is: "+result);
        res.send(result);
    });
});
app.get('/activities/cancel',function(req, res){
    Activity.findByIdAndUpdate(req.query.id, {$pull:{members: req.query.username}}, function (error, result){
        var message
        if(error) { console.error(error);message = "failed canceling activity"; }
        else {
            console.log ("result of findByIdAndUpdate-pull is: "+result);
            message = "your activity participation was canceled successfully";
            if(result.members.length == 1 && result.members[0] === req.query.username){
                Activity.deleteOne({_id: req.query.id}, function(deleteError, deleteResult){
                    if(deleteError) { console.error(deleteError);}
                    else {console.log ("result of deleteOne is: "+deleteResult);}
                })
            } 
        }
        res.render("status", {
            message: message,
            href: "/my-activities/index.html"
        });
    });
    // Activity.findById(req.query.id, function (error, result) {
    //     var message
    //     if (error){ console.error(error);message = "failed canceling activity"; }
    //     else{
    //         console.log ("result of findById is: "+result);
    //         var index = result.members.indexOf(req.query.username);
    //         if (index !== -1) array.splice(index, 1);
    //         if(result.members.length > 0){
    //             result.save(function (updateError, updateResult) {
    //                 if (updateError) return console.error(updateError);
    //                 console.log ("result of update-pull after cancel is: "+updateResult);
    //             });
    //         }
    //         else {
    //             result. //? delete
    //         }
    //         message = "your activity participation was canceled successfully";
    //     }
    //     res.render("status", {
    //         message: message,
    //         href: "/my-activities/index.html"
    //     });
    // });
});

app.get('/loadAllActivities', (request, response) => {
    Activity.find({}, function (error, activities) {
      if (error) {
        response.send(error); 
        console.error(error);
      } else {
        response.send(activities);
      }
    });
});


app.use(express.static("public"));
app.listen(process.env.PORT || 8080)
