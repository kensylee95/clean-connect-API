"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInWithEmailAndPassword = exports.firebaseAuth = exports.firestoreDB = void 0;
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
const auth_1 = require("firebase/auth");
Object.defineProperty(exports, "signInWithEmailAndPassword", { enumerable: true, get: function () { return auth_1.signInWithEmailAndPassword; } });
const config_1 = require("../config");
//initialize the firebase SDK
const app = (0, app_1.initializeApp)(config_1.firebaseConfig);
//export services 
//firebase firestore
const firestoreDB = (0, firestore_1.getFirestore)(app);
exports.firestoreDB = firestoreDB;
const firebaseAuth = (0, auth_1.getAuth)(app);
exports.firebaseAuth = firebaseAuth;
