"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _protect = require("../middlewares/protect");
var _products = require("../controllers/products");
var _products2 = require("../validation/products");
const router = (0, _express.Router)();
router.post("/", _protect.protectOwner, _products2.validateProduct, _products.createProduct);
router.get("/", _products.getAllBusinessWithProducts);
router.post("/order", _protect.protect, _products.orderProducts);
var _default = router;
exports.default = _default;