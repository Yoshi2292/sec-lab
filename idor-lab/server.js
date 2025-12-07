const express = require("express");
const app = express();
const port = 4000;

// 擬似ユーザDB
const users = {
  1: { id: 1, name: "Alice", email: "alice@test.com" },
  2: { id: 2, name: "Bob", email: "bob@test.com" },
  3: { id: 3, name: "Charlie", email: "charlie@test.com" }
};

// ログイン中のユーザ（本当はセッション管理すべきだが省略）
const LOGGED_IN_USER_ID = 1;

app.get("/profile", (req, res) => {
  const targetId = req.query.id;

  // ★ 脆弱：本来は「targetId がログイン中のユーザか確認」すべき
  const info = users[targetId];

  res.send(info ? info : "No such user");
});

app.listen(port, () => {
  console.log(`IDOR test → http://localhost:${port}`);
});

