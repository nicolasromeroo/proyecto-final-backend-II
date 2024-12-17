
import { productDao } from "../dao/product.dao.js";

class ProductRepository {
  async getAll() {
    return productDao.getAll();
  }

  async getById(id) {
    return productDao.getById(id);
  }

  async create(data) {
    return productDao.create(data);
  }

  async update(id, data) {
    return productDao.update(id, data);
  }

  async delete(id) {
    return productDao.delete(id);
  }
}

export const productRepository = new ProductRepository();
