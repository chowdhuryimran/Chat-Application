// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBo7e92FHCwoWQy5Wg54BY1AaI_ep03bU0",
  authDomain: "chat-app-4e85c.firebaseapp.com",
  projectId: "chat-app-4e85c",
  storageBucket: "chat-app-4e85c.appspot.com",
  messagingSenderId: "630488214633",
  appId: "1:630488214633:web:8b8a330db67ddcdf8c06f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app