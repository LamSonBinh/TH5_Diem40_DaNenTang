// firebaseConfig.js

import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAqHLUJmv_VVXyYMsLPJXobxP5HkBJCOxs",
  authDomain: "th5fireauth.firebaseapp.com",
  projectId: "th5fireauth",
  storageBucket: "th5fireauth.appspot.com",
  messagingSenderId: "75200515677",
  appId: "1:75200515677:web:cb400fe932b772dbc7c7b4",
  measurementId: "G-SXKJ5PY10C"
};

// Kiểm tra Firebase App đã khởi tạo hay chưa
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Khởi tạo Firebase Auth với AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Khởi tạo Firestore
const db = getFirestore(app);

export { auth, db };
