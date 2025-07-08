import fs from "fs";
import path from "path";

import { db } from "../data/data.js";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";

const productsCollection = collection(db, "products");

/*const __dirname = import.meta.dirname;

const jsonPath = path.join(__dirname, "./products.json");

const json = fs.readFileSync(jsonPath, "utf-8");

const products = JSON.parse(json);*/

export const getAllProducts = async () => {
  const querySnapshot = await getDocs(productsCollection);
  const products = [];
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data()});
  });
  return products;
};

export const getProductById = async (id) => {
  const productDoc = await getDoc(doc(productsCollection, id));
  if (productDoc.exists()) {
    //console.log(productDoc.data());
    return productDoc.data();
  } else {
    return null;
  }
};

export const saveProduct = async (product) => {
  await addDoc(productsCollection, product);
};

export const changeProduct = async (id, name, price) => {
  const productRef = doc(productsCollection, id);
  const productDoc = await getDoc(productRef);

  if (!productDoc.exists()) {
    return null;
  }

  const updatedProduct = { name, price };

  await updateDoc(productRef, updatedProduct);

  return { id, ...updatedProduct };
};

export const deleteProduct = async (id) => {
  const productRef = doc(productsCollection, id);
  const productDoc = await getDoc(productRef);

  if (!productDoc.exists()) {
    return null;
  }

  await deleteDoc(productRef);
  return productDoc.data();
};
