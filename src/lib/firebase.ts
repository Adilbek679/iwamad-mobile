import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyDNcifMBFHqhUyYX7FDFwT-bCXn7nlL048',
  authDomain: 'iwamad-chat.firebaseapp.com',
  databaseURL: 'https://iwamad-chat-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'iwamad-chat',
  storageBucket: 'iwamad-chat.firebasestorage.app',
  messagingSenderId: '854712592896',
  appId: '1:854712592896:web:ad314e0381903b253ac6e5',
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
