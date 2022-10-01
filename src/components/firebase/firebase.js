import firebase from "firebase/app";
import "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyCapPOsT69QeyvZX_7dL_7zr2CP5p3MqsM",
    authDomain: "react-spring-boot-user-profile.firebaseapp.com",
    projectId: "react-spring-boot-user-profile",
    storageBucket: "react-spring-boot-user-profile.appspot.com",
    messagingSenderId: "166089360645",
    appId: "1:166089360645:web:2fb08e24ab0871ba89a36c",
    measurementId: "G-QLTCR21CF0"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };