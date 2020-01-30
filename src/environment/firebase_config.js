import * as firebase from 'react-native-firebase';

var firebaseConfig = {
    apiKey: "AIzaSyC5KFD_SPpmcxM_J35ctXGna66qD6zb5yw",
    authDomain: "hotel-app-19956.firebaseapp.com",
    databaseURL: "https://hotel-app-19956.firebaseio.com",
    projectId: "hotel-app-19956",
    storageBucket: "hotel-app-19956.appspot.com",
    messagingSenderId: "33078313759",
    appId: "1:33078313759:web:718169c05e2aebd715e62a",
    measurementId: "G-79E4HKXMNK"
};

export const firebaseAuth = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();