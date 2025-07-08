import {Router} from "express";
import { 
    getAllProducts,
    searchProduct,
    getProductById,
    createProduct,
    changeProduct,
    deleteProduct
    } from "../controllers/products.controller.js";

const router = Router();

router.get("/products", getAllProducts);
router.get("/products/search", searchProduct);
router.get("/products/:id", getProductById);
router.post("/products", createProduct);
router.put("/products/:id", changeProduct);
router.delete("/products/:id", deleteProduct);

export default router;
