var availableTags = [
    "actionScript",
    "appleScript",
    "asp",
    "basic",
    "c",
    "c++",
    "clojure",
    "cobol",
    "coldFusion",
    "erlang",
    "fortran",
    "groovy",
    "haskell",
    "java",
    "javaScript",
    "lisp",
    "perl",
    "ph",
    "python",
    "ruby",
    "scala",
    "scheme"
];


var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/categories/search', function(req, res){
    res.set('Access-Control-Allow-Origin', '*');
    res.send(availableTags.filter(tag => req.query.term && tag.search(req.query.term) >= 0));
});
app.post('/activities/new',function(req, res){
    res.set('Access-Control-Allow-Origin', '*');
    // res.send("you have added a new activity!")
    console.log(req.body);
    res.send(JSON.stringify(req.body));
})

app.use(express.static("public"));
app.listen(process.env.PORT || 8080)
