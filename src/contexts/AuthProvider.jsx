import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "./AuthContext";
import { getAuth } from "firebase/auth";
import {
  signUpWithEmail,
  signInWithEmail,
  signOutUser,
  signInWithGooglePopup,
  updateUserProfile,
  sendResetPasswordEmail,
  onAuthStateChangedListener,
} from "../firebase/auth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((u) => {
      setUser(
        u
          ? {
              displayName: u.displayName,
              email: u.email,
              photoURL: u.photoURL,
              uid: u.uid,
            }
          : null
      );
      setLoading(false);
    });

    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, []);

const signup = async (data = {}) => {
  try {
    setLoading(true);

    const cred = await signUpWithEmail(data);
    const freshUser = (cred && cred.user) || getAuth().currentUser;

    const mapped = {
      displayName: freshUser?.displayName || null,
      email: freshUser?.email || null,
      photoURL: freshUser?.photoURL || null,
      uid: freshUser?.uid,
    };

    setUser(mapped);
    toast.success("Registered successfully");
    return mapped;
  } catch (err) {
    console.error("Signup error:", err);
    toast.error(err?.message || "Signup failed");
    throw err;
  } finally {
    setLoading(false);
  }
};

  const login = async (data = {}) => {
    try {
      setLoading(true);
      const cred = await signInWithEmail(data);
      setUser(cred.user);
      toast.success("Login successful");
      return cred.user;
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err?.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await signOutUser();
      setUser(null);
      toast.success("Logged out");
    } catch (err) {
      console.error("Logout error:", err);
      toast.error(err?.message || "Logout failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const googleSignIn = async () => {
    try {
      setLoading(true);
      const cred = await signInWithGooglePopup();
      setUser(cred.user);
      toast.success("Signed in with Google");
      return cred.user;
    } catch (err) {
      console.error("Google sign-in error:", err);
      toast.error(err?.message || "Google sign-in failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async ({ displayName, photoURL } = {}) => {
    try {
      setLoading(true);
      await updateUserProfile({ displayName, photoURL });
      const updated = { ...(user || {}), displayName, photoURL };
      setUser(updated);
      toast.success("Profile updated");
      return updated;
    } catch (err) {
      console.error("Update profile error:", err);
      toast.error(err?.message || "Update failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email) => {
    try {
      setLoading(true);
      await sendResetPasswordEmail(email);
      toast.success(`Reset email sent to ${email}`);
      return true;
    } catch (err) {
      console.error("Reset password error:", err);
      toast.error(err?.message || "Reset failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signup,
        login,
        logout,
        googleSignIn,
        updateProfile,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
