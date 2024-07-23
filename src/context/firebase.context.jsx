import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, getDoc, doc, query, where, deleteDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


const FirebaseContext = createContext(null)



const firebaseConfig = {
  apiKey: "AIzaSyCpWRLftwG6JO5StMLl5ScuAINZ0ZQ_mt4",
  authDomain: "readrealm-dcc2c.firebaseapp.com",
  projectId: "readrealm-dcc2c",
  storageBucket: "readrealm-dcc2c.appspot.com",
  messagingSenderId: "863350889316",
  appId: "1:863350889316:web:62c3a2b03ef33d13777871"
};


const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp)
const firestore = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp)

const googleProvider = new GoogleAuthProvider();

export const useFirebase = () => useContext(FirebaseContext)

export const FirebaseProvider = (props) => {

    const [user, setUser] = useState(null)

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser(null)
            }
        })
    }, [])

    const signUpUserWithEmailAndPass = (email, password) => createUserWithEmailAndPassword(firebaseAuth, email, password)

    const signinUserWithEmailAndPass = (email, password) => signInWithEmailAndPassword(firebaseAuth, email, password)

    const signinWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider)

    console.log("user", user)

    const handleCreateNewListing = async (name, isbn, price, coverPic) => {

        const imageRef = ref(storage, `uploads/books/coverPic/${Date.now()}-${coverPic.name}`)

        console.log("imageRef ", imageRef)

        const uploadedCoverPic = await uploadBytes(imageRef, coverPic)

        console.log("adding files ")

        return await addDoc(collection(firestore, "books"), {
            name,
            isbn,
            price,
            imageURL: uploadedCoverPic.ref.fullPath,
            userID: user.uid,
            userEmail: user.email,
            displayName: user.displayName,
            profilPic: user.photoURL
        }
        )

    }

    const listAllBooks = () => {
        return getDocs(collection(firestore, "books"))

    }

    const getBooksByID = async (id) => {
        const docRef = doc(firestore, "books", id)
        const result = await getDoc(docRef)
        return result;
    }

    const getImageURL = (path) => {
        return getDownloadURL(ref(storage, path))
    }

    const placeOrder = async (bookID, quantity) => {
        const collectionRef = collection(firestore, "books", bookID, "orders")
        const result = await addDoc(collectionRef, {

            userID: user.uid,
            userEmail: user.email,
            displayName: user.displayName,
            profilPic: user.photoURL,
            quantity: Number(quantity),
        })

        return result;

    }

    const fetchMyBooks = async (userID) => {

        if (!user) return null
        const collectionRef = collection(firestore, "books")
        const q = query(collectionRef, where("userID", "==", userID))

        const result = await getDocs(q)

        console.log("query result", result)
        return result;
    }

    const getOrders = async (bookID) => {
        const collectionRef = collection(firestore, "books", bookID, "orders")       
        const result = await getDocs(collectionRef)
        console.log("order detailss", result)
        return result;
    }

    var isLoggedIn = user ? true : false

    const logout = () => {
        signOut(firebaseAuth)
            .then(() => {
                isLoggedIn = false;
                console.log("logged out")
            })
            .catch((error) => {
                console.log("error in loggin out")
            });
    }

    const deleteOrders = async(bookID, orderID) => {
        const docRef = doc(firestore, "books", bookID, "orders", orderID);
        await deleteDoc(docRef);
        console.log(`Order ${orderID} deleted successfully`);
        
    }

    return (
        <FirebaseContext.Provider value={{
            signUpUserWithEmailAndPass, signinUserWithEmailAndPass,
            signinWithGoogle,
            handleCreateNewListing,
            listAllBooks,
            getImageURL,
            isLoggedIn,
            getBooksByID,
            placeOrder,
            fetchMyBooks,
            user,
            getOrders,
            logout,
            deleteOrders,
            // OrderID
        }}>
            {props.children}
        </FirebaseContext.Provider>
    )
}