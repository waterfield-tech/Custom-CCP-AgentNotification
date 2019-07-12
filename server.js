var express = require("express");
var app = express();

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get("/", function(request, response) {
  response.render("index", {
    title: "title"
  });
});

app.use(express.static(__dirname + "/static"));
console.log(__dirname);

app.listen(4200, function() {
  console.log("listening on port 4200");
});
