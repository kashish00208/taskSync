"use client";
import React, { useState } from "react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !username || !password ) {
      setMsg("All fields are required");
      console.log("All fields are required");
      return;
    }
    try {
      const res = await fetch("/api/SignUp", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      });
      if(!res.ok){
        const errorText = await res.text();
        throw new Error(`API server error : ${errorText}`)
      }
      const data = await res.json();
      if (res.status === 201) {
        console.log("SignUp proceeded")
      } else {
        console.error("Error while signup process" + data.message);
      }
    } catch (error) {
      setMsg("Server error, try again later"+error);
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-slate-100 to-indigo-600 flex justify-center items-center">
      <div className="bg-white p-8 rounded-3xl shadow-lg w-96">
        <p className="text-lg font-semibold text-center mb-4">CREATE ACCOUNT</p>
        {msg && <p className="text-red-500 text-sm text-center mb-4">{msg}</p>}
        <form onSubmit={handleSubmitForm} className="space-y-4">
          <input
            type="email"
            id="email"
            value={email}
            placeholder="Enter the email ID"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            id="username"
            value={username}
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="password"
            id="password"
            value={password}
            placeholder="Enter the Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
         
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
