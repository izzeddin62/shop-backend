"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.name = void 0;
exports.validateProduct = validateProduct;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const productSchema = _joi.default.object({
  name: _joi.default.string().min(1).required(),
  price: _joi.default.number().min(1).required(),
  quantity: _joi.default.number().min(1).required(),
  category: _joi.default.string().min(1).required()
});
async function validateProduct(req, res, next) {
  try {
    await productSchema.validateAsync(req.body);
    return next();
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
}
const name = "products";
exports.name = name;