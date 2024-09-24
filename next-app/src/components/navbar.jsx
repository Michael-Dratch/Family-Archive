"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const router = useRouter();

  const handleLogoutClicked = async () => {
    try {
      await logout();
      router.push("/signin");
    } catch (e) {
      console.log("error logging out", e);
    }
  };

  useEffect(() => {}, []);
  return (
    <div className="bg-white h-navbar flex justify-between items-center py-4 px-8 border-b border-gray-300 bg-opacity-95">
      <span className="font-bold text-xl text-teal-600">Family Archive</span>
      <span
        className={`${
          currentUser ? "block" : "hidden"
        } text-gray-400 hover:text-gray-500 hover:cursor-pointer font-semibold`}
        onClick={handleLogoutClicked}
      >
        Logout
      </span>
    </div>
  );
}
