var express = require('express');
var router = express.Router();

/* GET /all_loans */
router.get("/all_loans",function (req,res,next) {
    res.render("all_loans");
});

/* GET /new_loan */
router.get("/new_loan",function (req,res,next) {
    res.render("new_loan");
});

/* GET /overdue_loans */
router.get("/overdue_loans",function (req,res,next) {
    res.render("overdue_loans");
});

/* GET /checked_loans */
router.get("/checked_loans",function (req,res,next) {
    res.render("checked_loans");
});


module.exports = router;