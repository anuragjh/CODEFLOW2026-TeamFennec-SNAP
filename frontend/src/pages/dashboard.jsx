import React, { useEffect, useRef, useState } from "react";

const Dashboard = () => {
    const videoRef = useRef(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [videoStatus, setVideoStatus] = useState("Initializing...");

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

                setVideoStatus(" Camera ON");
            } catch (err) {
                console.log("Camera permission denied:", err);
                setVideoStatus(" Camera OFF");
            }
        };

        startCamera();
    }, []);

    const handleLogout = () => {
        alert("Logged out!");
    };

    return (
        <div className="min-h-screen bg-black text-[#e3d5ba] relative">

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
                <div
                    className="absolute right-0 top-0 w-64 h-full bg-black border-l border-[#e3d5ba]/10 p-6 flex flex-col justify-between"
                >
                    <div>
                        <h2 className="mb-6 text-lg">MENU</h2>

                        <p className="mb-4 cursor-pointer">Home</p>
                        <p className="mb-4 cursor-pointer">Settings</p>
                        <p className="mb-4 cursor-pointer">Profile</p>

                        <button
                            onClick={handleLogout}
                            className="mt-4 px-3 py-2 border border-red-400 text-red-400 w-full"
                        >
                            Logout
                        </button>
                    </div>

                    <button className="w-full py-3 border border-[#e3d5ba]">
                        Chatbot
                    </button>
                </div>
            )}

            <div className="flex flex-col justify-center items-center h-[90vh]">

                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-[80%] max-w-3xl border border-[#e3d5ba]/20 rounded-xl"
                />

                <div className="mt-4 px-4 py-2 border border-[#e3d5ba]/20 rounded-lg text-sm">
                    {videoStatus}
                </div>

            </div>

        </div>
    );
};

export default Dashboard;