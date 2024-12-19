import { Router } from "express";
import productsRouter from "./products.router.js";
import cartsRouter from "./carts.router.js";
import sessionRouter from "./session.router.js";
import authRoutes from "./auth.router.js";

const router = Router();

router.use("/products", productsRouter);
router.use("/carts", cartsRouter);
router.use("/sessions", sessionRouter);
router.use("/auth", authRoutes)

export default router;