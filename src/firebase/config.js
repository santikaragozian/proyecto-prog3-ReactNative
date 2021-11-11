import app from 'firebase/app'
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCNMgFPXSl47fwKRoYbgbjzA65gB9gVEqk",
    authDomain: "proyecto-prog3-reactnative.firebaseapp.com",
    projectId: "proyecto-prog3-reactnative",
    storageBucket: "proyecto-prog3-reactnative.appspot.com",
    messagingSenderId: "876941089648",
    appId: "1:876941089648:web:de81a1d763921dcfdd4db5"
};

app.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const storage = app.storage()
export const db = app.firestore()
