import Home from "./pages/Home.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Vision from "./pages/Vision.jsx";
import Navbar from "./components/Navbar.jsx";
import React from "react";
import Footer from "./components/Footer.jsx";
import GetStared from "./components/GetStarted.jsx";

function App() {

    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/vision" element={<Vision />} />
                <Route path="/getStarted" element={<GetStarted />} />
                {/*<Route path="/shop" element={<Shop />} />*/}
                {/*<Route path="/aboutus" element={<AboutUs />} />*/}

                {/*<Route path="*" element={<NotFound />} />*/}
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
}

export default App