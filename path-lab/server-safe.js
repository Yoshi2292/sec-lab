const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
app.use(express.urlencoded({ extended: true }));

//  読み取りを許可するディレクトリを固定
const BASE_DIR = path.resolve(__dirname, "files");

app.get("/", (req, res) => {
    res.send(`
        <h2>Path Traversal Lab (Safe)</h2>
        <form method="POST" action="/read-safe">
            <input name="file" placeholder="example.txt">
            <button>Read</button>
        </form>
    `);
});

app.post("/read-safe", (req, res) => {
    const filename = req.body.file;

    // ① 絶対パスに変換
    const target = path.resolve(BASE_DIR, filename);

    // ② BASE_DIR の外に出ていないかチェック
    if (!target.startsWith(BASE_DIR)) {
        return res.status(400).send("Invalid path (Traversal detected)");
    }

    try {
        const data = fs.readFileSync(target, "utf-8");
        res.send(`<pre>${data}</pre>`);
    } catch (err) {
        res.status(404).send("File not found or cannot read");
    }
});

app.listen(3002, () => console.log("Safe server at http://localhost:3002"));

