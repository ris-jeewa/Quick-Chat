  import { initializeApp } from "firebase/app";
  import { getAuth } from "firebase/auth";
  import { getStorage } from "firebase/storage";
  import { getFirestore } from "firebase/firestore";

  const firebaseConfig = {
    apiKey: "AIzaSyCnOH16fvsYBS7lqtATWvM5t5wzS7IF7rM",
    authDomain: "chat-ae78b.firebaseapp.com",
    projectId: "chat-ae78b",
    storageBucket: "chat-ae78b.appspot.com",
    messagingSenderId: "66372899164",
    appId: "1:66372899164:web:41b1ca177d0cf2d29e3199"
  };

  export const app = initializeApp(firebaseConfig);
  export const auth = getAuth();
  export const storage = getStorage();
  export const db = getFirestore();