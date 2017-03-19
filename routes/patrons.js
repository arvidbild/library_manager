var express = require("express");
var router = express.Router();


/* GET /all_patrons */
router.get("/all_patrons",function (req,res,next) {
    res.render("all_patrons");
});

module.exports = router;
