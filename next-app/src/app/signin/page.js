"use client";
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import ProfilesService from "@/services/profiles/profiles";
export default function SignIn() {
  const { loginWithGoogle, login } = useAuth();
  const [isInvalidCredentails, setIsInvalidCredentails] = useState(false);
  const router = useRouter();

  const handleSignInWithGoogle = async () => {
    try {
      const { uid, email, username } = await loginWithGoogle();
      await ProfilesService.createUserProfile(uid, email, username);
      router.push("/");
    } catch (e) {
      alert("Error signing in to account");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      await login(email, password);
      router.push("/");
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-credential":
          setIsInvalidCredentails(true);
          break;
        default:
          alert("Error signing into account");
          break;
      }
    }
  };

  return (
    <div className="mt-navbar pt-20 flex flex-col items-center">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Welcome back
            </h1>
            <button
              onClick={handleSignInWithGoogle}
              class="mx-auto px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
            >
              <img
                class="w-6 h-6"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                loading="lazy"
                alt="google logo"
              ></img>
              <span>Login with Google</span>
            </button>
            <div className="relative h-8 flex items-center justify-center">
              <div className="absolute border-t-2 border-gray-200 w-full"></div>
              <div className="absolute bg-white px-4 text-gray-600 font-semibold">
                or
              </div>
            </div>
            <form onSubmit={handleLogin} class="" action="#">
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required={true}
                ></input>
              </div>
              <div className="mt-4 md:mt-6">
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                ></input>
              </div>
              <div class="flex items-center justify-between mt-2">
                <a
                  href="#"
                  class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <div className="mt-2 h-8">
                {isInvalidCredentails && (
                  <span className="border border-red-300 rounded px-4 py-1 bg-red-50 text-sm text-red-500">
                    Incorrect email or password
                  </span>
                )}
              </div>
              <button
                type="submit"
                class="mt-2 w-full text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
              <p class="mt-4 text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <a
                  href="/signup"
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
