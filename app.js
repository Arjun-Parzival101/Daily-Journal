//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const _ = require("lodash") //For special lowercasing in urls

let posts = []; //Empty array for post content

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs'); //Setting EJS

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // Using express for extracting local files

//Route 1 Home GET
app.get("/", function(req, res) {

    //Both Home content and Compose Entry contents are rendered in Home Page
    res.render("home", { homeContent: homeStartingContent, posts: posts });

})

//Route 2 about GET
app.get("/about", function(req, res) {
    res.render("about", { aboutContent: aboutContent });
})

//Route 3 contact GET
app.get("/contact", function(req, res) {
    res.render("contact", { contactContent: contactContent });
})

//Route 4 compose GET
app.get("/compose", function(req, res) {
    res.render("compose");
});

//Route 4 compose POST
app.post("/compose", function(req, res) {

    //Creating Data object for Compose entry which has to rendered in Home page
    const post = {
        //Parsing inputs in object
        titleData: req.body.title,
        postData: req.body.post
    };
    posts.push(post); //Pushing Object into array

    res.redirect("/") //Redirecting to Home Route
});

//Route Parameters
app.get("/post/:postName", function(req, res) {

    //Selecting the Title from url
    const selectedTitle = req.params.postName;
    const requestedTitle = _.lowerCase(selectedTitle);

    posts.forEach(function(post) {
        //Selecting the Title from entered data (input array)
        const storedTitle = _.lowerCase(post.titleData);
        const storedPost = post.postData;

        //Cheching if the both Titles are same
        if (requestedTitle === storedTitle) {
            res.render("post", { selectedTitle: selectedTitle, storedPost: storedPost });
        };

    });

});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});