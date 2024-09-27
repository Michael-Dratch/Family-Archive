import { getFunctions, httpsCallable } from "firebase/functions";
import { functions } from "../../../config/firebase/clientApp";

const createCollection = async () => {
  const addMessage = httpsCallable(functions, "createCollection");
  addMessage({ text: "Test" }).then((result) => {
    console.log(result);
  });
};

const FirebaseCollectionsService = {
  createCollection: createCollection,
};

export default FirebaseCollectionsService;
