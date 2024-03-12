// This file would export signInWithGoogle function used above
import { auth, provider } from '../config/firebaseConfig';
import {signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // The token you receive from the sign-in process
      const token = result.credential.idToken;
      console.log('token ', token);
      // This part should be handled in authService.js but shown here for clarity
      fetch('/api/auth/verifyToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
    })
    .catch((error) => {
      console.error("Error during sign in: ", error);
      
    });
};

export const signUpWithEmailAndPassword = ({user_name, user_pwd}) => {
  console.log('signUpWithEmailAndPassword');
  console.log(user_name, user_pwd);
  createUserWithEmailAndPassword(auth, user_name, user_pwd)
    .then((result) => {
      // Sign Up
      const user = result.user;
      if (user.displayName === null){
        user.displayName = user.email
      }
      console.log("User Created", user);
    })
    .catch((error) => {
      console.error("Error during sign up signUpWithEmailAndPassword: ", error);
      alert(error.message);
    });
};

export const signInWithCustomEmailAndPassword = ({user_name, user_pwd}) => {
  console.log('signInWithEmailAndPassword');
  console.log(user_name, user_pwd);
  signInWithEmailAndPassword(auth, user_name, user_pwd)
    .then((result) => {
      // Sign Up
      const user = result.user;
      if (user.displayName === null){
        user.displayName = user.email
      }
      console.log("User Logged In", user);
    })
    .catch((error) => {
      console.error("Error during sign in signInWithEmailAndPassword: ", error);
      alert(error.message);
    });
};
