import { Router } from "express";
import { protectOwner, protect } from "../middlewares/protect";
import {
  createProduct,
  getAllBusinessWithProducts,
  orderProducts,
} from "../controllers/products";
import { validateProduct } from "../validation/products";

const router = Router();

router.post("/", protectOwner, validateProduct, createProduct);
router.get("/", getAllBusinessWithProducts);
router.post("/order", protect, orderProducts);

export default router;
