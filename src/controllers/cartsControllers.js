import {
    getCarts,
    getCart,
    postCart,
    postProductInCart,
    putProductsInCart,
    putProductQuantityInCart,
    deleteProductFromCart,
    deleteCart,
  } from "../services/cartsServices.js";
  
  export const getCartsController = async (req, res) => {
    try {
      let carts = await getCarts();
      res.json(carts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export const getCartController = async (req, res) => {
    try {
      let cid = req.params.cid;
      let cart = await getCart(cid);
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export const postCartController = async (req, res) => {
    try {
      let cart = await postCart();
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export const postProductInCartController = async (req, res) => {
    try {
      let cid = req.params.cid;
      let pid = req.params.pid;
      let cart = await postProductInCart(cid, pid);
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export const putProductsInCartController = async (req, res) => {
    try {
      let cid = req.params.cid;
      let products = req.body;
      let cart = await putProductsInCart(cid, products);
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export const putProductQuantityInCartController = async (req, res) => {
    try {
      let cid = req.params.cid;
      let pid = req.params.pid;
      let quantity = req.body.quantity;
      let cart = await putProductQuantityInCart(cid, pid, quantity);
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export const deleteProductFromCartController = async (req, res) => {
    try {
      let cid = req.params.cid;
      let pid = req.params.pid;
      let cart = await deleteProductFromCart(cid, pid);
      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export const deleteCartController = async (req, res) => {
    try {
      let cid = req.params.cid;
      await deleteCart(cid);
      res.json({ message: "cart deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };