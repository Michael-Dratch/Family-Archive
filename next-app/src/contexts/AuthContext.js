"use client";
import React, { useContext, useState, createContext, useEffect } from "react";
import AuthService from "../services/auth/auth";

const AuthContext = createContext({});

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = AuthService.onAuthChanged(setCurrentUser, setLoading);
    return unsubscribe;
  }, []);

  const value = {
    ...AuthService,
    currentUser,
    loading,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
