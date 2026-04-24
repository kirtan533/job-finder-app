import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDPmEV0uuo0v-kkEfNXBryjLD0gX5dHnQs",
  authDomain: "job-finder-app-d7303.firebaseapp.com",
  projectId: "job-finder-app-d7303",
  storageBucket: "job-finder-app-d7303.firebasestorage.app",
  messagingSenderId: "463149369787",
  appId: "1:463149369787:web:3383a1483ed7815b3cdc9e",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
