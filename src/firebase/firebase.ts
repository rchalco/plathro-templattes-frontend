// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCQbxZlIwZNLqbOau5ryo5UYVhpLi_7LrA',
  authDomain: 'platheo-3fd58.firebaseapp.com',
  // authDomain: 'app.platheo.com',
  projectId: 'platheo-3fd58',
  storageBucket: 'platheo-3fd58.firebasestorage.app',
  messagingSenderId: '207779492057',
  appId: '1:207779492057:web:c404461e0b1d48388dcec8',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const auth = getAuth(app)
export { app, auth, analytics }
