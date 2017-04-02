var express = require('express');
var router = express.Router();
var Loans = require("../models").loans;
var Books = require("../models").books;
var Patrons = require("../models").patrons;
var moment = require("moment");

/* GET /all_loans */
router.get("/all_loans",function (req,res,next) {
    Loans.findAll(
        {include: [{all:true}],
        order: 'book.title'
    }).then(function(loans) {
       res.render("all_loans",{loans: loans});
   });
});

/* GET /new_loan */
router.get("/new_loan",function (req,res,next) {

    //this variable store the time to populate the input fields.
    var loan = Loans.build({
    loaned_on: moment().format("YYYY-MM-DD"),
    return_by: moment().add(7, 'days').calendar()  });
        
    var booklist;
    
    Books.findAll().then(function(books){
        booklist = books;
    }).then(Patrons.findAll().then(function(patrons){
        res.render("new_loan",{books: booklist, patrons: patrons,loan: loan});    
        }));
});

/* GET /overdue_loans */
router.get("/overdue_loans", function (req,res,next) {
    
var todaysDate = moment().format();
todaysDate = Date.parse(todaysDate);
console.log(todaysDate);
    
Loans.findAll(
    {include: [{all: true}]
        }).then(function(loans){
        
        var overdueBooks = [];
        for(var i = 0; i < loans.length; i++) { 
        
        Date.parse(loans[i].return_by);
            
        if(loans[i].return_by < todaysDate){
        
        overdueBooks.push(loans[i]);
        }}
        console.log(overdueBooks);
        res.render("overdue_loans",{overdueBooks: overdueBooks, loans: loans});   
                
    });
});  

/* GET /checked_loans */
router.get("/checked_loans",function (req,res,next) {
    
    Loans.findAll(
    {include: [{all: true}]
        }).then(function(loans){
        
        var returnedBooks = [];    
        for(var i = 0; i < loans.length; i++) { 
        if(loans[i].returned_on != null){
         returnedBooks.push(loans[i]);    
        }}
        res.render("checked_loans",{returnedBooks: returnedBooks});    
        });
});



/* POST /new_loan */
router.post("/new_loan",function(req,res,next) {
    Loans.create(req.body).then(function (loans){
        res.redirect("/all_loans");
    });
});


module.exports = router;

