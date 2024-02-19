import { cartModel } from "../../models/carts.model.js";
import { productModel } from "../../models/products.model.js";


class ProductDao {
  async getAllProducts({ limit = 10, page = 1, sort, query } = {}) {
    try {
      let filter = {};

      // filtro basado en el query
      if (query) {
        const [field, value] = query.split(":");
        filter[field] = value;
      }

      const options = {
        limit: parseInt(limit),
        page: parseInt(page),
        sort: sort ? { price: sort === "asc" ? 1 : -1 } : undefined,
      };

      const response = await productModel.paginate(filter, options);

      return response;
    } catch(error) {
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
    return await productModel.findByIdAndUpdate({id}, product);
  }

  async deleteProduct(id) {

    await cartModel.deleteMany({ product: id });
    
    return await productModel.findByIdAndDelete({id});
  }

}

export default new ProductDao();
