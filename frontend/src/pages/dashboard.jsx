import React, { useEffect, useRef, useState } from "react";

const Dashboard = () => {
    const videoRef = useRef(null);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: false,
                });

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.log("Camera permission denied:", err);
            }
        };

        startCamera();
    }, []);

    return (
        <div className="min-h-screen bg-black text-[#e3d5ba] relative">

            {/* TOP BAR */}
            <div className="flex justify-between items-center p-4 border-b border-[#e3d5ba]/10">
                <h1 className="tracking-widest">DASHBOARD</h1>

                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="space-y-1"
                >
                    <div className="w-6 h-[2px] bg-[#e3d5ba]"></div>
                    <div className="w-6 h-[2px] bg-[#e3d5ba]"></div>
                    <div className="w-6 h-[2px] bg-[#e3d5ba]"></div>
                </button>
            </div>
            
            {menuOpen && (
                <div className="fixed right-0 top-0 w-64 h-full bg-black border-l border-[#e3d5ba]/10 p-6 z-50">
                    <h2 className="mb-6">MENU</h2>

                    <p className="mb-4 cursor-pointer">Home</p>
                    <p className="mb-4 cursor-pointer">Settings</p>
                    <p className="mb-4 cursor-pointer">Logout</p>
                </div>
            )}


            <div className="flex flex-col justify-center items-center min-h-screen">

                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-[80%] max-w-3xl border border-[#e3d5ba]/20 rounded-xl"
                />

            </div>

        </div>
    );
};

export default Dashboard;