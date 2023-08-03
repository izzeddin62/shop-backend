import { Router } from "express";
import { protectOwner } from "../middlewares/protect";
import {
  createProduct,
  getAllBusinessWithProducts,
} from "../controllers/products";

const router = Router();

router.post("/", protectOwner, createProduct);
router.get("/", getAllBusinessWithProducts);

export default router;
