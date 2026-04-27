import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setInitializing(false);
    });

    return unsubscribe;
  }, []);

  const register = async (email, password) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", result.user.uid), {
      name: "",
      age: "",
      city: "",
      email: result.user.email,
      uid: result.user.uid,
    });

    return result;
  };

  const login = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
  };

  const getProfile = async () => {
    if (!auth.currentUser) return null;

    const userRef = doc(db, "users", auth.currentUser.uid);
    const snapshot = await getDoc(userRef);

    if (snapshot.exists()) {
      return snapshot.data();
    }

    return null;
  };

  const saveProfile = async (profileData) => {
    if (!auth.currentUser) throw new Error("Користувач не авторизований");

    const uid = auth.currentUser.uid;
    const userRef = doc(db, "users", uid);

    await setDoc(
      userRef,
      {
        uid,
        email: auth.currentUser.email,
        ...profileData,
      },
      { merge: true },
    );
  };

  const updateProfileData = async (profileData) => {
    if (!auth.currentUser) throw new Error("Користувач не авторизований");

    const uid = auth.currentUser.uid;
    const userRef = doc(db, "users", uid);

    await updateDoc(userRef, {
      ...profileData,
    });
  };

  const removeAccount = async (email, password) => {
    if (!auth.currentUser) throw new Error("Користувач не авторизований");

    const currentUser = auth.currentUser;

    const credential = EmailAuthProvider.credential(email, password);
    await reauthenticateWithCredential(currentUser, credential);

    await deleteDoc(doc(db, "users", currentUser.uid));
    await deleteUser(currentUser);
  };

  const value = useMemo(
    () => ({
      user,
      initializing,
      register,
      login,
      logout,
      resetPassword,
      getProfile,
      saveProfile,
      updateProfileData,
      removeAccount,
    }),
    [user, initializing],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
