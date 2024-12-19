import { cartModel } from "../models/cart.model.js";
import { productModel } from "../models/product.model.js";
import { ticketModel } from "../models/ticket.model.js";

class CartService {
    static async finalizePurchase(cartId) {
        const cart = await cartModel.findById(cartId).populate("products.product");
        if (!cart) throw new Error("Carrito no encontrado");

        let total = 0;
        const unavailableProducts = [];
        const processedProducts = [];

        for (let item of cart.products) {
            const productData = item.product;

            if (productData.stock >= item.quantity) {
                total += productData.price * item.quantity;
                productData.stock -= item.quantity;
                await productData.save();
                processedProducts.push(item.product._id);
            } else {
                unavailableProducts.push(item.product._id);
            }
        }

        const ticket = new ticketModel({
            amount: total,
            purchaser: cart.userEmail
        });
        await ticket.save();

        cart.products = cart.products.filter(item => !processedProducts.includes(item.product._id));
        await cart.save();

        return {
            message: "Compra finalizada.",
            ticket,
            unavailableProducts
        };
    }
}

export const cartService = new CartService();
