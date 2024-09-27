import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../config/firebase/clientApp";

const getUserProfile = async (userID) => {
  const docRef = doc(db, "users", userID);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return undefined;
  }
  const data = docSnap.data();

  let result = {
    id: docSnap.id,
    username: data.username,
    email: data.email,
    collections: data.collections,
  };

  return result;
};

const createUserProfile = async (email, username) => {
  try {
    const docRef = doc(db, "users", email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("User already exists:", docSnap.data());
      return docSnap.data();
    } else {
      console.log("creating new profile");
      await setDoc(doc(db, "users", email), {
        username: username,
      });
      return { uid: email, username: username };
    }
  } catch (error) {
    throw new Error(error);
  }
};

const FirestoreService = {
  getUserProfile: getUserProfile,
  createUserProfile: createUserProfile,
};

export default FirestoreService;
