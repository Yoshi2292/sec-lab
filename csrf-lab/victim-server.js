const express = require("express");
const crypto = require("crypto");
const app = express();

app.use(express.urlencoded({ extended: true }));

// ログイン済みである前提
const SESSION = { user: "yoshiki" };

// CSRF トークンをセッション側に保持（超簡易版）
let csrfToken = null;

// 送金フォーム（安全版）
app.get("/transfer", (req, res) => {
    // ランダムなトークン発行
    csrfToken = crypto.randomBytes(16).toString("hex");

    res.send(`
        <h2>Secure Bank Transfer</h2>
        <form method="POST" action="/transfer">
            <input name="to" placeholder="to"><br>
            <input name="amount" placeholder="amount"><br>

            <!-- ★ CSRF トークンを hidden に埋め込む -->
            <input type="hidden" name="csrf" value="${csrfToken}">

            <button>Send</button>
        </form>
    `);
});

// ★ POST 時にトークンを確認する
app.post("/transfer", (req, res) => {
    const { to, amount, csrf } = req.body;

    // トークン検証
    if (csrf !== csrfToken) {
        return res.status(400).send("<h3>CSRF detected — request blocked.</h3>");
    }

    res.send(`
        <h3>Transfer Completed</h3>
        <p>From: ${SESSION.user}</p>
        <p>To: ${to}</p>
        <p>Amount: ${amount}</p>
    `);
});

app.listen(4000, () => console.log("Secure server at http://localhost:4000"));

