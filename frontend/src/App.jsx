import Home from "./pages/Home.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Vision from "./pages/Vision.jsx";
import Navbar from "./components/Navbar.jsx";
import React from "react";
import Footer from "./components/Footer.jsx";
import GetStarted from "./pages/GetStarted.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Pricing from "./pages/Pricing.jsx";
import Dashboard from "./pages/dashboard.jsx";


function App() {

    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/vision" element={<Vision />} />
                <Route path="/getstarted" element={<GetStarted />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/pricing" element={<Pricing />}/>
                {/*<Route path="/shop" element={<Shop />} />*/}
                {/*<Route path="*" element={<NotFound />} />*/}
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
}

export default App