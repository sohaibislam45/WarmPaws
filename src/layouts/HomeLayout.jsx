import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function HomeLayout({ hero }) {
  return (
    <>
      <Navbar />
      {hero ? (
        <div className="bg-linear-to-b from-amber-50 to-white py-8">
          {hero}
        </div>
      ) : null}
      <main className="container mx-auto px-4 md:px-6 py-8">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
