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
      const res = await fetch("/api/auth/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password, role }),
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
    <div>
      <div>
        <p>{msg}</p>
        <form onSubmit={handleSubmitForm}>
          <div className="">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="">
            <label htmlFor="role">Role</label>
            <input
              type="text"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Page;
