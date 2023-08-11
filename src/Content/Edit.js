import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Container, Form, Modal } from "react-bootstrap";
import { Trash, Pen } from "react-bootstrap-icons";
const Edit = () => {

  const storeDetails = () =>{
  let store = localStorage.getItem('fname');
  if (store) {
    return JSON.parse(localStorage.getItem('fname'))
  }
   else if(localStorage.getItem('lname')){
    return JSON.parse(localStorage.getItem('lname'))
  }
   else if(localStorage.getItem('dept')){
    return JSON.parse(localStorage.getItem('dept'))
  }
   else if(localStorage.getItem('mat')){
    return JSON.parse(localStorage.getItem('mat'))
  }
  else{
    return []
  }
}

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState("");
  const [matric, setMatric] = useState("");
  const [dept, setDept] = useState("");
  const [todo, setTodo] = useState(storeDetails());
  const [show, setShow] = useState(false);
  const [userIndex, setUserIndex] = useState(0);

  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newMatric, setNewMatric] = useState("");
  const [newDept, setNewDept] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = (item, index) => {
    setShow(true);
    setUserIndex(index);
    setNewFirstName(item.FN);
    setNewLastName(item.LN);
    setNewMatric(item.MT);
    setNewDept(item.DP);
  };

  const saveChanges = (e) => {
    e.preventDefault();
    setShow(false);
    const newState = todo.map((obj, indx) => {
      if (indx === userIndex) {
        return {
          ...obj,
          FN: newFirstName,
          LN: newLastName,
          MT: newMatric,
          DP: newDept,
        };
      }
      return obj;
    });

    setTodo(newState);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newObject = {
      FN: firstName,
      LN: lastName,
     MT: matric,
      DP: dept,
    };
    if (firstName && lastName && matric && dept) {
      setTodo((current) => [...current, newObject]);
    }
    setFirstName("");
    setLastName("");
    setMatric("");
    setDept("");
  };

  const deletebtn = (index) => {
    setTodo(todo.filter((item, ind) => ind !== index));
  };



useEffect(()=>{
localStorage.setItem('fname', JSON.stringify(todo))
},[todo])

useEffect(()=>{
localStorage.setItem('lname', JSON.stringify(todo))
},[todo])

useEffect(()=>{
localStorage.setItem('mat', JSON.stringify(todo))
},[todo])

useEffect(()=>{
localStorage.setItem('dept', JSON.stringify(todo))
},[todo])






  return (
    <Container className="mt-5">
      <h3 className=" text-center text-primary">STUDENT REGISTRATION</h3>
      <marquee className='text-success'>Welcome To Our Registration Page</marquee>
      <form onSubmit={handleSubmit}>
        <label >First Name</label>
        <input
          type="text"
          className="form-control  shadow-none"
          placeholder="Enter your First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
       <label className="mt-3">Last Name</label>
        <input
          type="text"
          className="form-control shadow-none "
          placeholder="Enter your Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
         <label className="mt-3">Matric Number</label>
        <input
          type="number"
          className="form-control shadow-none  "
          placeholder="Enter your matric Number"
          value={matric}
          onChange={(e) => setMatric(e.target.value)}
        />
         <label className="mt-3">Department</label>
        <input
          type="text"
          className="form-control shadow-none "
          placeholder="Enter your Department"
          value={dept}
          onChange={(e) => setDept(e.target.value)}
        />
        <button type="submit" className="btn btn-primary w-100 mt-4 shadow-none">
          Submit
        </button>
  
      </form>

      {todo.length > 0 ? (
        <table className="table  table-hover text-center mt-4">
          <thead>
            <tr>
              <th>S/N</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Matric Number</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todo.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.FN}</td>
                <td>{item.LN}</td>
                <td>{item.MT}</td>
                <td>{item.DP}</td>
                <td>
                  <button
                  title='delete'
                    onClick={() => deletebtn(index)}
                    className="btn"
                    style={{color:'red'}}
                  >
                    <Trash/>
                  </button>
                  <button
                  title='edit'
                   style={{color:'green'}}
                    onClick={() => handleShow(item, index)}
                    className="btn "
                  >
                    <Pen/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center mt-4 text-danger">
          <h4>No data available</h4>
        </div>
      )}

      {/* MODAL */}

      <Modal show={show} onHide={handleClose}>
        <Form action="" onSubmit={saveChanges}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Section</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label>First Name</label>
            <input
              type="text"
              value={newFirstName}
              onChange={(event) => setNewFirstName(event.target.value)}
              className="form-control shadow-none"
            />
            <label className="mt-3">Last Name</label>
            <input
              type="text"
              value={newLastName}
              onChange={(event) => setNewLastName(event.target.value)}
              className="form-control shadow-none"
            />
             <label className="mt-3">Matric Number</label>
            <input
              type="number"
              value={newMatric}
              onChange={(event) => setNewMatric(event.target.value)}
              className="form-control shadow-none"
            />
             <label className="mt-3">Department</label>
            <input
              type="text"
              value={newDept}
              onChange={(event) => setNewDept(event.target.value)}
              className="form-control shadow-none"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default Edit;
