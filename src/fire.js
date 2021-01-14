import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCPeIF6ysksJe5BVemNrbsT3W14Q6S_ZEM",
    authDomain: "profilepicrepo.firebaseapp.com",
    projectId: "profilepicrepo",
    storageBucket: "profilepicrepo.appspot.com",
    messagingSenderId: "533376832888",
    appId: "1:533376832888:web:765f036ffd747145a8648d",
    measurementId: "G-ZBR4J884PC"
};

const fire = firebase.initializeApp(firebaseConfig);
export default fire;