import { productModel } from "../../models/products.model.js";

class ProductDao {
  async getAllProducts(limit, page, sort) {
    try {
      const options = {
        limit: parseInt(limit) || 8,
        page: parseInt(page) || 1,
      };

      if (sort !== undefined) {
        if (sort === "asc" || sort === "desc") {
          options.sort = { price: sort };
        } else {
          throw new Error("Invalid sort direction");
        }
      }

      const response = await productModel.paginate({}, options);

      return response;
    } catch (error) {
      throw new Error("Error fetching products: " + error.message);
    }
  }

  async getProductById(id) {
    let product = await productModel.findById(id);
    if (!product) {
      throw new Error("Product not found");
    } else {
      return product;
    }
  }

  async createProduct(product) {
    return await productModel.create(product);
  }

  async updateProduct(id, product) {
    return await productModel.findByIdAndUpdate(id, product);
  }

  async deleteProduct(id) {
    return await productModel.findByIdAndDelete(id);
  }
}

export default new ProductDao();