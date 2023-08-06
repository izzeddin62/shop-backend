"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateBusinessOwnerSignup = validateBusinessOwnerSignup;
exports.validateSignup = validateSignup;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const userSignupSchema = _joi.default.object({
  email: _joi.default.string().email().required(),
  password: _joi.default.string().min(8).required(),
  firstName: _joi.default.string().min(1).required(),
  lastName: _joi.default.string().min(1).required()
});
const businessOwnerSignupSchema = _joi.default.object({
  email: _joi.default.string().email().required(),
  password: _joi.default.string().min(8).required(),
  firstName: _joi.default.string().min(1).required(),
  lastName: _joi.default.string().min(1).required(),
  shopName: _joi.default.string().min(2).required()
});
async function validateSignup(req, res, next) {
  try {
    await userSignupSchema.validateAsync(req.body);
    return next();
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
}
async function validateBusinessOwnerSignup(req, res, next) {
  try {
    await businessOwnerSignupSchema.validateAsync(req.body);
    return next();
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
}