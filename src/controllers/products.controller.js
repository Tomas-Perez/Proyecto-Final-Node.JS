import * as model from "../models/products.model.js";

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

export const changeProduct = async (req, res) => { // REVISAR
  const productId = req.params.id;
  const { name, price } = req.body;

  try {
    const updatedProduct = await model.changeProduct(productId, name, price); // conviene hacer funcion q mande un producto completo

    if (!updatedProduct) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error("Error al modificar el producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const deleteProduct = async (req, res) => {
  const id = req.params.id; // sacar parseInt

  const deletedProduct = await model.deleteProduct(id);
  if (!deletedProduct) {
    return res.status(404).json({ error: "No existe el producto" });
  }
  res.json({ message: "Producto eliminado", product: deletedProduct }); // testear
};
