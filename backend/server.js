const express = require('express');
const mysql = require("mysql2");
require("dotenv").config()
const app = express();
const cors = require("cors");

const port = process.env.PORT;

let corsOption = {
    origin: 'http://localhost:3000'
};

app.use(cors(corsOption));

//Database info
const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

//Database connection
db.connect((error) => {
    if (error) {
        console.log(error)
        return;
    }
    console.log("database connected")
});

//Parse JSON 
app.use(express.json());

//Form Submission
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    const query = `SELECT * FROM ${process.env.TABLE}`;
    db.query(query, (err, data) => {
        if (err) {
            res.json({ err })
            return;
        }
        res.json(data)
    })
});

app.get("/sortNewest", (req, res) => {
    const query = `SELECT * FROM ${process.env.TABLE} ORDER BY date_added DESC`;

    db.execute(query, (err, data) => {
        if (err) {
            res.json(err)
            return;
        }
        res.json(data);
    })
});

app.get("/completedTasks", (req,res)=>{
    const query = `SELECT * FROM ${process.env.COMPLETEDTABLE}`;

    db.execute(query, (err, data)=>{
        if(err){
            console.log(err);
            res.status(500).json({message:"Error"});
        }
        res.status(200).json(data);
    })
})

app.post("/addTodo", (req, res) => {
    const { taskName, taskSummary, taskDate } = req.body;

    const query = `INSERT INTO ${process.env.TABLE}(title, summary, date_added) VALUES(?,?,?)`;

    db.execute(query, [taskName, taskSummary, taskDate], (err, result) => {
        if (err) {
            return res.status(500).json({ "message": "Error" });
        }
        return res.status(200).json({ "message": "Record added" });
    });
})

app.delete("/completeTask/:id", (req, res) => {

    const deleteQuery = `DELETE FROM ${process.env.TABLE} WHERE id = ${req.params.id}`;
    const insertQuery = `INSERT INTO ${process.env.COMPLETEDTABLE}(title, summary, date_completed) SELECT title, summary, CURRENT_TIMESTAMP FROM ${process.env.TABLE} WHERE id = ${req.params.id}`;

    db.execute(insertQuery, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Inserted into table");
        }
    })

    db.execute(deleteQuery, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Error" });
        }
        return res.status(200).json({ message: "Record deleted" });
    })
})

app.delete(("/delete/:id"),(req, res)=>{
    const query = `DELETE FROM ${process.env.TABLE} WHERE id = ${req.params.id}`;

    db.execute(query, (err, data)=>{
        if(err){
            res.status(500).json({message:"Error"})
        }
        res.status(200).json({message:"Record deleted"});
    })
})


app.listen(port, () => {
    console.log("connected to port " + port);
})