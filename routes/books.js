var express = require('express');
var router = express.Router();
var Books = require("../models").books;
var Patrons = require("../models").patrons;
var Loans = require("../models").loans;
var moment = require("moment");

/* GET /all_books. */
router.get("/all_books", function(req, res, next) {
   Books.findAll().then(function(books) {
       res.render("all_books",{books: books});
   })
});  


/* GET /new_book */
router.get("/new_book", function(req, res, next) {
  res.render("new_book");
});

/* GET /overdue_books */
router.get("/overdue_books", function(req, res, next) {
    
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
        res.render("overdue_Books",{overdueBooks: overdueBooks, loans: loans});   
                
    });
});

/* GET /checked_books */
router.get("/checked_books", function(req, res, next) {

Loans.findAll(
    {include: [{all: true}]
        }).then(function(loans){
        
        var returnedBooks = [];    
        for(var i = 0; i < loans.length; i++) { 
        if(loans[i].returned_on != null){
        returnedBooks.push(loans[i]);    
        }}
        res.render("checked_books",{returnedBooks: returnedBooks});    
        });    
});


/* GET /book_detail' */
router.get("/book_detail/:id", function(req, res, next) {
    var loanlist;
    
    Loans.findAll(
     {include : [{all: true}]}
        ).then(function(loans){
        loanlist = loans;
         }).then(Books.findById(req.params.id).then(function(book){
            res.render("book_detail",{book: book, loans: loanlist});
    }));
     
});

/* GET /return_book */
router.get("/return_book/:id",function (req,res,next) {
    
    var time = Loans.build({
    returned_on: moment().format("YYYY-MM-DD")    
    });
    
    Loans.findById(
        (req.params.id),
        {include: [{all:true}],
    }).then(function(loans) {
       res.render("return_book",{loans: loans, time: time});
   });
});

/* POST /return_book */
router.post("/return_book/:id",function (req,res,next) {
    Loans.findById(
        (req.params.id),
        {include: [{all:true}],
    }).then(function(loans) {
       return loans.update(req.body);
    }).then(function(){
        res.redirect("/all_loans");
    });
});


/* POST /create new book */
router.post("/new_book", function(req,res,next) {
    Books.create(req.body).then(function(books) {
    res.redirect("/all_books");          
    });
});

/* POST /book_detail */
router.post("/book_detail/:id", function(req,res,next) {
    Books.findById(req.params.id).then(function(book) {
    return book.update(req.body);
    });
    res.redirect("/all_books");
});

module.exports = router;