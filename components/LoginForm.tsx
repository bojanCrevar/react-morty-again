import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";

function LoginForm() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();

  function loginHandler(e: any) {
    e.preventDefault();
    if (!username) return;
    dispatch(authActions.login(username));
  }

  return (
    <form onSubmit={loginHandler}>
      <div className="w-full">
        <h3 className="text-center">Enter your login credentials!</h3>
        <div className="flex flex-col place-items-center space-y-2 mt-8 px-8 ">
          <label className="text-left w-full text-sm font-semibold">
            Username
          </label>
          <input
            type="text"
            placeholder={"Enter username"}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="border-1 border-opacity-25 border-gray-400 rounded w-full px-3 py-2 focus focus:border-blue-600 focus:outline-none active:outline-none active:border-blue-600 focus:placeholder-blue-600"
          />
          <label className="text-left w-full text-sm font-semibold">
            Password
          </label>
          <input
            type="password"
            placeholder={"Enter password"}
            className="border-1 border-opacity-25 border-gray-400 rounded w-full px-3 py-2 focus focus:border-blue-600 focus:outline-none active:outline-none active:border-blue-600 focus:placeholder-blue-600"
          />
        </div>
        <button type="submit">Login</button>
      </div>
    </form>
  );
}

export default LoginForm;
