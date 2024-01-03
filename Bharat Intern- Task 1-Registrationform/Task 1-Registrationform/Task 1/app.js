const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/registration', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define user schema
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

// Create User model
const User = mongoose.model('User', userSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Route to serve the registration form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Route to handle user registration
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    // Create a new user
    const newUser = new User({
        username,
        email,
        password
    });

    // Save the user to the database
    newUser.save((err) => {
        if (err) {
            console.error(err);
            res.send('Registration failed. Please try again.');
        } else {
            res.send('Registration successful!');
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});