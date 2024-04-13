import React, { useEffect, useState } from "react";
import ToDoListFetch from "./todolistfetch";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [newUser, setNewUser] = useState("");

  function getUsers() {
    fetch("https://playground.4geeks.com/todo/users?offset=0&limit=100")
      .then((response) => response.json())
      .then((data) => setUsers(data.users));
  }

  useEffect(() => {
    getUsers();
  }, []);

  function addUser(e) {
    if (e.key === "Enter" && newUser.trim() !== "") {
      const trimmedUser = newUser.trim();
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      };
      fetch(
        `https://playground.4geeks.com/todo/users/${trimmedUser}`,
        requestOptions
      )
        .then((response) => response.json())
        .then(() => getUsers());
      setNewUser("");
    }
  }

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  return (
    <>    
    <div className="text-center d-flex justify-content-between p-4">
      <div className="dropdown">
        <button
          className="btn dropdown-toggle fs-4 users"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {selectedUser === "" ? "Users" : selectedUser}
        </button>
        <ul className="dropdown-menu ">
          {users.map((user, index) => (
            <li key={index}>
              <a
                className="dropdown-item text-white fw-semibold"
                href="#"
                onClick={() => handleUserSelect(user.name)}
              >
                {user.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text users fs-4" id="input-user">
          New user
        </span>
        <input
          type="text"
          onChange={(e) => setNewUser(e.target.value)}
          onKeyDown={addUser}
          value={newUser}
          aria-describedby="input-user"
          className="form-control users fs-4"
          maxLength="50"
          placeholder="Add here a new user (MAX 50 chars)"
        />
      </div>
    </div>
    {selectedUser === "" ? <h1 className="text-center mt-5 ">Select an user</h1> :
    <ToDoListFetch currentUser={selectedUser}/>
    }
    </>
  );
};

export default Users
