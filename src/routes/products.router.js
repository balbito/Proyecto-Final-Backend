import { Router } from 'express';
import productsDao from '../daos/dbManager/products.dao.js';

const router = Router();

router.get("/", async (req, res) => {
    try {
        // Obtengo los parametros de consulta desde req.query
        const { limit, page, sort, query } = req.query;

        const products = await productsDao.getAllProducts(limit, page, sort, query );

        res.json(products);

    } catch (error) {
        res.status(400).json(error);
    }
});

router.get("/:pid", async (req, res) => {
    try {
        const pid = req.params.pid
        const product = await productsDao.getProductById(pid);
        if (!respuesta) return res.send("No se encontro el producto");
        res.json({
            product,
            message: "success",
        });
    } catch (error) {
        res.json(error);
    }
});

router.post("/", async (req, res) => {
    try {
        const product = 
        await productsDao.createProduct(req.body);
        res.json({
            product,
            message: "Porducto creado"
        })
        // res.redirect("/realTimeProducts");
    } catch (error) {
        res.json({
            error,
            message: "error al crear el producto"
        });
    }
});

router.put("/:pid", async (req, res) => {
    try {
        const pid = req.params.pid;
        const product = await productsDao.updateProduct(pid, req.body);
        res.json({
            product,
            message: "producto actualizado",
        });
    } catch (error) {
        res.json({
            error,
            message: "no se puede actualiar el producto",
        });
    }
});

router.delete("/:pid", async (req, res) => {
    try {
       const pid = req.params.pid;
       const product = await productsDao.deleteProduct(pid, req.body);
       res.json({
        product,
        message: "producto eliminado",
       });
    } catch {
        res.json({
            error,
            message: "no se puede eliminar el producto",
        });
    }
});

export default router;