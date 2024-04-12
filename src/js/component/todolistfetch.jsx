import React, { useEffect, useState } from "react";

const ToDoListFetch = ( {currentUser} ) => {

    const [tasks, setTasks] = useState([])
    const [newTask, setNewTask] = useState("")

    useEffect(()=> {
        getTasks()
    },[currentUser])

    function getTasks() {
        fetch(`https://playground.4geeks.com/todo/users/${currentUser}`)
        .then ( (response)=> response.json())
        .then ( (data)=> setTasks(data.todos))
    }

    function addTask(e) {
        if(e.key === "Enter" && newTask.trim() !== "") { // Checkea que la tarea escrita no este vacia y borra los espacios en blanco de antes y despues. Y tambien que se pulse Enter
            const trimmedTask = newTask.trim(); // borra los espacios en blanco de antes y despues
            const capitalizedTask = trimmedTask.charAt(0).toUpperCase() + trimmedTask.slice(1); // chartAt(0).toUpperCase() pone la primera letra en mayuscula y slice(1) añade el resto

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    { 
                    "label": capitalizedTask,
                    "is_done": false
                    }
                )
            };
            fetch(`https://playground.4geeks.com/todo/todos/${currentUser}`, requestOptions)
                .then(response => response.json())
                .then(()=>getTasks())
            setNewTask("")
        }
    }

    function deleteTask(indexToDelete) {
        fetch(`https://playground.4geeks.com/todo/todos/${tasks[indexToDelete].id}`, { method: 'DELETE' })
        .then (() => getTasks())
    }

	return (
		<div className="text-center">
			<h1 className="text-center mt-5">Hello There!</h1>
            <input type="text" onChange={(e)=>setNewTask(e.target.value)} onKeyDown={addTask} value={newTask} className="" maxLength="34" placeholder="Add your next task (MAX 34 chars)"/> 
            {tasks.map((task, index) => 
            <p key={index}>{task.label}
            <i onClick={()=>deleteTask(index)} className="fa-solid fa-xmark btn fs-2"></i>
            </p>
            )}
		</div>
	);
};

export default ToDoListFetch;
