
import { Router } from "express";
import { ProductController } from "../controllers/products.controller.js";
import { checkProductData } from "../middlewares/checkProductData.middleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { passportCall } from "../middlewares/passport.middleware.js";

const productController = new ProductController();
const router = Router();

router.get("/", productController.getAll);

router.get("/:pid", productController.getById);

router.delete("/:pid", passportCall('jwt'), authMiddleware('admin'), productController.deleteOne);

router.put("/:pid", passportCall('jwt'), authMiddleware('admin'), productController.update);

router.post("/", checkProductData, passportCall('jwt'), authMiddleware('admin'), productController.create);
export default router;