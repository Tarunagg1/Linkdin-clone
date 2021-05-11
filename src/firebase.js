import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBpx3Wf-zTUKXXGxFP6TzrC0hUdbuM-uB0",
    authDomain: "linkdin-clone-bee0f.firebaseapp.com",
    projectId: "linkdin-clone-bee0f",
    storageBucket: "linkdin-clone-bee0f.appspot.com",
    messagingSenderId: "630721315736",
    appId: "1:630721315736:web:dd4575820ba0c74e7261ed"
};



const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();



export { auth, provider, storage };
export default db;
