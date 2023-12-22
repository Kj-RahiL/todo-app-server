const express = require('express')
const app = express()
const cors = require('cors');
const port = process.env.port || 3000


// middleware
app.use(cors())
app.use(express.json())


app.get('/', (req,res)=>{
    res.send('React todo app is running')
})

app.listen(port, ()=>{
    console.log(`react todo app running on the port: ${port}`)
})