import { getAnalytics } from 'firebase/analytics';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { initializeApp } from '@firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyD1qKnwG6G8OIQ2O77PiNhz2RSWF04ZzAk',
  authDomain: 'crypto-punk.firebaseapp.com',
  projectId: 'crypto-punk',
  storageBucket: 'crypto-punk.appspot.com',
  messagingSenderId: '237223077835',
  appId: '1:237223077835:web:39108a07663ee4ac6d384e',
  databaseURL: 'https://crypto-punk-default-rtdb.europe-west1.firebasedatabase.app'
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebaseApp);
export const storage = getStorage(firebaseApp);
export const firestore = getFirestore(firebaseApp);
export const realtime = getDatabase(firebaseApp);
