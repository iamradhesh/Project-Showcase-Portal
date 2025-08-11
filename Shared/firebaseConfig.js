import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "project-showcase-5b91f.firebaseapp.com",
  projectId: "project-showcase-5b91f",
  storageBucket: "project-showcase-5b91f.appspot.com",
  messagingSenderId: "372896966750",
  appId: "1:372896966750:web:353b7d6a971ec2f650eccf",
  measurementId: "G-285T5JEBMZ",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✅ Avoid analytics server-side
let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

// ✅ Export without storage
export { app, db, analytics };