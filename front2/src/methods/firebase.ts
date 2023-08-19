import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// export const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_MESSAGEING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_APP_ID,
//   measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyAPX-8Rjh-1NlSse5sz0qXjrqaWn3ZtmJ0",
  authDomain: "term3-mizuki-ohashi.firebaseapp.com",
  projectId: "term3-mizuki-ohashi",
  storageBucket: "term3-mizuki-ohashi.appspot.com",
  messagingSenderId: "819233149607",
  appId: "1:819233149607:web:3bda8589ae94e565cb8182",
  measurementId: "G-WL1L0WGLLT",
};

// console.log("firebase", firebaseConfig);

const app = initializeApp(firebaseConfig);

export const fireAuth = getAuth(app);

export const storage = getStorage(app);
