import * as firebase from "firebase/app";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyBQSes_ECwHaryrF8vfsjVD_1wWf7cz8Wc",
  authDomain: "pqrs-9e8eb.firebaseapp.com",
  databaseURL: "https://pqrs-9e8eb.firebaseio.com",
  projectId: "pqrs-9e8eb",
  storageBucket: "pqrs-9e8eb.appspot.com",
  messagingSenderId: "998501066190",
  appId: "1:998501066190:web:0be1a2a2d5116d7c77b79f",
 // measurementId: "G-54PCTERKRM"
};

export const app = firebase.initializeApp(firebaseConfig);
