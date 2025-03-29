"use client";
import React, { useState } from "react";
import Router from "next/router";

const LoginIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setMsg("All fields are required");
      console.log("All fields are required");
      return;
    }

    try {
      const res = await fetch("/api/auth/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.status === 201) {
        Router.push("/dashboard");
      } else {
        setMsg(data.message || "An error occurred");
        console.error(data.message || "An error occurred");
      }
    } catch (error) {
      setMsg("Server error, please try again later.");
      console.error(error);
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-slate-100 to-indigo-600 flex justify-center items-center">
      <div className="bg-white p-8 rounded-3xl shadow-lg w-96">
        <p className="text-lg font-semibold text-center mb-4">LOGIN</p>
        {msg && <p className="text-red-500 text-sm text-center mb-4">{msg}</p>}
        <form onSubmit={handleSubmitForm} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginIn;
