const path = require("path");
const fs = require("fs/promises");

const express = require("express");

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.post("/send", async (req, res) => {
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

  try {
    const data = {
      solicitor_id: req.body.solicitor_id,
      solicitor_given_name: req.body.solicitor_given_name,
      solicitor_family_name: req.body.solicitor_family_name,
      book_name: req.body.book_name,
      book_author: req.body.book_author,
      book_publisher: req.body.book_publisher,
      book_year: req.body.book_year,
    };

    let headers = Object.keys(data).join(",") + "\n";
    let fileData = Object.values(data).join(",") + "\n";

    try {
      await fs.access(path.join(__dirname, "data"), fs.constants.F_OK);
    } catch (err) {
      await fs.mkdir(path.join(__dirname, "data"));
    }

    await fs.writeFile(
      path.join(__dirname, "data", `id_${req.body.solicitor_id}.txt`),
      headers + fileData,
    );

    res.download(
      path.join(__dirname, "data", `id_${req.body.solicitor_id}.txt`),
    );
  } catch (err) {
    console.log(err);

    res.status(500).send("Could not create file");
  }
});

app.all("*", (req, res) => {
  res.status(404).send("Page not found");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
