// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDIBWDEV8cnGKcjsaeXgjBblDtHByVVLoQ',
  authDomain: 'jato-app-b2b3d.firebaseapp.com',
  projectId: 'jato-app-b2b3d',
  storageBucket: 'jato-app-b2b3d.firebasestorage.app',
  messagingSenderId: '88783019415',
  appId: '1:88783019415:web:ec2cbcd7f1a408f139b8d2',
  measurementId: 'G-JHF70FZC27',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const auth = getAuth(app)
export { app, auth, analytics }
