import cartsDao from "../daos/dbManager/carts.dao.js";

export const getCarts = async () => {
    return await cartsDao.getAllCarts();
  };
  
  export const getCart = async (cid) => {
    return await cartsDao.getCartById(cid);
  };
  
  export const postCart = async () => {
    return await cartsDao.createCart();
  };
  
  export const postProductInCart = async (cid, pid) => {
    return await cartsDao.addProductToCart(cid, pid);
  };
  
  export const putProductsInCart = async (cid, products) => {
    return await cartsDao.updateCart(cid, products);
  };
  
  export const putProductQuantityInCart = async (cid, pid, quantity) => {
    return await cartsDao.updateProductQuantity(cid, pid, quantity);
  };
  
  export const deleteProductFromCart = async (cid, pid) => {
    return await cartsDao.deleteProductFromCart(cid, pid);
  };
  
  export const deleteCart = async (cid) => {
    return await cartsDao.deleteCart(cid);
  };