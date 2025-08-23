const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const leadRoutes = require('./Routes/leadRoutes')

require('dotenv').config();

const app = express()
app.use(cors())
app.use(express.json())

app.get('/',(req,res) => (
    res.send('Server is running !')
))

app.use('/leads',leadRoutes)

const port = 5000
app.listen(port,()=>{
console.log("server running at 5000")
})