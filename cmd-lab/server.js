const express = require("express");
const { exec } = require("child_process");

const app = express();
app.use(express.urlencoded({ extended: true }));

// ★ コマンドインジェクション脆弱
app.post("/ping", (req, res) => {
    const host = req.body.host;        // ← ユーザー入力をそのまま使用
    const cmd = `ping -c 1 ${host}`;   // ← ここが危険！

    exec(cmd, (err, stdout, stderr) => {
        if (err) return res.send("Error: " + err.message);
        res.send("<pre>" + stdout + "</pre>");
    });
});

app.get("/", (req, res) => {
    res.send(`
        <h2>Command Injection Lab</h2>
        <form method="POST" action="/ping">
            <input name="host" placeholder="8.8.8.8">
            <button>Ping</button>
        </form>
    `);
});

app.listen(5001, () => console.log("CMD lab at http://localhost:5001"));

