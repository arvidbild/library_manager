var express = require('express');
var router = express.Router();


/* GET /all_books. */
router.get("/all_books", function(req, res, next) {
  res.render("all_books");
});

/* GET /new_book */
router.get("/new_book", function(req, res, next) {
  res.render("new_book");
});

/* GET /overdue_books */
router.get("/overdue_books", function(req, res, next) {
  res.render("overdue_books");
});

/* GET /checked_books */
router.get("/checked_books", function(req, res, next) {
  res.render("checked_books");
});

/* GET /return_book */
router.get("/return_book", function(req, res, next) {
  res.render("return_book");
});

module.exports = router;