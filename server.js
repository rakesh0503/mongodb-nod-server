const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')
const User = require('./models/user')
const PORT = 8080;
const api = require('./routes/api')
const app = express();
require('dotenv').config();

// const DB ="mongodb+srv://rakesh406c:ranjan406c@cluster0.sr0jdl5.mongodb.net/crud?retryWrites=true&w=majority"

const url = process.env.MONGODB_CONNECTION_URL




app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('connection successfully');

}).catch((err) => {
    console.log(err)
});

app.post('/api/user', async (req, res) => {

    try {
        console.log("", req.body);

        const newUser = new User({
            userFirstName: req.body.userFirstName,
            userLastName: req.body.userLastName
        });
        await User.create(newUser);
        res.send('user Created')
    } catch (err) {
        console.log("err", err)
    }
})

app.use('/api', api);

app.get('/', function (req, res) {
    res.send('Hello Server')
});



app.listen(PORT, function () {
    console.log(`SERVER RUNNING ON PORT ${PORT}`)
})