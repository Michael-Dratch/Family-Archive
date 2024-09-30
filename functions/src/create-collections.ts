import { onCall, HttpsError } from "firebase-functions/v2/https";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const MAX_COLLECTIONS = 10;
initializeApp();

export const createCollection = onCall(async (request) => {
  const userId = checkUserAuthenticated(request);
  const db = getFirestore();
  validateInput(request.data);
  await checkMaxCollectionsExceeded(db, userId);

  try {
    const collectionId = await createCollectionDocument(db, request);
    await updateUserDocument(db, userId, collectionId);
    const uploadUrl = `collections/${collectionId}/coverimage-original`;
    return { uploadUrl: uploadUrl };
  } catch (e) {
    throw new HttpsError("internal", "Error creating collection.");
  }
});

const checkUserAuthenticated = (request) => {
  if (!request.auth) {
    throw new HttpsError(
      "unauthenticated",
      "User must be authenticated to create collection."
    );
  }
  return request.auth.uid;
};
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

const createCollectionDocument = async (db, request) => {
  const { title, description } = request.data;
  const userId = request.auth.uid;
  const collectionRef = await db.collection("collections").add({
    title: title,
    description: description,
    owner: userId,
  });
  return collectionRef.id;
};

const updateUserDocument = async (db, userId, collectionId) => {
  let userCollections;
  const userRef = db.collection("users").doc(userId);
  const userDoc = await userRef.get();
  if (!userDoc.exists) {
    throw new HttpsError("unauthenticated", "User not found.");
  }
  const userData = userDoc.data();
  if (!userData || !userData.collections) {
    userCollections = [collectionId];
  } else {
    userCollections = [...userData.collections, collectionId];
  }
  await userRef.update({ collections: userCollections });
};
