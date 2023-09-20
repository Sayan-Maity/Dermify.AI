const express = require("express")
const app = express()
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000
const cors = require("cors")
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const allRoutes = require("./routes/AllRoutes")
const authRoutes = require("./routes/AuthRoutes")



// middlewares
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use("/api", allRoutes)
app.use("/api/auth", authRoutes)


app.get("/", (req, res) => {
    res.status(200).send("You have landed on Derma Detection Server !")
})



// Database connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("Database connected")
})
.catch((err) => {
    console.log(err)
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})