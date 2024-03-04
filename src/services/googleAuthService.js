// This file would export signInWithGoogle function used above
import { auth, provider } from '../config/firebaseConfig';
import {signInWithPopup} from 'firebase/auth';

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
