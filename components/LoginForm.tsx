import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import axios from "axios";
import { authActions } from "../store/auth-slice";
import { dispatchProfile } from "../store/auth-actions";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [warnings, setWarnings] = useState("");

  const backendServer = `${process.env.NEXT_PUBLIC_NODE_URL}/user/${
    isLogin ? "login" : "register"
  }`;

  const dispatch = useDispatch();

  async function submitHandler(e: any) {
    e.preventDefault();

    axios
      .post(backendServer, {
        email,
        password,
      })
      .then((response) => {
        dispatch(
          authActions.logIn({
            token: response.data.token,
            localId: response.data.user._id,
          })
        );
        dispatch(dispatchProfile(response.data.user));
      })
      .catch(function (error) {
        console.log(error.response);
        setWarnings(error.response.data.msg);
      });
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="w-full">
        <h3 className="text-center">
          {isLogin ? `Enter your login credentials!` : "Registration form"}
        </h3>
        <div className="flex flex-col place-items-center space-y-2 mt-8 px-8 ">
          <label className="text-left w-full text-sm font-semibold">
            Email
          </label>
          <input
            type="text"
            placeholder={"Enter Email"}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border-1 border-opacity-25 border-gray-400 rounded w-full px-3 py-2 focus focus:border-blue-600 focus:outline-none active:outline-none active:border-blue-600 focus:placeholder-blue-600"
          />

          <label className="text-left w-full text-sm font-semibold">
            Password
          </label>
          <input
            type="password"
            placeholder={"Enter password"}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border-1 border-opacity-25 border-gray-400 rounded w-full px-3 py-2 focus focus:border-blue-600 focus:outline-none active:outline-none active:border-blue-600 focus:placeholder-blue-600"
          />
          {warnings && <span className="text-sm text-red-600">{warnings}</span>}

          <div className="flex space-x-4">
            <button
              className="py-2 hover:cursor-pointer underline underline-offset-2 decoration-blue-500 text-blue-500 decoration-1"
              onClick={() => setIsLogin((prev) => !prev)}
              type="button"
            >
              {isLogin ? "Create new user" : "Login"}
            </button>
            <Button
              className="btn btn-secondary py-2 px-4 dark:bg-[#585B62]"
              type="submit"
            >
              {isLogin ? "Login" : "Register"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
