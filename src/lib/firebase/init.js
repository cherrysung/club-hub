import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCZjGv2VF7i9_eQy0oXOkX0TZBOhzVFPyA',
  authDomain: 'club-hub-e70ad.firebaseapp.com',
  projectId: 'club-hub-e70ad',
  storageBucket: 'club-hub-e70ad.appspot.com',
  messagingSenderId: '829359445942',
  appId: '1:829359445942:web:c544cc42d9fcfa0b7dd317',
  measurementId: 'G-6P4LRRZHY8',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
