"use client";
import React, { useState } from "react";
import Router from "next/router";

const Page = () => {
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
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
