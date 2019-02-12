import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

import Data from '../data/firebase-config.js';

firebase.initializeApp(Data.config);

const Login = () => {
    return (
        <div>
            <StyledFirebaseAuth uiConfig={Data.uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
    )
}

export default Login;
