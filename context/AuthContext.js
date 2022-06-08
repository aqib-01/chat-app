import { createContext, useEffect, useState, useContext } from "react";
import { firebaseAuth } from "../firebase/firebaseConfig";
import Head from "next/head";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import MainLoading from "../components/loading/MainLoading";

const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};
const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const signUp = (email, pwd) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, pwd);
  };
  const logIn = (email, pwd) => {
    return signInWithEmailAndPassword(firebaseAuth, email, pwd);
  };
  const logOut = () => {
    return signOut(firebaseAuth);
  };
  useEffect(() => {
    const unsub = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
      setUserLoading(false);
    });
    return () => unsub();
  }, []);
  const authContextValues = {
    currentUser,
    setCurrentUser,
    signUp,
    logIn,
    logOut,
  };
  
  return (
    <AuthContext.Provider value={authContextValues}>
      
      {userLoading ? <MainLoading /> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
