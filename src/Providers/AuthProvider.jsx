import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from "../Firebase/firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app)




const AuthProvider = ({children}) => {
 const [user , setUser] = useState(null);
 const[loading ,setLoading] = useState(true);
 const googleProvider = new GoogleAuthProvider();

   const creteUser = (email,password) => {
    setLoading(true)
         return createUserWithEmailAndPassword(auth , email , password);
   }

   const signIn = (email,password) =>{
    setLoading(true)
    return signInWithEmailAndPassword(auth, email , password)
   }
   const googleSignIn = () =>{
    setLoading(true)
    return signInWithPopup(auth,googleProvider)
   }
   const logOut = () => {
    setLoading(true)
    return signOut(auth);
   }

   useEffect(() =>{
   const unsubscribe = onAuthStateChanged(auth,currentUser =>{
        setUser(currentUser);
        console.log('current user', currentUser);
        setLoading(false)
        if(currentUser &&  currentUser.email){
            const loggedUser ={
                email:currentUser.email
            }
            fetch('https://car-doctor-server-beta-olive.vercel.app/jwt',{
                method:'post',
                headers:{
                    'content-type' : 'application/json'
                },
                body:JSON.stringify(loggedUser)
            })
            .then(res => res.json())
            .then(data => {
                console.log('jwt response' , data);
                // warning Local storage is not the best
                localStorage.setItem('car-access-token', data.token);
                
            })
        }
        else{
            localStorage.removeItem('car-access-token');
        }
    });
    return () => {
        return unsubscribe();
    }
   },[])

    const authInfo = {
       user,
       loading,
       creteUser,
       signIn,
       googleSignIn,
       logOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;