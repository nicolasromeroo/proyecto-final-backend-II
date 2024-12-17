
import Product from "../models/product.model.js";

class ProductDAO {
    async getAll() {
        return Product.find();
    }

    async getById(id) {
        return Product.findById(id);
    }

    async create(data) {
        const newProduct = new Product(data);
        return newProduct.save();
    }

    async update(id, data) {
        return Product.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return Product.findByIdAndDelete(id);
    }
}

export const productDao = new ProductDAO();
