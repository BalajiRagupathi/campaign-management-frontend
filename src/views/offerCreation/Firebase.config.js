import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBdVQJnTBLD4fs_kyjxhUIqiGC0K4YNcn4",
    authDomain: "fir-imagestore-5410f.firebaseapp.com",
    projectId: "fir-imagestore-5410f",
    storageBucket: "fir-imagestore-5410f.appspot.com",
    messagingSenderId: "373291027745",
    appId: "1:373291027745:web:5d5727fd2d8f1e0e4c4260",
    measurementId: "G-CB472B52XS"
  };
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {storage, firebase as default};