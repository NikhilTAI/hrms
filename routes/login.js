var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

var User = require('../models/user');

router.post('/', (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email:req.body.email }, function(err, user){
    if (err) {
        console.log(err);
    }
    if(!user){
        res.status(400).json({ message: "Invalid Credentials" });
    } else if (bcrypt.compareSync(password, user.password)) {
        // const token = generateToken(user);
        res.status(200).json({
            status: "success",
            username: user.username,
            email: user.email
            // token: token
          });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
  });

// function generateToken(user) {
//   const payload = {
//     userid: user.id,
//     username: user.username,
//   };
//   const options = {
//     expiresIn: "1h",
//   };
//   const token = jwt.sign(payload, secrets.jwtSecret, options);

//   return token;
// }

module.exports = router;