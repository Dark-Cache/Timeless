import React from "react";
import "@fontsource/montserrat"; // Defaults to 400 weight
import "@fontsource/montserrat/700.css"; // Optional: bold
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";

// Pages
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import AllProducts from "./Pages/Allproducts/Allproducts";
import Collections from "./Pages/Collections/Collections";
import Footer from "./Components/Footer/Footer";
import Lookbook from "./Pages/Lookbook/Lookbook";

function App() {
  return (
    <BrowserRouter>
      {/* Navbar always visible */}
      <Navbar />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/allproduct" element={<AllProducts /> } />
        <Route path="/collection" element={<Collections />} />
        <Route path="/lookbook" element={<Lookbook />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
