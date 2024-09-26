import { auth } from "../../../config/firebase/clientApp";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const signup = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const login = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password).then(
    (userCredential) => {
      const user = userCredential.user;
      return { email: user.email, username: user.displayName };
    }
  );
};

const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log(user);
      return { email: user.email, username: user.displayName };
    })
    .catch((error) => {
      return error;
    });
};

const logout = async () => {
  return auth.signOut();
};

const resetPassword = async (email) => {
  return sendPasswordResetEmail(auth, email);
};

const onAuthChanged = (setCurrentUser, setLoading) => {
  return onAuthStateChanged(auth, (user) => {
    setCurrentUser(user);
    setLoading(false);
  });
};

const firebaseAuthService = {
  signup,
  login,
  loginWithGoogle,
  logout,
  resetPassword,
  onAuthChanged,
};

export default firebaseAuthService;
