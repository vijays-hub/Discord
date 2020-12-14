import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDEmRJEekVKg0shH9Z0IKPOBlzUiIxhOIo",
    authDomain: "vijaysdiscord.firebaseapp.com",
    projectId: "vijaysdiscord",
    storageBucket: "vijaysdiscord.appspot.com",
    messagingSenderId: "207782555624",
    appId: "1:207782555624:web:30e960b4676bffc982be5d",
    measurementId: "G-PCVPKS1Q9Y"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()
const authProvider = new firebase.auth.GoogleAuthProvider();

export { auth, authProvider }
export default db;