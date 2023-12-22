const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors');
const port = process.env.port || 3000


// middleware
app.use(cors())
app.use(express.json())


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uma9m7n.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        const todoCollection = client.db('todoDB').collection("todo")

        // todoCOllection

        app.get('/todoList', async (req, res) => {
            const result = await todoCollection.find().toArray()
            res.send(result)
        })
        app.post('/todoList', async (req, res) => {
            const todo = req.body;
            const result = await todoCollection.insertOne(todo)
            res.send(result)
        })
        app.delete('/todoList/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await todoCollection.deleteOne(query)
            res.send(result)
        })


        // await client.connect();
        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('React todo app is running')
})

app.listen(port, () => {
    console.log(`react todo app running on the port: ${port}`)
})