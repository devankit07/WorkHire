import Header from "@/components/Header";
import React from "react";
import { Outlet } from "react-router-dom";

const Applayout = () => {
  return (
    <div>
      <div className="grid-background"></div>
      <main className="min-h-screen container mx-auto">
        <Header />
        <Outlet />
      </main>
      <div className="p-10 text-center dark:bg-gray-950 bg-slate-100 dark:text-white text-slate-600 mt-10 border-t border-slate-200 dark:border-transparent">
        Made with ♥ by Ankit
      </div>
    </div>
  );
};

export default Applayout;