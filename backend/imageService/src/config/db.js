// Import the functions you need from the SDKs you need

//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import * as dotenv from 'dotenv'

dotenv.config()
export default {

     firebaseConfig :{
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUKET,
        messagingSenderId: process.env.MASSAGE_CONF_id,
        appId: process.env.APP_ID ,
        measurementId: process.env.MESURMENT_ID
      }

};


// Initialize Firebase

//const analytics = getAnalytics(app);

