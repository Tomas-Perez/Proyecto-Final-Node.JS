import * as model from "../models/products.model.js";
import * as utils from "../utils/utils.js"

export const getAllProducts = async (req, res) => {
  const products = await model.getAllProducts();
  res.json(products);
};

export const searchProduct = async (req, res) => {
  const { name } = req.query;

  const products = await model.getAllProducts();

  if (!products) {
    return res.status(404).json({ error: "No existe el producto" });
  }

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(name.toLowerCase())
  );

  res.json(filteredProducts);
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
  const { name, price } = req.body;

  const newProduct = {
    name,
    price,
  };

  await model.saveProduct(newProduct);
  res.status(201).json(newProduct);
};

export const changeAllProduct = async (req, res) => {
  const productId = req.params.id;
  const { name, price } = req.body;
  const changedProduct = {
    productId,
    name,
    price,
  };

  const errors = validatePutProduct(changedProduct);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const updatedProduct = await model.changeAllProduct(productId,changedProduct);

  if (!updatedProduct) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  res.json(updatedProduct);
};

export const patchProduct = async (req, res) => {
  const id = req.params.id;
  const partialData = req.body;

  const errors = validatePatchProduct(partialData);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const updatedProduct = await model.patchProduct(id, partialData);

  if (!updatedProduct) {
    return res.status(404).json({ error: "Producto no encontrado " });
  }
  res.json(updatedProduct);
};

export const deleteProduct = async (req, res) => {
  const id = req.params.id;

  const deletedProduct = await model.deleteProduct(id);
  if (!deletedProduct) {
    return res.status(404).json({ error: "No existe el producto" });
  }
  res.json({ message: "Producto eliminado", product: deletedProduct });
};
