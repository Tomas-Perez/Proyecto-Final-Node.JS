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
  updateDoc,
  setDoc,
} from "firebase/firestore";

const productsCollection = collection(db, "products");

/*const __dirname = import.meta.dirname;

const jsonPath = path.join(__dirname, "./products.json");

const json = fs.readFileSync(jsonPath, "utf-8");

const products = JSON.parse(json);*/

// meter todas las funciones dentro de try/catch

export const getAllProducts = async () => {
  try {
    const querySnapshot = await getDocs(productsCollection);
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return products;
  } catch (error) {
    console.error(error);
  }
};

export const getProductById = async (id) => {
  try {
    const productDoc = await getDoc(doc(productsCollection, id));

    if (!productDoc.exists()) {
      return null;
    }
    return productDoc.data();
  } catch (error) {
    console.error(error);
  }
};

export const saveProduct = async (product) => {

  try {
    await addDoc(productsCollection, product);
  } catch (error) {
    console.error(error);
  }

};

export const changeProduct = async (id, name, price) => {
  try {
    const productRef = doc(productsCollection, id);
    const productDoc = await getDoc(productRef);

    if (!productDoc.exists()) {
      return null;
    }

    const updatedProduct = { name, price };

    await setDoc(productRef, updatedProduct);

    return { id, ...updatedProduct };
  } catch (error) {
    console.error(error);
  }
};

export const deleteProduct = async (id) => {
  try {
    const productRef = doc(productsCollection, id);
    const productDoc = await getDoc(productRef);

    if (!productDoc.exists()) {
      return null;
    }

    await deleteDoc(productRef);
    return productDoc.data();
  } catch (error) {
    console.error(error);
  }
};
