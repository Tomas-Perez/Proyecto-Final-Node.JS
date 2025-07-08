import * as model from "../models/products.model.js";

export const getAllProducts = async (req, res) => {
  
  try {
    const products = await model.getAllProducts();
    res.json(products);
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }

};

export const searchProduct = async (req, res) => {
  const { name } = req.query;

  try {
    const products = await model.getAllProducts();

    const filteredProducts = products.filter((p) =>
      p.name.toLowerCase().includes(name.toLowerCase())
    );

    res.json(filteredProducts);
  } catch (error) {
    console.error("Error al buscar productos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await model.getProductById(id);

    if (!product) {
      return res.status(404).json({ error: "No existe el producto" });
    }

    res.json(product);
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const createProduct = async (req, res) => {
  const { name, price } = req.body;

  const newProduct = {
    name,
    price,
  };

  try {
    await model.saveProduct(newProduct);
    res.status(201).json({ message: "Producto creado exitosamente" });
  } catch (error) {
    console.error("Error al crear el producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const changeProduct = async (req, res) => {
  const productId = parseInt(req.params.id);
  const { name, price } = req.body;

  try {
    const updatedProduct = await model.changeProduct(productId, name, price);

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
  const id = parseInt(req.params.id, 10);

  try {
      const deletedProduct = await model.deleteProduct(id);
    if (!deletedProduct) {
      return res.status(404).json({ error: "No existe el producto" });
    }
    res.json({ message: "Producto eliminado", product: deletedProduct });
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
