const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();
require('../config/passport')(passport);
const iMote = require('../models').iMote;
const User = require('../models').User;

router.post('/signup', function(req, res) {

  console.log("POST Sign Up, Email: " + req.body.email)

  console.log(req.body);
  if (!req.body.email || !req.body.password) {
    res.status(400).send({msg: 'Please pass username and password.'})
  } else {
    User
      .create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        serial_number: req.body.serial_number
      })
      .then((user) => res.status(201).send(user))
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  }
});

router.post('/signin', function(req, res) {

  console.log("POST Sign In, Email: " + req.body.email)

  User
      .find({
        where: {
          email: req.body.email
        }
      })
      .then((user) => {
        if (!user) {
          return res.status(401).send({
            message: 'Authentication failed. User not found.',
          });
        }
        user.comparePassword(req.body.password, (err, isMatch) => {
          if(isMatch && !err) {
            var token = jwt.sign(JSON.parse(JSON.stringify(user)), 'nodeauthsecret', {expiresIn: 86400 * 30});
            jwt.verify(token, 'nodeauthsecret', function(err, data){
              console.log(err, data);
            })
            res.json({success: true, token: 'JWT ' + token});
          } else {
            res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
          }
        })
      })
      .catch((error) => res.status(400).send(error));
});

router.get('/imote', passport.authenticate('jwt', { session: false }), function(req, res) {

  console.log("GET iMote")

  var token = getToken(req.headers);
  if (token) {
    iMote
      .findAll()
      .then((imote) => res.status(200).send(imote))
      .catch((error) => { res.status(400).send(error); });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.post('/imote', passport.authenticate('jwt', { session: false }), function(req, res) {

  console.log("POST iMote")

  var token = getToken(req.headers);
  if (token) {
    iMote
      .create({
        serial_number: req.body.serial_number,
        token: req.body.token,
        url: req.body.url
        // TODO: push_token, push_url, wifi_ssid
      })
      .then((imote) => res.status(201).send(imote))
      .catch((error) => res.status(400).send(error));
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.delete('/imote', passport.authenticate('jwt', { session: false }), function(req, res) {

  console.log("DELETE iMote")

  var token = getToken(req.headers);
  if (token) {
    iMote
      .findOne({
        where: 
        {
          serial_number: req.body.serial_number
        }
      })
      .then((imote) => {
        if (!imote) {
          return res.status(401).send({
            message: 'Serial number not found.',
          });
        }
        
        imote.destroy()
        res.status(200).send(imote)
      })
      .catch((error) => res.status(400).send(error));
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = router;
