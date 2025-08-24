const express = require("express");
const app = express();

app.get("/get-all-routes", (req, res) => {
  let get = app._router.stack.filter(r => r.route && r.route.methods.get).map(r => r.route.path);
  let post = app._router.stack.filter(r => r.route && r.route.methods.post).map(r => r.route.path);
  res.send({ get: get, post: post });
});

app.get("/hello", (req, res) => {
  res.send("hello");
});

app.post("/world", (req, res) => {
  res.send("world");
});

app.get("/", (req, res) => {
  res.send("welcome");
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
