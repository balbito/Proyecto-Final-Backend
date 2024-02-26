export default class ProductsRepository {
    constructor(dao) {
      this.dao = dao;
    }
    getAll = (limit, page, sort) => {
      return this.dao.getAllProducts(limit, page, sort);
    };
    getOne = (id) => {
      return this.dao.getProductById(id);
    };
    create = (product) => {
      return this.dao.createProduct(product);
    };
    update = (id, product) => {
      return this.dao.updateProduct(id, product);
    };
    delete = (id) => {
      return this.dao.deleteProduct(id);
    };
  }
  