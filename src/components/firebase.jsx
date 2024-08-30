// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPToTp3u9PASKWa_oIZiT6K0r-pErx6Pg",
  authDomain: "registration-form-264cf.firebaseapp.com",
  projectId: "registration-form-264cf",
  storageBucket: "registration-form-264cf.appspot.com",
  messagingSenderId: "332272648819",
  appId: "1:332272648819:web:fe46bcfe9090f989a16006"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore(app)
export default app ;