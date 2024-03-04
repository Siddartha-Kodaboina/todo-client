// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_NODE_ENV==='development'? process.env.REACT_APP_FIREBASE_API_KEY : secrets.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_NODE_ENV==='development'? process.env.REACT_APP_FIREBASE_AUTH_DOMAIN : secrets.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_NODE_ENV==='development'? process.env.REACT_APP_FIREBASE_PROJECT_ID : secrets.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_NODE_ENV==='development'? process.env.REACT_APP_FIREBASE_STORAGE_BUCKET : secrets.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_NODE_ENV==='development'? process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID : secrets.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_NODE_ENV==='development'? process.env.REACT_APP_FIREBASE_APP_ID : secrets.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_NODE_ENV==='development'? process.env.REACT_APP_FIREBASE_MEASUREMENT_ID : secrets.REACT_APP_FIREBASE_MEASUREMENT_ID
// };

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
  };

  console.log(firebaseConfig);
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth();

export const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account', 'login_hint': 'user@example.com' });

// export const signInWithGoogle = () => auth.signInWithPopup(provider);