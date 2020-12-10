import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/database'

var firebaseConfig = {
    apiKey: "AIzaSyD4mzOpruY84_TCMnukJp9IeNrEWEd3Rlw",
    authDomain: "unfancy-trivia.firebaseapp.com",
    databaseURL: "https://unfancy-trivia-default-rtdb.firebaseio.com",
    projectId: "unfancy-trivia",
    storageBucket: "unfancy-trivia.appspot.com",
    messagingSenderId: "611965945486",
    appId: "1:611965945486:web:b2990dfccd52a7340a6bdf",
    measurementId: "G-D4W4XFKL6G"
};

if (typeof window !== undefined && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
    if ('measurementId' in firebaseConfig) {
        firebase.analytics()
    }
}

export default firebase