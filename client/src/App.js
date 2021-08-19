import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  let [input, setInput] = useState({});
  let [students, setStudents] = useState([]);
  // let [firstName, setFirstName] = useState("");
  // let [lastName, setLastName] = useState("");

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

  const addStudent = id => {
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
    fetch("/students", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      // upon success, update tasks
      .then(response => response.json())
      .then(data => {
        setStudents(students.filter(e => e.id !== id)); //takes from getAllStudents

        // Continue fetch request here
      })
      // upon failure, show error message
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <h1>CodeOp's Facebook</h1>
      <form onSubmit={e => handleSubmit(e)}>
        <label>
          First name:
          <input
            type="text"
            name="firstname"
            id="firstname"
            onChange={e => handleChange(e)}
          ></input>
        </label>
        Last name:
        <input
          type="text"
          name="lastname"
          id="lastname"
          onChange={e => handleChange(e)}
        ></input>
        <label for="lastname"></label>
        <button type="submit">Submit</button>
      </form>

      <ul>
        {students.map(item => (
          <li key={item.id}>
            {item.firstname} {item.lastname}
            <button className="delete" onClick={e => deleteStudent(item.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
