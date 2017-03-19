var express = require('express');
var router = express.Router();

/* GET /all_loans */
router.get("/all_loans",function (req,res,next) {
    res.render("all_loans");
});

module.exports = router;