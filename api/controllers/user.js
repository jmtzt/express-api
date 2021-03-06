const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

module.exports = {
  signup: (req, res, next) => {
    User.find({ email: req.body.email })
      .exec()
      .then((result) => {
        if (result.length > 0) {
          return res.status(409).json({
            message: "Email already registered",
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err,
              });
            } else {
              const userType = req.body.type
              const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash,
                type: userType.toUpperCase()
              });
              user
                .save()
                .then((result) => {
                  return res.status(201).json({
                    message: "User created sucessfully",
                  });
                })
                .catch((err) => {
                  console.log(err);
                  res.status(500).json({
                    error: err,
                  });
                });
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  },
  login: (req, res, next) => {
    User.findOne({ email: req.body.email })
      .exec()
      .then((result) => {
        if (result.length < 1) {
          return res.status(401).json({
            message: "Authentication failed",
          });
        }

        bcrypt.compare(req.body.password, result.password, (err, response) => {
          if (err) {
            return res.status(401).json({
              message: "Authentication failed",
            });
          }
          if (response) {
            const token = jwt.sign(
              {
                email: result.email,
                userId: result._id,
              },
              process.env.JWT_KEY,
              {
                expiresIn: "1h",
              }
            );
            return res.status(200).json({
              message: "Auth sucessfull",
              token: token
            });
          }
          return res.status(401).json({
            message: "Authentication failed",
          });
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  },

  getUser: (req,res,next)=>{
    console.log("req.body", req.body)
    console.log("email:",req.body.email)
    User.findOne({ email: req.body.email }) 
    .select("email type")
    .exec()
    .then((result) => {
      console.log(result)
      return res.status(200).json(result);
    })
    .catch((err)=>{
      return res.status(400).json({ error: err });
    })
  }
};
