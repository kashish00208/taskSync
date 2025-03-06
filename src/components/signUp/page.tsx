"use client";
import React from "react";

const page = () => {
  const handleinputchange = async (e: React.FormEvent) => {};
  return (
    <div>
      <div>
        <form onSubmit={handleinputchange}>
          <div>
            <input type="email" />
            <input type="text" />
            <input type="text" />
            <input type="text" />
          </div>
          <button type="submit"></button>
        </form>
      </div>
    </div>
  );
};

export default page;
