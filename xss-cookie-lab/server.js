const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3000;

const messages = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "stored.html"));
});

// 投稿処理
app.post("/post", (req, res) => {
  messages.push(req.body.msg || null);
  res.redirect("/board.html");
});

// メッセージ取得 API
app.get("/messages", (req, res) => {
  res.json(messages);
});

app.listen(port, () => {
  console.log(`Victim server running at http://localhost:${port}`);
});

