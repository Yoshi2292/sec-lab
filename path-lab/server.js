const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.urlencoded({ extended: true }));

// ★ 脆弱：ファイル名をそのまま結合
app.get("/view", (req, res) => {
    const filename = req.query.file;     // ← 攻撃者コントロール
    const fullPath = path.join(__dirname, "files", filename);

    // 本当は危険な読み取り
    try {
        const content = fs.readFileSync(fullPath, "utf8");
        res.send(`<pre>${content}</pre>`);
    } catch (e) {
        res.status(404).send("File not found");
    }
});

app.listen(4005, () => console.log("Path Traversal Lab at http://localhost:4005"));

