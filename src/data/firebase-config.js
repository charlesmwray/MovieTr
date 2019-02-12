import firebase from 'firebase';

const Data = {
    uiConfig: {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
        signInSuccessUrl: '/signedIn',
        // We will display Google and Facebook as auth providers.
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
    },
    config: {
        apiKey: 'AIzaSyCXzYwoCqqosEUFIWhbFPaSz2sYFT0M2ws',
        authDomain: 'movietracker-1b2a9.firebaseapp.com',
        databaseURL: 'https://movietracker-1b2a9.firebaseio.com',
        projectId: 'movietracker-1b2a9',
        storageBucket: 'movietracker-1b2a9.appspot.com',
        messagingSenderId: '339128814536'
    }
};

export default Data;
