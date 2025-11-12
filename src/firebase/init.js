import { initializeApp, getApps, getApp } from "firebase/app";
import { firebaseConfig } from "./firebase.config";

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

export default app;
