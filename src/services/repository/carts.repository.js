export default class CartsRepository {
    constructor(dao) {
      this.dao = dao;
    }
    getAll = () => {
      return this.dao.getAllCarts();
    };
    getOne = (id) => {
      return this.dao.getCartById(id);
    };
    create = (userId) => {
      return this.dao.createCart(userId);
    };
    delete = (id) => {
      return this.dao.deleteCart(id);
    };
    addProduct = (cartId, productId) => {
      return this.dao.addProductCart(cartId, productId);
    };
    deleteProduct = (cartId, productId) => {
      return this.dao.deleteProductFromCart(cartId, productId);
    };
    updateCart = (cartId, newProducts) => {
      return this.dao.updateCart(cartId, newProducts);
    };
    updateProductQuantity = (cartId, productId, quantity) => {
      return this.dao.updateProductQuantity(cartId, productId, quantity);
    };
    purchase = (cid, user) => {
      return this.dao.purchase(cid, user);
    };
  }