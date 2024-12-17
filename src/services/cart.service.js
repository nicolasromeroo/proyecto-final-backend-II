
import Cart from "../models/cart.model.js"
// import ticket from "../models/ticket.model.js"

class CartService {
    static async finalizePurchase(cartId) {
        const cart = await Cart.findById(cartId).populate("products");
        if (!cart) throw new Error("Carrito no encontrado");

        let total = 0;
        const unavailableProducts = [];

        for (let product of cart.products) {
            const productData = await Product.findById(product._id);
            if (productData.stock >= product.quantity) {
                total += productData.price * product.quantity;
                productData.stock -= product.quantity;
                await productData.save();
            } else {
                unavailableProducts.push(product._id);
            }
        }

        const ticket = new Ticket({
            amount: total,
            purchaser: cart.userEmail
        });
        await ticket.save();

        cart.products = cart.products.filter(product => !unavailableProducts.includes(product._id));
        await cart.save();

        return {
            message: "Compra finalizada.",
            ticket,
            unavailableProducts
        }
    }
}

export const cartService = new CartService();