import firebaseAuthService from "./firebase-auth";

/*

AuthService Interface 

const AuthService = {
  currentUser,
  signup,
  login,
  loginWithGoogle,
  logout,
  resetPassword,
  onAuthChanged,
};

*/

const AuthService = firebaseAuthService;
export default AuthService;
