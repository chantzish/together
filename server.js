var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Activity = require('./models/togetherModel');

//Connecting to the MongoDB Database
mongoose.connect('mongodb://localhost/activityDB' , function () {
    console.log("DB connection established!!!");
})

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// These will define your API:

// to handle getting all activities and their location
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

// to handle add a activity
app.post('/addActivity', (request, response) => {
  let activityObj = new Activiti({
    text: request.body,
  })
  activityObj.save();
  response.send(activityObj);
});

// to handle deleting a activity
app.delete('/deleteActivity/:activityId', (request, response) => {
  let activityId = request.params.activityId;
  Post.findByIdAndRemove(activityId, (err, removedActivityId) => {
    if (err) {
      console.log(err);
    } else {
      response.send(removedActivityId);
    }
  });
});
// to handle deleting a activity by category
app.get('/findActivity/:category', (request, response) => {
  let myCategory = request.params.category;
  Activity.find({
    category: myCategory,
  }).exec(function (error, activities) {
    if (error) {
      return console.error(error);
    } else {
      response.send(activities);
    }
  });
});

app.use(express.static('public'));
app.use(express.static('node_modules'));
//Connecting to the local server
const SERVER_PORT = 8000;
app.listen(SERVER_PORT, () => {
  console.log("Server started on port " + SERVER_PORT);
});


/*// 4) to handle adding a comment to a post
app.post('/post/:postId/AddComment', (request, response) => {  
  let postId = request.params.postId;
  Post.findByIdAndUpdate(postId, { $push: { comments: request.body } }, { new: true }, (err, updatedPost) => {
    if (err) {
      console.log(err);
    } else {
      response.send(updatedPost);
    }
  });
});

// 5) to handle deleting a comment from a post
app.delete('/post/:postId/deleteComment/:commentId', (request, response) => {
  let postId = request.params.postId;
  let commentId = request.params.commentId;
  Post.findByIdAndUpdate(postId, { $pull: { comments: { _id: commentId } } }, { new: true }, (err, updatedComment) => {
    if (err) {
      console.log(err);
    } else {
      response.send(updatedComment);
    }
  });
}); */

/*=====================================================
Create activities Collection in Db
=======================================================*/
function createActivitiesInDB()
{
  var firstActivity = new Activity ({
    creator: "yehuda",
    members: ['ron', 'avi'],
    category: 'football',
    subject:  'play',
    updated: '12/10/1990',
    location: {
      lat: 51.508742,
      lng : -0.120850
    } 
  });
  
  var secendActivity = new Activity ({
    creator: "yehuda",
    members: ['ron', 'avi'],
    category: 'football',
    subject:  'play',
    updated: '12/10/1990',
    location: {
      lat: 51.519942, 
      lng: -0.510850
    } 
  });
  
  var thirdActivity = new Activity ({
    creator: "yehuda",
    members: ['ron', 'avi'],
    category: 'chess',
    subject:  'play',
    updated: '12/10/1990',
    location: {
      lat: 51.525042, 
      lng: -0.920850
    } 
  });
  
  var fourthActivity = new Activity ({
    creator: "yehuda",
    members: ['ron', 'avi'],
    category: 'chess',
    subject:  'training', 
    updated: '12/10/1990',
    location: {
      lat: 51.497642,
      lng: 0.120850
    } 
  }); 
  firstActivity.save(function(err, data) {
    if (err) {
      console.error(err);
    } else {
      //console.error(data);
    }
  });
  secendActivity.save(function(err, data) {
    if (err) {
      console.error(err);
    } else {
      //console.error(data);
    }
  });
  thirdActivity.save(function(err, data) {
    if (err) {
      console.error(err);
    } else {
      //console.error(data);
    }
  });
  fourthActivity.save(function(err, data) {
    if (err) {
      console.error(err);
    } else {
      //console.error(data);
    }
  });
}
/*Activity.create({
  numberOfPages: 22,
  author: {
    name: "Joe",
    height: 156
  }
}, function(err, data) {
  if (err) {
    return console.error(err)
  }
  console.log(data)
})*/

//createActivitiesInDB();


  




