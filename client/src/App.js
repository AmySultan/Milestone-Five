import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  let [input, setInput] = useState({});
  let [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("/students")
      .then(res => res.json())
      .then(json => {
        setStudents(json);
        console.log(json);
      })
      .catch(error => {});
  }, []);

  const handleChange = e => {
    console.log(e);
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    addStudent();
  };

  const addStudent = () => {
    fetch("/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(input)
    })
      .then(response => response.json())
      .then(students => {
        setStudents(students);
        console.log(students);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const deleteStudent = id => {
    // delete task from database
    // upon success, update tasks
    // upon failure, show error message
    fetch(`/students/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      // upon success, update tasks
      .then(response => response.json())
      .then(() => {
        setStudents(students.filter(e => e.id !== id)); //takes from getAllStudents

        // Continue fetch request here
      })
      // upon failure, show error message
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm"></nav>
      <nav className="navbar navbar-info bg-info justify-content-between">
        <h1>CodeOp's Facebook</h1>
        <form className="form-inline" onSubmit={e => handleSubmit(e)}>
          First name:
          <input
            className="form-control mr-sm-2"
            type="text"
            name="firstname"
            id="firstname"
            placeholder="Your name"
            onChange={e => handleChange(e)}
          ></input>
          Last name:
          <input
            className="form-control mr-sm-2"
            type="text"
            name="lastname"
            id="lastname"
            value="Your surname"
            // placeholder="Your surname"
            onChange={e => handleChange(e)}
          ></input>
          <button type="reset" class="btn btn-warning">
            Submit
          </button>
        </form>
      </nav>

      <table class="table table-hover">
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {students.map(e => (
            <tr>
              <td>{e.id}</td>
              <td>{e.firstname}</td>
              <td>{e.lastname}</td>
              <div>
                <button className="delete" onClick={() => deleteStudent(e.id)}>
                  Delete
                </button>
              </div>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
