/* eslint-disable react/prop-types */
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "./../Configs/FirebaseConfig";
// import useAxiosSecure from "../hooks/useAxiosSecure";
import axios from "axios";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loggedInUser, setLoggedInUser] = useState({});
  const [loading, setLoading] = useState(true);
  // const axiosSecure = useAxiosSecure();
  //google login
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //User with email and password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("user in the auth state changed", currentUser);
      setUser(currentUser);
      if (currentUser) {
        const url = `https://prism-pages-server.vercel.app/usersByEmail/${currentUser?.email}`;

        axios.get(url).then((res) => setLoggedInUser(res.data));
      }
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);
  const authentication = {
    user,
    setUser,
    loading,
    setLoading,
    googleLogin,
    logOut,
    createUser,
    signIn,
    loggedInUser,
    setLoggedInUser
  };
  return (
    <AuthContext.Provider value={authentication}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
