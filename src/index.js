const path = require("path");
const express = require("express");

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));

app.all("*", (req, res) => {
  res.status(404).send("Page not found");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
