import "./init";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile as fbUpdateProfile,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";

const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

export async function signInWithGooglePopup() {
  return await signInWithPopup(auth, googleProvider);
}

export async function signUpWithEmail({
  name,
  email,
  password,
  photoURL,
} = {}) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);

  if (name || photoURL) {
    await fbUpdateProfile(cred.user, {
      displayName: name || cred.user.displayName || null,
      photoURL: photoURL || cred.user.photoURL || null,
    });
    if (typeof cred.user.reload === "function") {
      await cred.user.reload();
    }
  }

  return cred;
}

export async function signInWithEmail({ email, password } = {}) {
  return await signInWithEmailAndPassword(auth, email, password);
}

export async function signOutUser() {
  return await signOut(auth);
}

export async function updateUserProfile({ displayName, photoURL } = {}) {
  if (!auth.currentUser) throw new Error("No authenticated user");
  await fbUpdateProfile(auth.currentUser, { displayName, photoURL });
  return auth.currentUser;
}

export async function sendResetPasswordEmail(email) {
  return await sendPasswordResetEmail(auth, email);
}

export function onAuthStateChangedListener(cb) {
  return onAuthStateChanged(auth, cb);
}
