import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  addDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  serverTimestamp,
  updateDoc,
  onSnapshot,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCVUrA5Jor_8xY_SD8re6-AkCSycmg5hwI",
  authDomain: "crwn-clothing-8b675.firebaseapp.com",
  projectId: "crwn-clothing-8b675",
  storageBucket: "crwn-clothing-8b675.appspot.com",
  messagingSenderId: "62098767735",
  appId: "1:62098767735:web:0be46a3c52056f3e2deb72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();

export const signInAuthWithGooglePopup = async () => {

  console.log('entra aca');
  const resultado = await signInWithPopup(auth, googleProvider);
  console.log('resultado singin google', resultado);
  return resultado;
}


export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd,
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

export const getCategories = async () => {
  console.log('categoriessssa entra')
  const categories = await getDoc(doc(db, 'categories', 'categories'));
  return categories.data().categories
}

export const getProducts = async () => {
  const products = await getDoc(doc(db, 'products', 'products'));
  return products.data().products
}

export const updateUserCart = async (user, cartItems) => {
  const userId = user.uid;
  const userRef = doc(db, 'users', userId);
  try {
    await updateDoc(userRef, { cart: cartItems });
  } catch (error) {
    console.error(error);
  }
}

export const createUserDocumentFromAuth = async (
  userAuth
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);
  console.log('userDocRef ', userDocRef);
  console.log('userUid ', userAuth.uid)
  console.log('userSnapshot ', userSnapshot);
  console.log('userSnapshot.exist: ', userSnapshot.exists())
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = serverTimestamp();
    console.log("se va a crear doc")
    try {
      const resultado = await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
      console.log("creacion doc", resultado)
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};

export const onUserCartChange = (user, callback) => {
  const userId = user.uid;
  const userDocRef = doc(db, "users", userId);

  const unsubscribe = onSnapshot(userDocRef, { includeMetadataChanges: true }, (snapshot) => {
    if (snapshot.exists() && snapshot.data().cart) {
      const currentCart = snapshot.data().cart;
      callback(currentCart)
    }
  });
  return unsubscribe;
}

export const onUserPurchasesChange = (user, callback) => {
  const userId = user.uid
  const purchasesRef = collection(doc(db, "users", userId), "purchases");
  const unsubscribe = onSnapshot(purchasesRef, { includeMetadataChanges: true }, (snapshot) => {
    console.log('purSnap', snapshot)
    if (!snapshot.empty) {
      const userPurchases = snapshot.docs.map((doc) => {
        const data = doc.data();
        console.log('purchase doc: ', data);
        // Realiza cualquier manipulación adicional de los datos aquí, si es necesario
        return data;
      });
      console.log('---------userPurchases---------', userPurchases);
      callback(userPurchases);
    }
  });

  return unsubscribe;
}

export const createNewPurchase = async (purchase, user) => {
  if (!purchase) return;
  const userId = user.uid
  const purchasesRef = collection(doc(db, "users", userId), "purchases");
  const newPurchaseRef = await addDoc(purchasesRef, purchase);
  await updateUserCart(user, []);

  console.log("Added new purchase with ID: ", newPurchaseRef.id);
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  console.log('auth', auth);
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const createProducts = async (newProducts, user) => {
  const userId = user.uid
  const userProducts = collection(doc(db, "users", userId), "products");
  const newProductsRef = await setDoc(doc(userProducts, 'products'), { products: newProducts });
  return newProductsRef;
}

export const getUserProducts = async (user) => {
  const userId = user.uid
  const userProductsRef = doc(db, "users", userId, "products", 'products');
  const userProducts = await getDoc(userProductsRef);
  return userProducts.data().products;
}



export const createCategories = async (newCategories, user) => {
  try {
    const userId = user.uid
    const userCategories = collection(doc(db, "users", userId), "categories");
    const newCategoriesRef = await setDoc(doc(userCategories, 'categories'), { categories: newCategories });
    return newCategoriesRef;
  }
  catch (error) {
    throw error;
  }
}

export const getUserCategories = async (user) => {
  try {
    const userId = user.uid
    const userCategoriesRef = doc(db, "users", userId, "categories", "categories");
    const userCategories = await getDoc(userCategoriesRef);
    return userCategories.data().categories;
  } catch (e) {
    throw e;
  }



}