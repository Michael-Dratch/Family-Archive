"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import DbService from "@/services/db/db";
export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isEmailInUse, setIsEmailInUse] = useState(false);
  const [checkPassowrd, setCheckPassword] = useState(false);
  const { signup, loginWithGoogle } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (checkPassowrd) {
      validatePasswordMatch();
    }
  }, [password, confirmPassword]);

  const validatePasswordMatch = () => {
    setPasswordMatch(password === confirmPassword);
  };

  const handleSignInWithGoogle = async () => {
    try {
      const { email, username } = await loginWithGoogle();
      const profile = await DbService.createUserProfile(email, username);
      //router.push("/");
    } catch (e) {
      console.log("Error creating user account");
      console.log(e);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    validatePasswordMatch();
    setCheckPassword(true);
    if (password != confirmPassword) return;
    try {
      const userCredential = await signup(email, password);
      const profile = await DbService.createUserProfile(email, username);
      //router.push("/");
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setIsEmailInUse(true);
          break;
        default:
          console.log("Error creating new account", error);
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
              Create an account
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
              <span>Sign up with Google</span>
            </button>
            <div className="relative h-8 flex items-center justify-center">
              <div className="absolute border-t-2 border-gray-200 w-full"></div>
              <div className="absolute bg-white px-4 text-gray-600 font-semibold">
                or
              </div>
            </div>
            <form
              onSubmit={handleSubmit}
              class="space-y-4 md:space-y-6"
              action="#"
            >
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Full Name
                </label>
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  type="text"
                  name="name"
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Sam Sisenwine"
                  required={true}
                ></input>
              </div>
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required={true}
                ></input>
                {isEmailInUse && (
                  <span className="text-red-600">
                    An account with this email already exists
                  </span>
                )}
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  minLength={6}
                ></input>
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Password
                </label>
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  name="repeatpassword"
                  id="repeatpassword"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                ></input>
                {!passwordMatch && (
                  <span className="text-red-600">Password does not match</span>
                )}
              </div>
              <button
                type="submit"
                class="w-full text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-primary-800"
              >
                Sign up
              </button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <a
                  href="/signin"
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign in
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
