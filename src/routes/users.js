import { Router } from "express";
import {
  createUser,
  signin,
  createBusinessOwner,
  signinBusinessOwner,
} from "../controllers/users";
import {
  validateBusinessOwnerSignup,
  validateSignup,
} from "../validation/user";

const router = Router();

router.post("/signup", validateSignup, createUser);
router.post("/signin", signin);
router.post("/owner/signup", validateBusinessOwnerSignup, createBusinessOwner);
router.post("/owner/signin", signinBusinessOwner);

export default router;
