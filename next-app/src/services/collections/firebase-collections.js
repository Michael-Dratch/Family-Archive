import { getFunctions, httpsCallable } from "firebase/functions";
import { functions } from "../../../config/firebase/clientApp";

const createCollection = async ({ title, description }) => {
  const data = { title: title, description, description };
  const createCollection = httpsCallable(functions, "createCollection");
  try {
    return await createCollection(data).then((result) => {
      return result.data.uploadUrl;
    });
  } catch (e) {
    switch (e.code) {
      case "functions/failed-precondition":
        throw new Error("MAX_COLLECTIONS");
      default:
        console.log({ e });
        throw new Error("Error creating collection");
    }
  }
};

const FirebaseCollectionsService = {
  createCollection: createCollection,
};

export default FirebaseCollectionsService;
