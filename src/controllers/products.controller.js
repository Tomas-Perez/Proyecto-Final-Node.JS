import * as model from "../models/products.model.js";
import * as utils from "../utils/utils.js";
import {filterProducts} from "../utils/filter.products.js"

export const getAllProducts = async (req, res) => {
  const products = await model.getAllProducts();
  res.json(products);
};

export const searchProduct = async (req, res) => {
  const products = await model.getAllProducts();

  if (!products || products.length === 0) {
    return res.status(404).json({ error: "No hay productos disponibles." });
  }

  const filtered = filterProducts(products, req.query);

  if (filtered.length === 0) {
    return res.status(404).json({ error: "No se encontraron productos con esos criterios." });
  }

  res.json(filtered);
};

export const getProductById = async (req, res) => {
  const { id } = req.params;

  const product = await model.getProductById(id);

  if (!product) {
    return res.status(404).json({ error: "No existe el producto" });
  }

  res.json(product);
};

export const createProduct = async (req, res) => {
  const productData = req.body;

  const errors = utils.validateDynamicProduct(req.body, {
    requireAll: true,
    requiredFields: ["name", "price"],
    fieldTypes: {
      name: "string",
      price: "number",
    },
  });

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  await model.saveProduct(productData);
  res.status(201).json(productData);
};

export const changeAllProduct = async (req, res) => {
  const id = req.params.id;
  const newData = req.body;

  const existingProduct = await model.getProductById(id);
  if (!existingProduct) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  const errors = utils.validatePutProduct(newData, existingProduct);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const updated = await model.changeAllProduct(id, newData);
  res.json(updated);
};

export const patchProduct = async (req, res) => {
  const id = req.params.id;
  const partialData = req.body;

  const errors = utils.validatePatchProduct(partialData);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const updatedProduct = await model.patchProduct(id, partialData);

  if (!updatedProduct) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }
  res.json(updatedProduct);
};

export const deleteProduct = async (req, res) => {
  const id = req.params.id;

  const deletedProduct = await model.deleteProduct(id);
  if (!deletedProduct) {
    return res.status(404).json({ error: "No existe el producto" });
  }
  //res.json({ message: "Producto eliminado", product: deletedProduct });
  res.status(204);
};
