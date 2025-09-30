import './Add.css'
import { useState } from 'react';
import axios from 'axios';

function Add({ settodos, todos }) {
    let [input, setinput] = useState("")

    function handleinput(event) {
        setinput(event.target.value)
    }

    function handleadd(event) {
        event.preventDefault()
        axios.post('http://localhost:3000/todo', { task: input, done: false })
            .then(result => {
                settodos([...todos, result.data]);
                setinput("");
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <form onSubmit={handleadd}>
                <input type="text" placeholder='Enter Task' value={input} onChange={handleinput} />
                <button>Add</button>
            </form>
        </div>

    )
}


export default Add;