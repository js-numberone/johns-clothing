import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAgW90nJNohnCKqskW3_wXafJrYntUdcVA",
    authDomain: "clothing-db-292fa.firebaseapp.com",
    projectId: "clothing-db-292fa",
    storageBucket: "clothing-db-292fa.appspot.com",
    messagingSenderId: "169329344047",
    appId: "1:169329344047:web:308ab6a4c23942081c10da",
    measurementId: "G-J12ZKEBQZP"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get();
    if(!snapshot.exists){
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      }catch (error){
        console.log('error creating user', error.message);
      }
    }
    return userRef;
  } 

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
