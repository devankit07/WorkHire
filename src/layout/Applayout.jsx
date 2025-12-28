import Header from "@/components/Header";
import React from "react";
import { Outlet } from "react-router-dom";

const Applayout = () => {
  return (
    <div>
      <div className="grid-background"></div>
      <main className="min-h-screen container">
        <Header />
        <Outlet />
      </main>
      <div className="p-10 text-center bg-gray-900 mt-10">Made with ♥  by Ankit</div>
    </div>
  );
};

export default Applayout;
