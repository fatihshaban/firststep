// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC3WoIWxBZnk7UmdUEP0-b74m_Ej0Rs3Ig",
    authDomain: "firststep-c176b.firebaseapp.com",
    projectId: "firststep-c176b",
    storageBucket: "firststep-c176b.firebasestorage.app",
    messagingSenderId: "1010290192581",
    appId: "1:1010290192581:web:ced552a0c2634c40ad40ac"
  };

// Initialize Firebase

// const app = initializeApp(firebaseConfig);
// const db = firebase.firestore();



// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();