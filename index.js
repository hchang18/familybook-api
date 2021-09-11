const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const postRoutes = require('./routes/posts.js');

const app = express();
dotenv.config()

// general setup
app.use(express.json({ limit: "30mb", extended: true })); // for images
app.use(express.urlencoded({ limit: "30mb", extended: true }));  
app.use(cors());

// cors should be above routes to prevent Network error problem
app.use('/posts', postRoutes);

app.get('/', (req, res) => {
    res.send('Hello to Family Book API');
})

// DB setup
// https://www.mongodb.com/cloud/atlas
// hold our database on cloud
const PORT = process.env.PORT || 5000;

// use mongoose to connect to database
// chain them with .then because it returns "promise"
// if not successful, print error message
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false); // make sure we don't get any warnings in console.
