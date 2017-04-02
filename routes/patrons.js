var express = require("express");
var router = express.Router();
var Patrons = require("../models").patrons; 
var Loans = require("../models").loans;
var Books = require("../models").books;

/* GET /all_patrons */
router.get("/all_patrons",function (req,res,next) {
    Patrons.findAll().then(function(patrons){
    res.render("all_patrons",{patrons: patrons});
    }).catch(function(error){
    });
});

/* GET /new_patron */
router.get("/new_patron",function (req,res,next) {
    
    res.render("new_patron");       
});

/* GET /patron_detail */
router.get("/patron_detail/:id",function(req,res,next) {
    
    var patronlist;
    
    Patrons.findById(req.params.id).then(function(patrons){
    patronlist = patrons;
        
        }).then(Loans.findAll(
            {include: [{all:true}]
     
            }).then(function(loans){
                res.render("patron_detail",{patrons : patronlist, loans: loans });   
    }));    
});

/* POST /new_patron */
router.post("/new_patron", function(req,res,next){
    Patrons.create(req.body).then(function(patrons){   
    res.redirect("all_patrons");
    });
    
}); 

/* POST /patron_detail */
router.post("/patron_detail/:id", function(req,res,next){
    Patrons.findById(req.params.id).then(function(patrons){
        return patrons.update(req.body);
    }).then(function(){
    res.redirect("/all_patrons");
    });
});

module.exports = router;
