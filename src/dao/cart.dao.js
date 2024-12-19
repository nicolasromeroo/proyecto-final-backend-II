
import { cartModel } from "../models/cart.model.js";

class CartDao {
  async getAll() {
    const carts = await cartModel.find();
    return carts;
  }

  async getById(id) {
    const cart = await cartModel.findById(id);
    return cart;
  }

  async create() {
    const cart = await cartModel.create({});
    return cart;
  }

  async update(id, data) {
    const cartUpdate = await cartModel.findByIdAndUpdate(id, data, { new: true });
    return cartUpdate;
  }

  async deleteOne(id) {
    const cart = await cartModel.deleteOne({ _id: id });
    return cart;
  }
}

export const cartDao = new CartDao();