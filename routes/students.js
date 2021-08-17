var express = require("express");
var router = express.Router();
const db = require("../model/helper");

// GET student list
router.get("/", function(req, res, next) {
  db("SELECT * FROM students;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

// GET one student
router.get("/:id", function(req, res, next) {
  //your code here
});

// INSERT a new student into the DB
router.post("/", function(req, res, next) {
  //your code here
});

// DELETE a student from the DB
router.delete("/:id", function(req, res, next) {
  //your code here
});

module.exports = router;
