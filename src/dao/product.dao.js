
import { productModel } from "../models/product.model.js";

class ProductDAO {
    async getAll() {
        return productModel.find();
    }

    async getById(id) {
        return productModel.findById(id);
    }

    async create(data) {
        const newProduct = new productModel(data);
        return newProduct.save();
    }

    async update(id, data) {
        return productModel.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return productModel.findByIdAndDelete(id);
    }
}

export const productDao = new ProductDAO();
