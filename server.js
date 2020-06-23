var express = require("express");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

var PORT = process.env.PORT || 3000;

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


var router = require("./routing/router.js");
app.use(router);

var syncOptions = {
    force: false
};

if (process.env.NODE_ENV === "test") {
    syncOptions.force = true;
}
module.exports = app;

mongoose.set('useFindAndModify', false);
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://";


mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.listen(PORT, function () {
    console.log("App listening on port " + PORT + "!");
});




