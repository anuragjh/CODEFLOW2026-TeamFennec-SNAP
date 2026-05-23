import Home from "./pages/Home.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {

    return (
        <BrowserRouter>

            <Routes>
                <Route path="/" element={<Home />} />
                {/*<Route path="/shop" element={<Shop />} />*/}
                {/*<Route path="/aboutus" element={<AboutUs />} />*/}

                {/*<Route path="*" element={<NotFound />} />*/}
            </Routes>

        </BrowserRouter>
    );
}

export default App
