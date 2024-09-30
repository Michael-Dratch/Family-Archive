import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getCountFromServer,
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

const createUserProfile = async (userID, email, username) => {
  console.log({ userID });
  try {
    const profileExists = await doesProfileExist(email);
    if (profileExists) {
      return { email: email, username: username };
    } else {
      await setDoc(doc(db, "users", userID), {
        email: email,
        username: username,
      });
      return { email: email, username: username };
    }
  } catch (error) {
    throw new Error(error);
  }
};

const doesProfileExist = async (email) => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("email", "==", email));
  const snapshot = await getCountFromServer(q);
  const profileExists = snapshot.data().count ? true : false;
  return profileExists;
};

const FirestoreUserService = {
  getUserProfile: getUserProfile,
  createUserProfile: createUserProfile,
};

export default FirestoreUserService;
