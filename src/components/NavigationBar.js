import React from 'react';
import useFirebaseUser from '../hooks/useFirebaseUser'; 
import { auth } from '../config/firebaseConfig';

import '../styles/Navigation.css'

const NavigationBar = () => {
    const user = useFirebaseUser();
    // console.log(user)
  return (
    <div className="navigation-main">

        <div className="left">
            <h2>Lets Get It Done ✅</h2>
        </div>
        <div className="right">
            {user && <p>{user.displayName}</p>}
            <button className='logout' onClick={() => auth.signOut()}>Logout</button>
        </div>
    </div>
  );
}

export default NavigationBar;