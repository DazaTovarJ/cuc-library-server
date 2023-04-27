const path = require("path");
const express = require("express");

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.post("/send", (req, res) => {
  console.log(req.body);

  if (
    !req.body.solicitor_id ||
    !req.body.solicitor_given_name ||
    !req.body.solicitor_family_name ||
    !req.body.book_name ||
    !req.body.book_author ||
    !req.body.book_publisher ||
    !req.body.book_year
  ) {
    return res.redirect("/error.html");
  }

  res.send("Message received");
});

app.all("*", (req, res) => {
  res.status(404).send("Page not found");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
