import firebase from 'firebase';

const firebaseConfig = {
	apiKey: 'AIzaSyBzbUvLZXSlODikRZp2X_brIMDI0hsKlHM',
	authDomain: 'imessage-clone-f3db3.firebaseapp.com',
	databaseURL: 'https://imessage-clone-f3db3.firebaseio.com',
	projectId: 'imessage-clone-f3db3',
	storageBucket: 'imessage-clone-f3db3.appspot.com',
	messagingSenderId: '1076017302170',
	appId: '1:1076017302170:web:11048ecd2231546b61ed23',
	measurementId: 'G-MTZHE9S4TY',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
