var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//app config
mongoose.connect("mongodb://localhost/miniBlogApp", {useMongoClient: true});

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


//mongoose/model config
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now}
});


var Blog = mongoose.model("Blog", blogSchema);

//RESTFUL routes
app.get("/", function(req, res) {
  res.redirect("/blogs")
});

//index
app.get("/blogs", function(req, res) {
  Blog.find({}, function(err, blogs) {
    if(err) {
      console.log("something went wrong");
    } else {
      res.render("index", {blogs: blogs});
    }
  });

});


app.listen(3000, function() {
  console.log("Blog app server running!");
});
