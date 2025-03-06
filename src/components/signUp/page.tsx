"use client";
import React, { useState } from "react";
import Router from "next/router";
const page = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !username || !password || !role) {
      setMsg("All feilds are required");
      console.log("All feilds are required");
      return;
    }
    try {
      const res = fetch("/api/auht/signUp", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email, username, password, role }),
      });
      const data = await (await res).json();
      if ((await res).status === 201) {
        Router.push("/dashboard");
      } else {
        console.error(data.message);
      }
    } catch (error) {
      setMsg("Server error try again later");
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
            <label htmlFor="username">username</label>
            <input
              type="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="">
            <label htmlFor="password">password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="">
            <label htmlFor="role">role</label>
            <input
              type="role"
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

export default page;
