var express = require('express');
var router = express.Router();


/* GET /all_books. */
router.get("/all_books", function(req, res, next) {
  res.render("all_books");
});


/* GET /books/new. */
router.get("/books/new", function(req, res, next) {
  res.render("new_book");
});


module.exports = router;