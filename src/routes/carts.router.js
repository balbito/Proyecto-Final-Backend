import { Router } from 'express';
import cartsDao from '../daos/dbManager/carts.dao.js';
import productsDao from '../daos/dbManager/products.dao.js';

const router = Router();

router.get("/", async (req, res) => {
    try {
      let carts = await cartsDao.getAllCarts();
      res.json({
        data: carts,
        message: "carrito list"
      });
    } catch (error) {
      console.log(error);
      res.json({
        error,
        message: "error de carrito"
      });
    }
});

router.post("/", async (req, res) => {
    try {
      let cart = await cartsDao.createCart();

      res.json({
        cart,
        status: "succcess",
      });
    } catch(error) {
      res.json({
        error,
        message: "error al crear el carrito"
      });
    }
});

router.get("/:cid", async (req, res) => {
    try {
        let cid = req.params.cid;
        let cart = await cartsDao.getCartById(cid);
        res.json({
            cart,
            status: "success",
        });
    } catch (error) {
       res.json({
          error,
          message: "Error con el id del carrito"
       });
    }
});

router.post("/:cid/product/:pid", async (req, res) => {
    try{
      let cid = req.params.cid;
      let pid = req.params.pid;
      
      if(!cid || !pid) {
        throw new Error("IDs de carrito o producto no proporcionado correctamente en la URL")
      }
      console.log("cartId:", cid);
      console.log("productId:", pid);
      let respuesta = await cartsDao.addProductCart(cid, pid);
      console.log(cid, pid);
      res.json({
        status: "success",
        respuesta,
      });
    } catch(error) {
       res.json({
        error,
        message: "error agregando el producto al carrito",
       });
    }
});

router.put("/:cid", async (req, res) => {
  try {
    let cid = req.params.cid;
    let products = req.body;
    let response = await cartsDao.updateCart(cid, products);
    res.json({
      status: "success",
      response,
    });
  } catch (error) {
    res.send(error.message);
  }
});

router.put("/:cid/products/:pid", async (req, res) => {
  try {
    let cid = req.params.cid;
    let pid = req.params.pid;
    let quantity = req.body.quantity;
    let response = await cartsDao.updateProductQuantity(cid, pid, quantity);
    res.json({
      status: "success",
      response,
    });
  } catch (error) {
    res.send(error.message);
  }
});

router.delete("/:cid/products/:pid", async (req, res) => {
  try {
    let cid = req.params.cid;
    let pid = req.params.pid;
    let response = await cartsDao.deleteProductCart(cid, pid);
    res.json({
      status: "success",
      response,
    });
  } catch (error) {
    res.send(error.message);
  }
});

router.delete("/:cid", async (req, res) => {
  try {
    let cid = req.params.cid;
    await cartsDao.deleteCart(cid);
    res.json({
      status: "success",
      message: "Cart deleted",
    });
  } catch (error) {
    res.send(error.message);
  }
});

export default router;