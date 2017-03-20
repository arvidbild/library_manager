var express = require("express");
var router = express.Router();


/* GET /all_patrons */
router.get("/all_patrons",function (req,res,next) {
    res.render("all_patrons");
});

/* GET /new_patron */
router.get("/patrons/new",function (req,res,next) {
    res.render("new_patron");
});


module.exports = router;
