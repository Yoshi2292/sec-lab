const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());

// Cookie を発行するエンドポイント
app.get("/set", (req, res) => {
    res.cookie("sid", "ABC123", {
        httpOnly: true,      // ← XSS から Cookie を守る
        secure: "none",       // ← 後で true に変える実験
        sameSite: true      // ← 後で strict / none に変える実験
    });
    res.send("Cookie sent with attributes");
});

// Cookie が送信されているか確認する
app.get("/check", (req, res) => {
    res.send("Cookie received: " + JSON.stringify(req.headers.cookie));
});

// サーバ起動
app.listen(5000, () => {
    console.log("Cookie test at http://localhost:5000");
});

