const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const leadRoutes = require('./Routes/leadRoutes')
const userRoutes = require('./Routes/userRoutes')
const cookieParser = require('cookie-parser')

require('dotenv').config();

const app = express()
app.use(cors({
    origin: ["http://localhost:5173","https://erino-assignment-navy.vercel.app/"],
    credentials: true
}));

app.use(express.json())
app.use(cookieParser())

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true,useUnifiedTopology: true,})
.then(() => console.log("Mongo connected"))
.catch(err => console.error("Mongo connection error:", err));

app.get('/',(req,res) => (
    res.send('Server is running !')
))

app.use('/leads',leadRoutes)
app.use('/users',userRoutes)

const port = 5000
app.listen(port,()=>{
console.log("server running at 5000")
})