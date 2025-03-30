// firebase.js
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// Sua configuração do Firebase (do console Firebase)
const firebaseConfig = {
  apiKey: "AIzaSyDFdSECqH9gQgpjRAzbaHtlnmdigBazBQI",
  authDomain: "nosso-cantinho-9b3cd.firebaseapp.com",
  projectId: "nosso-cantinho-9b3cd",
  storageBucket: "nosso-cantinho-9b3cd.firebasestorage.app",
  messagingSenderId: "343639956353",
  appId: "1:343639956353:web:b360bdb363c7844273e680",
  measurementId: "G-Z4WGJ9KPZQ"
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Função de upload de foto
function uploadFile(file) {
  const storageRef = ref(storage, 'fotos/' + file.name);

  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on('state_changed', 
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
    }, 
    (error) => {
      console.error('Upload failed:', error);
    }, 
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
      });
    }
  );
}
