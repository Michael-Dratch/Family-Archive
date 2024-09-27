// Import necessary modules
import { onCall } from "firebase-functions/v2/https";
import { initializeApp } from "firebase-admin/app";
import { HttpsError } from "firebase-functions/v2/https";
import { getFirestore } from "firebase-admin/firestore";
const MAX_COLLECTIONS = 0;
// Initialize Firebase Admin SDK
initializeApp();

export const createCollection = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError(
      "unauthenticated",
      "User must be authenticated to create collection."
    );
  }
  const userId = request.auth.uid;
  const db = getFirestore();

  const snapshot = await db
    .collection("collections")
    .where("owner", "==", userId)
    .get();

  if (snapshot.size >= MAX_COLLECTIONS) {
    throw new HttpsError(
      "failed-precondition",
      "Maximum collections limit reached."
    );
  }

  // Send back a message that we've successfully written the message

  // const bucketName = "your-firebase-bucket-name";
  // const fileName = `uploads/${data.fileName}`;
  // const contentType = data.contentType;

  return { user: request.auth };
});
