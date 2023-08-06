"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.protect = protect;
exports.protectOwner = protectOwner;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _models = require("../db/models");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
async function protect(req, res, next) {
  try {
    const {
      authorization
    } = req.headers;
    if (!authorization) {
      return res.status(401).json({
        message: "You are not authorized"
      });
    }
    const token = authorization.split(" ")[1];
    try {
      const decoded = _jsonwebtoken.default.verify(token, process.env.SECRET_KEY);
      const user = await _models.User.findOne({
        where: {
          email: decoded.email
        }
      });
      if (!user) {
        return res.status(401).json({
          message: "You are not authorized"
        });
      }
      req.user = user;
      return next();
    } catch (error) {
      return res.status(401).json({
        message: "You are not authorized"
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
}
async function protectOwner(req, res, next) {
  try {
    const {
      authorization
    } = req.headers;
    if (!authorization) {
      return res.status(401).json({
        message: "You are not authorized"
      });
    }
    const token = authorization.split(" ")[1];
    try {
      const decoded = _jsonwebtoken.default.verify(token, process.env.SECRET_KEY);
      const user = await _models.BusinessOwner.findOne({
        where: {
          email: decoded.email
        }
      });
      if (!user) {
        return res.status(401).json({
          message: "You are not authorized"
        });
      }
      req.user = user;
      return next();
    } catch (error) {
      return res.status(401).json({
        message: "You are not authorized"
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
}