const express = require('express');
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const todoModel = require('./model/model')

app.use(cors())
app.use(express.json())


main()
    .then(console.log("MongoDb is connected"))
    .catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/todo');
}


let port = 3000
app.listen(port, () => {
    console.log(`listeing to ${port} port`)
})

app.post('/todo', async (req, res) => {
    console.log("recieved")
    const { task } = req.body;

    try {
        const newTodo = await todoModel.create({ task });
        res.json(newTodo);   // 👈 send the created todo back
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add todo" });
    }

})

app.get('/todo', async (req, res) => {
    await todoModel.find()
        .then(result => res.json(result))
        .catch(err => res.json(err))
});

app.put('/todo/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // find the todo
        const todo = await todoModel.findById(id);
        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }

        // toggle the `done` field
        todo.done = !todo.done;
        await todo.save();

        res.json(todo);  // send updated todo back
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update todo" });
    }
});

app.delete('/todo/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const todo = await todoModel.deleteOne({ _id: id });
        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        console.log(todo)
        res.json(todo);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update todo" });
    }
});

