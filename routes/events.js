const { json } = require("express");
const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    res.send("Events");
});

module.exports = router;
