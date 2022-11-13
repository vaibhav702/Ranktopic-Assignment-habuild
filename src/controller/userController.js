const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const validator = require("../validator/validator");
const secretKey = "ranktopicassignment";
const bcrypt = require("bcrypt");

const userCreation = async function (req, res) {
  try {
    const requestBody = req.body;
    const {
      firstName,
      lastName,

      email,
      password,
    } = requestBody;

    if (!validator.isValidRequestBody(requestBody)) {
      return res.status(400).send({
        status: false,
        message: "Invalid request parameters,Empty body not accepted.",
      });
    }

    if (!validator.isValid(firstName)) {
      return res
        .status(400)
        .send({ status: false, message: "FirstName is required." });
    }
    if (!validator.isValid(lastName)) {
      return res
        .status(400)
        .send({ status: false, message: "LastName is required." });
    }

    if (!validator.isValid(email)) {
      return res
        .status(400)
        .send({ status: false, message: "Email id is required" });
    }

    const verifyEmail = await userModel.findOne({ email: email });
    if (verifyEmail) {
      return res
        .status(400)
        .send({ status: false, message: "Email id is already used" });
    }

    if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email))
      return res
        .status(400)
        .send({ status: false, message: "Invalid Email id." });

    if (!(password.length >= 8 && password.length <= 15)) {
      return res
        .status(400)
        .send({ status: false, message: "Password criteria not fulfilled." });
    }

    const userData = await userModel.create(requestBody);
    return res.status(201).send({
      status: true,
      message: "Successfully saved User data",
      data: userData,
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: "Something went wrong",
      Error: err.message,
    });
  }
};
const loginUser = async function (req, res) {
  try {
    const requestBody = req.body;
    const { email, password } = requestBody;

    if (!validator.isValidRequestBody(requestBody)) {
      return res.status(400).send({
        ststus: false,
        message: "Invalid request parameters,Empty body not accepted.",
      });
    }
    if (!validator.isValid(email)) {
      return res
        .status(400)
        .send({ status: false, message: "Email id is required" });
    }
    if (!validator.isValid(password)) {
      return res
        .status(400)
        .send({ status: false, message: "password is required" });
    }
    console.log(password)
    const user = await userModel.findOne({
      email,
      password,
    });
    

    if (!user) {
      return res.status(401).send({
        status: false,
        message: `Invalid login credentials. Email id or password is incorrect.`,
      });
    }

    const id = user._id;
    const token =  jwt.sign(
      {
        userId: id,
        email,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
      },
      secretKey
    );

    res.header("x-api-key");
    return res.status(200).send({
      status: true,
      message: `User logged in successfully.`,
      data: token,
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: "Something went wrong",
      Error: err.message,
    });
  }
};
module.exports.loginUser = loginUser;
module.exports.userCreation = userCreation;
