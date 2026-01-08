import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, signInAnonymously } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCWYvDvNCP-R8xI1KOHe4KGrmsYhgr78XY",
  authDomain: "waah-restaurant.firebaseapp.com",
  projectId: "waah-restaurant",
  storageBucket: "waah-restaurant.appspot.com", // 🔥 ONLY THIS
  messagingSenderId: "468426247908",
  appId: "1:468426247908:web:cbb23b00ed3f2cf94d66f1",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app); // 🔥 no params
export const auth = getAuth(app);

signInAnonymously(auth)
  .then(() => console.log("✅ Anonymous auth success"))
  .catch(console.error);
