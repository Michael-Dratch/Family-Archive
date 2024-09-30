// Import necessary modules
import { onCall, HttpsError } from "firebase-functions/v2/https";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const MAX_COLLECTIONS = 10;
initializeApp();

export const createCollection = onCall(async (request) => {
  console.log("function running");
  if (!request.auth) {
    throw new HttpsError(
      "unauthenticated",
      "User must be authenticated to create collection."
    );
  }

  const userId = request.auth.uid;
  const { title, description } = request.data;
  const db = getFirestore();
  let collectionRef;
  let collectionId;

  validateInput(request.data);
  try {
    await checkMaxCollectionsExceeded(db, userId);
    collectionRef = await createCollectionDocument(
      db,
      userId,
      title,
      description
    );
    await updateUserDocument(db, userId, collectionRef);
  } catch (e) {
    throw new HttpsError("internal", "Error creating collection.");
  }
  const uploadUrl = `collections/${collectionId}/coverimage-original`;
  return { uploadUrl: uploadUrl };
});

const validateInput = ({ title, description }) => {
  if (!title || !description) {
    throw new HttpsError(
      "invalid-argument",
      "Title and description are required."
    );
  }
};

const checkMaxCollectionsExceeded = async (db, userId) => {
  const snapshot = await db
    .collection("collections")
    .where("owner", "==", userId)
    .get();

  if (snapshot.size + 1 > MAX_COLLECTIONS) {
    throw new HttpsError(
      "failed-precondition",
      "Maximum collections limit reached."
    );
  }
};

const createCollectionDocument = async (db, userId, title, description) => {
  let collectionRef = await db
    .collection("collections")
    .add({ title: title, description: description, owner: userId });
  let collectionId = collectionRef.id;
  console.log(collectionId);
  return collectionRef;
};

const updateUserDocument = async (db, userId, collectionRef) => {
  let userCollections;
  let userRef = db.collection("users").doc(userId);
  const userDoc = await userRef.get();
  if (!userDoc.exists) {
    throw new HttpsError("unimplemented", "User not found.");
  }
  const userData = userDoc.data();
  if (!userData || !userData.collections) {
    userCollections = [collectionRef.id];
  } else {
    userCollections = [...userData.collections, collectionRef.id];
  }
  await userRef.update({ collections: userCollections });
};
