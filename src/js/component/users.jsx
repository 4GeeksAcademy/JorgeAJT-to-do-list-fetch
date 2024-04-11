import React, { useEffect, useState } from "react";

const Users = () => {

    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState("");
    const [newUser, setNewUser] = useState("")


    function getUsers() {
        fetch("https://playground.4geeks.com/todo/users?offset=0&limit=100")
        .then ( (response)=> response.json())
        .then ( (data)=> setUsers(data.users))
    }

    useEffect(()=>{
        getUsers()
    },[])

    function addUser(e) {
        if(e.key === "Enter" && newUser.trim() !== "") {
        const trimmedUser = newUser.trim()        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(`https://playground.4geeks.com/todo/users/${trimmedUser}`, requestOptions)
            .then(response => response.json())
            .then(()=>getUsers())
            setNewUser("")
        }
    }

    const handleUserSelect = (user) => {
        setSelectedUser(user)
    }

	return (
		<div className="text-center d-flex justify-content-between">
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {selectedUser === "" ? "Users" : selectedUser}
                </button>
                <ul className="dropdown-menu">
                    {users.map((user, index) =>
                        <li key={index}>
                            <a className="dropdown-item" href="#" onClick={()=>handleUserSelect(user.name)}>{user.name}</a>
                        </li>
                    )}
                </ul>
            </div>
            <input type="text" onChange={(e)=>setNewUser(e.target.value)} onKeyDown={addUser} value={newUser} className="" maxLength="34" placeholder="Add your next task (MAX 34 chars)"/> 
		</div>
	);
};

export default Users;