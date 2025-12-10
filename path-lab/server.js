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

app.listen(4005, () => console.log("Path Traversal Lab at http://localhost:4005"));

