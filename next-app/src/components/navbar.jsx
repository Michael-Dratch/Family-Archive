"use client";
import React, { useState } from "react";

export default function Navbar() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <div className="bg-white h-navbar flex items-center p-4 border-b border-gray-300 bg-opacity-95">
      <span className="font-bold text-xl text-teal-600">Family Archive</span>
    </div>
  );
}
