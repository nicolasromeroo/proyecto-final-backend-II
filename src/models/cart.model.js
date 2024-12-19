
import mongoose from "mongoose";

const cartCollection = "carts"

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
});

export const cartModel = mongoose.model(cartCollection, cartSchema);

