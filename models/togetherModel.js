//include mongoose in file
var mongoose = require('mongoose');




//the schema constructor function
var Schema = mongoose.Schema;
//create a new instance of schema

let userSchema = new mongoose.Schema({
    name: String,
    password: String
});

// let locationSchema = new mongoose.Schema({
//     lat: Number,
//     lng: Number
// });

// let activitySchema = new mongoose.Schema({
// 	creator: String,
// 	members: [String],
// 	category: String,
// 	subject: String,
// 	updated: { type: Date, default: Date.now },
// 	location: locationSchema  
// });

let activitySchema = new Schema({
	addressLoc: { type: { type: String } , coordinates: [Number] }, // {lng: Number, lat: Number},
	address: String,
	category: String,
	time: String,
	date: String,
	subject: String,
	fullDsc: String,
	creator: String,
	members: [String]
  });

// Instances of these models represent documents which can be saved and retrieved from our database.
//The first parameter is model name, the second argument is our schema.

let Activity = mongoose.model('activity', activitySchema)

module.exports = Activity
