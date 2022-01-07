const mongo = require("../shared/connect");
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



module.exports.getcustomerDetails = async (req, res, next) => {
  try {
    let data = await mongo.db.collection("customerDetails").find().toArray();
    res.send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports.createCustomer = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(4).max(50).required(),
    mail: Joi.string().min(6).max(50).email().required(),
    password: Joi.string().min(8).max(10).required()
  })
  var {error} = await schema.validate(req.body);
  if (error) return res.status(400).send({msg : error.details[0].message});

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  try {
    await mongo.db.collection("customerDetails").insertOne({
        name: req.body.name,
        mail:req.body.mail,
        password:req.body.password
      });  

    res.send("Updated Sucessfully");
  } 
  
  catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

exports.login = async (req,res,next) => {
  // User Input Validation - Joi Validation
  const schema = Joi.object({
      mail: Joi.string().min(6).max(50).email().required(),
      password: Joi.string().min(8).max(10).required()
  })
  var {error} = await schema.validate(req.body);
  if (error) return res.status(400).send({msg : error.details[0].message});

  // Is registerd User
  var existUser = await mongo.db.collection("customerDetails").findOne({mail: req.body.mail});
  console.log(existUser)
  if(!existUser) return res.status(400).send({msg : "Email not registered"})

  // Password compare check
  const isValid = await bcrypt.compare(req.body.password, existUser.password);
  console.log(isValid)
  if(!isValid) return res.status(400).send({msg: "Password doesn't match"});

  // Generate Token
  var token = jwt.sign({existUser}, 'SWERA', {expiresIn: '1hr'})
  res.send(token);
}