import React, { useState } from "react";

const Dashboard = () => {
    const [videoAvailable, setVideoAvailable] = useState(true);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([
        {
            role: "assistant",
            text: "Budly AI connected.",
        },
    ]);

    const [stats] = useState({
        people: 3,
        peopleDanger: "NO",
        accessoriesDanger: "YES",
        accessories: "2/4",
    });

    const sendMessage = () => {
        if (!message.trim()) return;

        setMessages((prev) => [
            ...prev,
            {
                role: "user",
                text: message,
            },
            {
                role: "assistant",
                text: "Processing request...",
            },
        ]);

        setMessage("");
    };

    return (
        <div className="min-h-screen bg-black text-[#e3d5ba] p-3 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto border border-[#2f2a24] rounded-[24px] sm:rounded-[36px] p-4 lg:p-6 bg-[#050505]">

                {/* Responsive Grid System */}
                <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 items-start">

                    {/* LEFT PANEL: Media & Diagnostics */}
                    <div className="space-y-6 w-full min-w-0">

                        {/* VIDEO STREAM CONTAINER */}
                        <div className="border border-[#2f2a24] rounded-[24px] sm:rounded-[30px] overflow-hidden bg-[#080808] h-[220px] sm:h-[320px] lg:h-[380px] relative w-full">
                            {videoAvailable ? (
                                <img
                                    src="http://192.168.31.155:8080/video"
                                    alt="Live Stream"
                                    className="w-full h-full object-cover"
                                    onError={() => setVideoAvailable(false)}
                                />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center text-center p-6">
                                    <p className="text-[#e3d5ba] text-lg sm:text-xl font-medium">
                                        No Video Available
                                    </p>
                                    <p className="text-[#746a5e] text-xs sm:text-sm mt-2">
                                        IP Camera stream unavailable
                                    </p>
                                </div>
                            )}

                            {/* Status Indicator Overlays */}
                            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-black/70 backdrop-blur-md border border-[#2f2a24] px-3 py-1.5 sm:px-4 sm:py-2 rounded-full">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                    <span className="text-[10px] sm:text-xs tracking-[0.25em] uppercase font-medium">
                                        Live
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* METRICS & STATS GRID */}
                        <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
                            {/* People Counter */}
                            <div className="border border-[#2f2a24] rounded-[20px] sm:rounded-[26px] bg-[#080808] p-4 sm:p-5 min-h-[120px] sm:min-h-[140px] flex flex-col justify-between">
                                <div className="text-[#7d7366] uppercase tracking-[0.15em] text-[10px] sm:text-xs">
                                    People
                                </div>
                                <div className="text-3xl sm:text-5xl font-light mt-2">
                                    {stats.people}
                                </div>
                            </div>

                            {/* People Safety Status */}
                            <div className="border border-[#2f2a24] rounded-[20px] sm:rounded-[26px] bg-[#080808] p-4 sm:p-5 min-h-[120px] sm:min-h-[140px] flex flex-col justify-between">
                                <div className="text-[#7d7366] uppercase tracking-[0.15em] text-[10px] sm:text-xs">
                                    People Danger
                                </div>
                                <div className={`text-2xl sm:text-4xl font-light mt-2 ${
                                    stats.peopleDanger === "YES" ? "text-red-400" : "text-green-400"
                                }`}>
                                    {stats.peopleDanger}
                                </div>
                            </div>

                            {/* Accessories Tracked */}
                            <div className="border border-[#2f2a24] rounded-[20px] sm:rounded-[26px] bg-[#080808] p-4 sm:p-5 min-h-[120px] sm:min-h-[140px] flex flex-col justify-between">
                                <div className="text-[#7d7366] uppercase tracking-[0.15em] text-[10px] sm:text-xs">
                                    Accessories
                                </div>
                                <div className="text-3xl sm:text-5xl font-light mt-2">
                                    {stats.accessories}
                                </div>
                            </div>

                            {/* Accessories Threat Index */}
                            <div className="border border-[#2f2a24] rounded-[20px] sm:rounded-[26px] bg-[#080808] p-4 sm:p-5 min-h-[120px] sm:min-h-[140px] flex flex-col justify-between">
                                <div className="text-[#7d7366] uppercase tracking-[0.15em] text-[10px] sm:text-xs">
                                    Acc. Danger
                                </div>
                                <div className={`text-2xl sm:text-4xl font-light mt-2 ${
                                    stats.accessoriesDanger === "YES" ? "text-red-400" : "text-green-400"
                                }`}>
                                    {stats.accessoriesDanger}
                                </div>
                            </div>
                        </div>

                        {/* AUXILIARY AUDIO MODULE */}
                        <div className="border border-dashed border-[#2f2a24] rounded-[24px] sm:rounded-[30px] h-[110px] sm:h-[130px] bg-[#070707] flex items-center justify-center p-4">
                            <div className="text-center">
                                <p className="text-[#e3d5ba] uppercase tracking-[0.25em] text-xs sm:text-sm font-medium">
                                    Audio Module
                                </p>
                                <p className="text-[#746a5e] text-xs sm:text-sm mt-1.5">
                                    Reserved for future voice controls
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT PANEL: Conversational Interface */}
                    <div className="border border-[#2f2a24] rounded-[24px] sm:rounded-[30px] bg-[#080808] flex flex-col h-[500px] sm:h-[600px] lg:h-[calc(100vh-120px)] lg:min-h-[680px] w-full overflow-hidden">

                        {/* Header Context */}
                        <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-[#1b1b1b] bg-[#0a0a0a]">
                            <h2 className="text-xl sm:text-2xl font-light">
                                Budly AI
                            </h2>
                            <p className="text-[#7d7366] text-xs sm:text-sm mt-0.5">
                                Industrial monitoring assistant
                            </p>
                        </div>

                        {/* Chat Feed (Now with active responsive scrolling) */}
                        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 custom-scrollbar">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`max-w-[85%] px-4 py-2.5 sm:py-3 rounded-[16px] sm:rounded-2xl text-xs sm:text-sm leading-relaxed break-words ${
                                        msg.role === "user"
                                            ? "bg-[#e3d5ba] text-black ml-auto rounded-tr-none"
                                            : "bg-[#121212] text-[#e3d5ba] border border-[#1b1b1b] rounded-tl-none"
                                    }`}
                                >
                                    {msg.text}
                                </div>
                            ))}
                        </div>

                        {/* Input Deck */}
                        <div className="p-3 sm:p-4 border-t border-[#1b1b1b] bg-[#060606]">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <input
                                    type="text"
                                    placeholder="Ask Budly AI..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            sendMessage();
                                        }
                                    }}
                                    className="flex-1 bg-[#090909] border border-[#222] rounded-xl sm:rounded-2xl px-4 py-2.5 sm:px-5 sm:py-3 outline-none text-xs sm:text-sm text-[#e3d5ba] placeholder-[#5c544b] focus:border-[#e3d5ba]/40 transition w-full"
                                />
                                <button
                                    onClick={sendMessage}
                                    className="bg-[#e3d5ba] text-black font-medium text-xs sm:text-sm px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl hover:bg-[#d4c5aa] active:scale-95 transition-all shrink-0"
                                >
                                    Send
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;