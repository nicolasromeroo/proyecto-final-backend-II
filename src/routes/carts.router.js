

import { cartService } from "../services/cart.service.js";
import authMiddleware from "../middlewares/authMiddleware.js"
import { Router } from "express";

const router = Router()

// agregar productos al carrito
router.post("/:cid/products/:pid", authMiddleware("user"), (req, res) => {
    res.json({ message: "Producto agregado al carrito." })
})

// finalizar compra
router.post("/:cid/purchase", authMiddleware("user"), async (req, res) => {
    const { cid } = req.params;

    try {
        const result = await cartService.finalizePurchase(cid);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

export default router