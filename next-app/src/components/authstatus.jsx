"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";

export default function AuthStatus() {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  console.log(`User: ${user} Loading: ${loading} Error: ${error}`);

  useEffect(() => {
    if (loading) return; // Don't redirect while loading
    if (!user) {
      router.push("/signin"); // Redirect to sign-in page if no user
    }
  }, [user, loading, router]);

  return <></>;
}
