import { useState, useEffect } from "react";
import axios from "axios";
import Add from "./Add.jsx";
import './toDoList.css'
import { BsCircleFill, BsTrashFill, BsCheckCircleFill } from 'react-icons/bs';

function ToDoList() {
    let [todos, settodos] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/todo')
            .then(result => settodos(result.data))
            .catch(err => console.log(err))
    }, [])

    function handleEdit(id) {
        axios.put('http://localhost:3000/todo/' + id)
            .then(result => {
                const updatedTodo = result.data;
                settodos(todos.map(todo =>
                    todo._id === updatedTodo._id ? updatedTodo : todo
                ));
            })
            .catch(err => console.log(err));
    }

    function handleDlt(id) {
        axios.delete('http://localhost:3000/todo/' + id)
            .then(result => {
                settodos(todos.filter(todo => todo._id !== id));
            })
            .catch(err => console.log(err));
    }
    return (
        <div>
            <h1>To-Do-List</h1>
            <Add settodos={settodos} todos={todos}></Add>
            {
                todos.length === 0
                    ?
                    <h2>No Records</h2>
                    :

                    todos.map((todo) => {
                        return <div key={todo._id} className="task">
                            <div className="checkBox" onClick={() => handleEdit(todo._id)}>
                                {todo.done ?
                                    <span>
                                        <BsCheckCircleFill />
                                    </span>
                                    :
                                    <span>
                                        <BsCircleFill />
                                    </span>
                                }
                                <p className={todo.done ? "lineThrough" : null}>{todo.task}</p>
                            </div>
                            <div className="icon" onClick={() => handleDlt(todo._id)}>
                                <span>
                                    <BsTrashFill />
                                </span>
                            </div>
                        </div>
                    })}

        </div>
    )
}


export default ToDoList;