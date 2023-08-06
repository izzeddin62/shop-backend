"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _users = require("../controllers/users");
var _user = require("../validation/user");
const router = (0, _express.Router)();
router.post("/signup", _user.validateSignup, _users.createUser);
router.post("/signin", _users.signin);
router.post("/owner/signup", _user.validateBusinessOwnerSignup, _users.createBusinessOwner);
router.post("/owner/signin", _users.signinBusinessOwner);
router.get("/user", _users.getUser);
var _default = router;
exports.default = _default;