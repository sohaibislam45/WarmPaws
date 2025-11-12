import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "./AuthContext";

// Import real Firebase helpers (replace mock helpers)
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

    return () => unsubscribe && unsubscribe();
  }, []);

  const persistUser = (u) => setUser(u);

  const signup = async (data = {}) => {
    try {
      setLoading(true);
      const cred = await signUpWithEmail(data);
      const u = cred.user;
      const mapped = {
        displayName: u.displayName,
        email: u.email,
        photoURL: u.photoURL,
        uid: u.uid,
      };
      persistUser(mapped);
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
      const u = cred.user;
      const mapped = {
        displayName: u.displayName,
        email: u.email,
        photoURL: u.photoURL,
        uid: u.uid,
      };
      persistUser(mapped);
      toast.success("Login successful");
      return mapped;
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
      persistUser(null);
      toast.success("Logged out");
      return true;
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
      const u = cred.user;
      const mapped = {
        displayName: u.displayName,
        email: u.email,
        photoURL: u.photoURL,
        uid: u.uid,
      };
      persistUser(mapped);
      toast.success("Signed in with Google");
      return mapped;
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
      persistUser(updated);
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
