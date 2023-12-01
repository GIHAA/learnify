// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5O27PfzVM4RHQjFXSEwysbMPLFN55rcE",

  authDomain: "ds-project-53aa8.firebaseapp.com",

  projectId: "ds-project-53aa8",

  storageBucket: "ds-project-53aa8.appspot.com",

  messagingSenderId: "805074147839",

  appId: "1:805074147839:web:4d0dbea5c04dffbf04efca",

  measurementId: "G-ZY9MC3W124",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
