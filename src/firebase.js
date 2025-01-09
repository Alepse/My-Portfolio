import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBFOe2ElfVtrPNbi-3Sz-nNEd56mFfLd5U",
  authDomain: "ias2-f7656.firebaseapp.com",
  projectId: "ias2-f7656",
  storageBucket: "ias2-f7656.appspot.com",
  messagingSenderId: "375937487893",
  appId: "1:375937487893:web:3fe95dc0ccbd4b6ec96a1c",
  measurementId: "G-EG3CNKFJ3D"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, db, storage };
