
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const user = require('../models/user');
const User = require('../models/user');
require('dotenv').config();

const url = process.env.MONGODB_CONNECTION_URL

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('connection successfully');

}).catch((err) => {
  console.log(err)
});

router.get('/', (req, res) => {
  res.send('From API route')
});

function verifyToken(req, res, next) {
  if (!req.hearders.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.hearders.authorization.split(' ')[1]
  if (token === 'null') {
    return res.status(401).send('Unauthorized request')
  }
  let payload = jwt.verify(token, 'secretKey');
  if (!payload) {
    return res.status(401).send('Unauthorized request')

  }
  req.userId = payload.subject
  next();
}

router.post('/register', (req, res) => {
  let userData = req.body;
  let user = new User(userData);
  user.save((error, registeredUser) => {
    if (error) {
      console.log(error)
    } else {
      let payload = { subject: registeredUser._id }
      let token = jwt.sign(payload, 'secretKey')
      res.status(200).send({ token });
    }
  })

});
router.post('/login', (req, res) => {
  let userData = req.body;
  console.log("userdata", userData)
  User.findOne({ email: userData.email }, (error, user) => {
    console.log("user", user)

    // user.forEach(element => {
    if (error) {
      console.log(error);
    } else {
      if (!user) {
        res.status(401).send('Invalid Email');
      } else if (user.password !== user.password) {
        res.status(401).send('Invalid password');
      }
      else {
        let payload = { subject: user._id }
        let token = jwt.sign(payload, 'secretKey');
       
        res.status(200).send({ token });
      }
    }
    // });

  })
})

router.get('/events', (req, res) => {
  let events = [
    {
      "_id": "1",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "2",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "3",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "4",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "5",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "6",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    }
  ]
  res.json(events)
})

router.get('/special',verifyToken, (req, res) => {
  let specialEvents = [
    {
      "_id": "1",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "2",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "3",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "4",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "5",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "6",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    }
  ]
  res.json(specialEvents)
})




module.exports = router;