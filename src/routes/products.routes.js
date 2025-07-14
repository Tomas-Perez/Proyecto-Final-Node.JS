import {Router} from "express";
import {authentication} from "../middlewares/authentication.js"
import { 
    getAllProducts,
    searchProduct,
    getProductById,
    createProduct,
    changeAllProduct,
    patchProduct,
    deleteProduct
    } from "../controllers/products.controller.js";

const router = Router();

router.get("/products", getAllProducts);
router.get("/products/search", searchProduct);
router.get("/products/:id", getProductById);
router.post("/products", authentication, createProduct);
router.put("/products/:id", authentication, changeAllProduct);
router.patch("/products/:id", authentication, patchProduct);
router.delete("/products/:id", authentication, deleteProduct);

export default router;
