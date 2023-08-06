"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBusinessOwner = createBusinessOwner;
exports.createUser = createUser;
exports.getUser = getUser;
exports.signin = signin;
exports.signinBusinessOwner = signinBusinessOwner;
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _models = require("../db/models");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config();
async function createUser(req, res) {
  try {
    const {
      firstName,
      lastName,
      email,
      password
    } = req.body;
    const encryptedPassword = await _bcrypt.default.hash(password, 10);
    const userExists = await _models.User.findOne({
      where: {
        email
      }
    });
    if (userExists) {
      return res.status(409).json({
        message: "User with that email already exists"
      });
    }
    const user = await _models.User.create({
      firstName,
      lastName,
      email,
      password: encryptedPassword
    });
    const returnedUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      type: "customer"
    };
    const token = _jsonwebtoken.default.sign(returnedUser, process.env.SECRET_KEY, {
      expiresIn: "1d"
    });
    return res.status(201).json({
      message: "User created successfully",
      user: returnedUser,
      token
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
}
async function signin(req, res) {
  try {
    const {
      email,
      password
    } = req.body;
    const user = await _models.User.findOne({
      where: {
        email
      }
    });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }
    const isPasswordValid = await _bcrypt.default.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }
    const returnedUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      type: "customer"
    };
    const token = _jsonwebtoken.default.sign(returnedUser, process.env.SECRET_KEY, {
      expiresIn: "1d"
    });
    return res.status(200).json({
      message: "User logged in successfully",
      user: returnedUser,
      token
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
}
async function createBusinessOwner(req, res) {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      shopName
    } = req.body;
    const encryptedPassword = await _bcrypt.default.hash(password, 10);
    const userExists = await _models.BusinessOwner.findOne({
      where: {
        email
      }
    });
    if (userExists) {
      return res.status(409).json({
        message: "User with that email already exists"
      });
    }
    const user = await _models.BusinessOwner.create({
      firstName,
      lastName,
      email,
      shopName,
      password: encryptedPassword
    });
    const returnedUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      shopName: user.shopName,
      type: "businessOwner"
    };
    const token = _jsonwebtoken.default.sign(returnedUser, process.env.SECRET_KEY, {
      expiresIn: "1d"
    });
    return res.status(201).json({
      message: "Business owner created successfully",
      user: returnedUser,
      token
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
}
async function signinBusinessOwner(req, res) {
  try {
    const {
      email,
      password
    } = req.body;
    const user = await _models.BusinessOwner.findOne({
      where: {
        email
      }
    });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }
    const isPasswordValid = await _bcrypt.default.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }
    const returnedUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      shopName: user.shopName,
      type: "businessOwner"
    };
    const token = _jsonwebtoken.default.sign(returnedUser, process.env.SECRET_KEY, {
      expiresIn: "1d"
    });
    return res.status(200).json({
      message: "User logged in successfully",
      user: returnedUser,
      token
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
}
async function getUser(req, res) {
  const {
    authorization
  } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      message: "You are not authorized"
    });
  }
  const token = authorization.split(" ")[1];
  console.log(token, "token");
  try {
    const decoded = _jsonwebtoken.default.verify(token, process.env.SECRET_KEY);
    console.log(decoded, "decoded");
    const {
      id,
      type
    } = decoded;
    let user = null;
    if (type === "customer") {
      user = await _models.User.findOne({
        where: {
          id
        }
      });
    }
    if (type === "businessOwner") {
      user = await _models.BusinessOwner.findOne({
        where: {
          id
        }
      });
    }
    if (!user) {
      return res.status(401).json({
        message: "You are not authorized"
      });
    }
    const returnedUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      shopName: user.shopName,
      type
    };
    return res.status(200).json({
      user: returnedUser
    });
  } catch (error) {
    return res.status(401).json({
      message: "You are not authorized"
    });
  }
}