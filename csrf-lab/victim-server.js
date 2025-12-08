const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

// ログイン中を想定して、固定セッション
const SESSION = { user: "yoshiki" };

// 脆弱な送金ページ
app.get("/transfer", (req, res) => {
    res.send(`
        <h2>Bank Transfer</h2>
        <form method="POST" action="/transfer">
            <input name="to" placeholder="to"><br>
            <input name="amount" placeholder="amount"><br>
            <button>Send</button>
        </form>
    `);
});

// ★脆弱：CSRF トークンなし
app.post("/transfer", (req, res) => {
    const { to, amount } = req.body;

    res.send(`
        <h3>Transfer Completed</h3>
        <p>From: ${SESSION.user}</p>
        <p>To: ${to}</p>
        <p>Amount: ${amount}</p>
    `);
});

app.listen(4000, () => console.log("Victim at http://localhost:4000"));

