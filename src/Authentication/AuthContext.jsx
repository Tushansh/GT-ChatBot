import { createContext, useContext, useEffect, useState } from "react";
import { auth, signInWithPopup, googleProvider, signOut, registerUser, loginUser } from "./firebase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  };

  const registerWithEmail = async (email, password) => {
    try {
      await registerUser(email, password);
    } catch (error) {
      console.error("Signup Error:", error.message);
    }
  };

  const loginWithEmail = async (email, password) => {
    try {
      await loginUser(email, password);
    } catch (error) {
      console.error("Login Error:", error.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loginWithGoogle, registerWithEmail, loginWithEmail, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
