import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDZzw3jqDUFYd54HMTOAOG8dj9e0Lhk16w",
  authDomain: "controle-financeiro-584c5.firebaseapp.com",
  projectId: "controle-financeiro-584c5",
  storageBucket: "controle-financeiro-584c5.firebasestorage.app",
  messagingSenderId: "751332659471",
  appId: "1:751332659471:web:ef17ffb45f4b9d00e56e7a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
