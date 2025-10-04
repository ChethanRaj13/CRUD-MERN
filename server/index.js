const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Usermodel = require('./models/User');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/mern");

// Get all users
app.get("/", (req, res) => {
    Usermodel.find({})
        .then(users => res.json(users))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Get user by ID
app.get("/getUser/:id", (req, res) => {
    const id = req.params.id;
    Usermodel.findById(id)
        .then(user => {
            if (!user) return res.status(404).json({ error: "User not found" });
            res.json(user);
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

// Create user
app.post("/users", (req, res) => {
    Usermodel.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Update user
app.put("/updateusers/:id", (req, res) => {
    const id = req.params.id;
    Usermodel.findByIdAndUpdate(
        id,
        { name: req.body.name, email: req.body.email, age: req.body.age },
        { new: true }
    )
    .then(user => {
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// Delete user
app.delete("/deleteuser/:id", (req, res) => {
    const id = req.params.id;
    Usermodel.findByIdAndDelete(id)
        .then(user => {
            if (!user) return res.status(404).json({ error: "User not found" });
            res.json(user);
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
