const path = require("path");
const express = require("express");

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.post("/send", (req, res) => {
  console.log(req.body);
  res.send("Message received");
});

app.all("*", (req, res) => {
  res.status(404).send("Page not found");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
