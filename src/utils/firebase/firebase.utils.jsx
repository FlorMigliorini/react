import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCDCQ1_5pHnS3TDaSLP51Hdielo3itjAss",
    authDomain: "react-clothing-db-bde18.firebaseapp.com",
    projectId: "react-clothing-db-bde18",
    storageBucket: "react-clothing-db-bde18.appspot.com",
    messagingSenderId: "354581287798",
    appId: "1:354581287798:web:bff98f49d815e5f6ea6057"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//class that get from Firebase Auth and connect to Google auth itself
const provider = new GoogleAuthProvider(); //to use I need to initialize a provider

//every time someone interacts with the provider, always force them to select an account
//Google configuration
provider.setCustomParameters({
    prompt: "select_account"
});//this provider is kind of instructions for the instance of provide (GoogleAithProvider())

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

//instantiate fireStore() to use it in order to access the database
export const db = getFirestore();

export const createUserDocFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userDocRef.exists());

    //if the user does not exist
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createAt = new Date(); //to know when the user is accessing

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createAt
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }
    return userDocRef;//if the user exist just return
}