var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
    res.send("respond with user");
});

router.get("/cool", (req, res, next) => {
    res.send("You are cool");
});

module.exports = router;
