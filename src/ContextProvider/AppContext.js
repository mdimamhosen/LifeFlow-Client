import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../Firebase/Firebase";
import axios from "axios";
import useAxiosOpen, { axiosOpen } from "../Hooks/useAxiosCommon";

export const AuthContext = createContext(null);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  const logOut = async () => {
    setLoading(true);
    localStorage.removeItem("token");
    await axiosOpen.get(`/logout`, {
      withCredentials: true,
    });
    console.log("Logged out");
    return await signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // Get token from localStorage
  const getToken = async (email) => {
    const { data } = await axiosOpen.post(`/jwt`, { email });
    console.log(data.token);
    localStorage.setItem("token", data.token);
  };

  // Save user data to database
  const saveUserData = async (user) => {
    const currentUser = {
      email: user?.email,
      name: user?.displayName,
      photo: user?.photoURL,
    };

    const { data } = await axiosOpen.put(`/user`, currentUser);
    return data;
  };

  // onAuthStateChanged
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
        await getToken(currentUser?.email);
        if (currentUser && currentUser?.displayName && currentUser?.photoURL) {
          await saveUserData(currentUser);
        } else {
          // Wait for the profile to be updated before saving user data
          const interval = setInterval(async () => {
            const updatedUser = auth.currentUser;
            if (
              updatedUser &&
              updatedUser?.displayName &&
              updatedUser?.photoURL
            ) {
              clearInterval(interval);
              await saveUserData(updatedUser);
            }
          }, 1000);
        }
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    resetPassword,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
