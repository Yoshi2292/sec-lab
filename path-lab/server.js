const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.urlencoded({ extended: true }));

// ★ 安全版：ホワイトリスト
app.get("/view_safe", (req, res) => {
    const filename = req.query.file;

    // 許可ファイル一覧
    const allowed = ["sample.txt"];

    if (!allowed.includes(filename)) {
        return res.status(400).send("Access Denied");
    }

    const fullPath = path.join(__dirname, "files", filename);
    const content = fs.readFileSync(fullPath, "utf8");
    res.send(`<pre>${content}</pre>`);
});

// ディレクトリ外に出ようとしたパスをブロックする（正規化チェック）
app.get("/view_safe2", (req, res) => {
    const filename = req.query.file;
    const base = path.join(__dirname, "files");
    const fullPath = path.normalize(path.join(base, filename));

    // files フォルダの外に出たら拒否
    if (!fullPath.startsWith(base)) {
        return res.status(400).send("Path Traversal Blocked");
    }

    try {
        const content = fs.readFileSync(fullPath, "utf8");
        res.send(`<pre>${content}</pre>`);
    } catch (e) {
        res.status(404).send("File not found");
    }
});

app.listen(4005, () => console.log("Path Traversal Lab at http://localhost:4005"));

