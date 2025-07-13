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

export const changeAllProduct = async (id, changedProduct) => {
  try {
    const productRef = doc(productsCollection, id);
    const productDoc = await getDoc(productRef);

    if (!productDoc.exists()) {
      return null;
    }

    await setDoc(productRef, changedProduct); // Reemplazo completo

    return { id, ...changedProduct };
  } catch (error) {
    console.error(error);
  }
};

export const patchProduct = async (id, product) => {
  try {
    const productRef = doc(productsCollection, id);
    const productDoc = await getDoc(productRef);

    if (!productDoc.exists()) {
      return null;
    }

    await updateDoc(productRef, product);
    return {id, ...productDoc.data(), ...product};

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
