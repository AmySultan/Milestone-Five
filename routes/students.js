var express = require("express");
var router = express.Router();
const db = require("../model/helper");

const getAllStudents = (req, res) => {
  db("SELECT * FROM students ORDER BY id ASC;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
};

console.log("Before request");
// GET student list
router.get("/", function(req, res, next) {
  // console.log("I'm here");
  db("SELECT * FROM students;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

// GET one student
router.get("/:id", function(req, res, next) {
  //your code here
  db(`SELECT * from students where id =${req.params.id};`)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

// INSERT a new student into the DB
router.post("/", function(req, res, next) {
  //your code here
  db(
    `INSERT INTO students(firstname,lastname)VALUES ("${req.body.firstname}","${req.body.lastname}")`
  )
    .then(results => {
      getAllStudents(req, res);
    })
    .catch(err => res.status(404).send(err));
});

// DELETE a student from the DB
router.delete("/:id", function(req, res, next) {
  //your code here
  db(`DELETE FROM students WHERE id = ${req.params.id};`)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

module.exports = router;
