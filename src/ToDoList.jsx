import React, {useState} from "react"

function ToDoList() {
    const[tasks, setTasks] = useState([])
    const[newTask, setNewTask] = useState()

    function handleInputChange(event) {
        setNewTask(event.target.value)
    }

    function addTask() {
        setTasks(t => [...t, newTask])
        setNewTask("")
    }

    function handleKeyPress(event) {
        if (event.key === "Enter") {
            addTask();
        }
    }

    function deleteTask(index) {
        setTasks(tasks.filter((_, i) => i !== index))
    }

    function moveUp(index) {
        const updatedTask = [...tasks]
        if (index > 0) {
            [updatedTask[index], updatedTask[index - 1]] = 
            [updatedTask[index - 1], updatedTask[index]]
            setTasks(updatedTask)
        }
    }

    function moveDown(index) {
        const updatedTask = [...tasks]
        if (index < tasks.length-1) {
            [updatedTask[index], updatedTask[index + 1]] = 
            [updatedTask[index + 1], updatedTask[index]]
            setTasks(updatedTask)
        }
    }

    function taskDone() {
        const updatedTask = [...tasks]
        if (tasks.length > 0) {
            const firstTask = updatedTask.shift()
            updatedTask.push(firstTask)
            setTasks(updatedTask)
        }
    }

    return(
        <div>
            <h1>To Do List</h1>
            <div className="input">
                <input type="text" value={newTask} placeholder="Enter task" onChange={handleInputChange} onKeyDown={handleKeyPress} />
                <button className="add-btn" onClick={addTask}>Add</button>
                <button className="done-btn" onClick={taskDone}>Done</button>
            </div>
            <div className="tasks">
                <ul>
                    {tasks.map((task, index) => 
                    <li 
                        key={index} >{task}
                        <button onClick={() => moveUp(index)}>☝</button>
                        <button onClick={() => moveDown(index)}>👇</button>
                        <button onClick={() => deleteTask(index)}>Delete</button>
                    </li>)}
                </ul>
            </div>
        </div>
    )
}

export default ToDoList

