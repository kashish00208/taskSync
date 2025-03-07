"use client";
import React, { useState } from "react";
import Router from "next/router";

const Page = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !username || !password || !role) {
      setMsg("All fields are required");
      console.log("All fields are required");
      return;
    }
    try {
      const res = await fetch("/auth/SignUp", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email, username, password, role }),
      });
      const data = await res.json();
      if (res.status === 201) {
        Router.push("/dashboard");
      } else {
        console.error(data.message);
      }
    } catch (error) {
      setMsg("Server error, try again later");
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
          <input
            type="text"
            id="role"
            value={role}
            placeholder="Enter your role"
            onChange={(e) => setRole(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
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

export default Page;
