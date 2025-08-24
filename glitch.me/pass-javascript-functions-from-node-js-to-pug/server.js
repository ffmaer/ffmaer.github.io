const express = require("express");
const app = express();
app.use(express.static("public"));
app.set("view engine", "pug");

function navigation() {
  let pages = [
    {
      id: 0,
      name: "Index"
    },
    {
      id: 1,
      name: "About"
    },
    {
      id: 2,
      name: "Kontakt"
    }
  ];
  
  document.write(pages[0].name); // write something on the page, so you know something happened
}

app.get("/", (req, res) => {
  res.render("index", { navigation: navigation });
});
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
