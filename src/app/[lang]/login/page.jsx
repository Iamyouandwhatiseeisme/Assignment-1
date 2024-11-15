"use client";
import { useState } from "react";
import { login, signup } from "./actions";
import { useLocale } from "../../components/providers/LanguageContext";
import InformationBoard from "../../components/InformationBoard/InformationBoard";
import InformationBoardOptions from "../../components/InformationBoard/InformationBoardOptions";
// import { useUser } from "../providers/UserContext/UserProvider";

export const LogIn = () => {
  const { locale } = useLocale();

  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const actionType = e.nativeEvent.submitter.name;

    let result;
    if (actionType === "login") {
      result = await login(formData, locale);
      //   setCurrentUser("user");
    } else if (actionType === "signup") {
      result = await signup(formData, locale);
      alert("confirmation email sent");
    }

    if (result?.error) {
      setError(result.error);
      alert(result.error);
    } else {
      setError(null);
    }
  }
  return (
    <div className="flex fixed z-50 w-full h-full top-0 flex-row">
      <div className="bg-gym-background w-1/2 z-10 relative ">
        <div className=" bg-black inset-0 z-40 absolute bg-opacity-80">
          <div className="absolute shadow-inner hover:scale-105 cursor-pointer shadow-white z-50 top-1/4 left-1/4 border gap-4 border-black w-1/2 h-1/4 rounded-2xl bg-teal-300 flex flex-col justify-center items-center">
            <img
              src="/images/Equipment Logo.jpg"
              alt="logo"
              className="rounded-md w-20 shadow-sm shadow-white"
            ></img>
            <div className="border border-black bg-black bg-opacity-80 rounded-md pr-4 pl-4 flex flex-col  shadow-black shadow-sm items-center">
              <h1 className=" z-40 text-white font-serif text-2xl">
                Welcome to Core Fitness
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="items-center justify-center flex flex-col w-1/2 h-full bg-black">
        <div className="items-center justify-center flex flex-col w-full h-full bg-yellow-500 bg-opacity-95 pt-10">
          <div className=" border  rounded-2xl w-1/2 h-1/2 flex flex-col items-center justify-center bg-white">
            <form
              className="flex flex-col gap-3 w-80 text-black "
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <div className="flex flex-row w-full justify-between">
                <input
                  id="email"
                  name="email"
                  className="text-black  rounded-lg border-solid border border-gray-200 w-full p-2 "
                  type="email"
                  placeholder="E-mail"
                  required
                />
              </div>
              <div className="flex flex-row w-full justify-between">
                <input
                  className="text-black    rounded-lg border-solid border border-gray-200 w-full p-2 "
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button
                name="login"
                type="submit"
                className="bg-blue-700 rounded-sm h-10 font-bold text-white"
              >
                Log In
              </button>
              <button
                name="signup"
                type="submit"
                className="bg-green-700 rounded-sm h-10 font-bold text-white"
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
