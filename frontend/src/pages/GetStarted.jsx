import React, { useState } from "react";

const GetStarted = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="min-h-screen flex items-center justify-center px-6">

            <div className="w-full max-w-md border border-[#e3d5ba]/10 bg-black/40 backdrop-blur-xl rounded-2xl p-8 shadow-2xl">

                <h1 className="text-4xl text-center tracking-wide text-[#e3d5ba]">
                    {isLogin ? "LOGIN" : "SIGN UP"}
                </h1>

                <p className="text-center text-[#93856d] mt-2 mb-8 tracking-widest text-sm uppercase">
                    {isLogin ? "Welcome back" : "Create your account"}
                </p>

                <form className="flex flex-col gap-5">

                    {!isLogin && (
                        <input
                            type="text"
                            placeholder="FULL NAME"
                            className="bg-transparent border border-[#e3d5ba]/20 p-3 text-[#e3d5ba] placeholder-[#93856d] outline-none tracking-widest uppercase"
                        />
                    )}

                    <input
                        type="email"
                        placeholder="EMAIL"
                        className="bg-transparent border border-[#e3d5ba]/20 p-3 text-[#e3d5ba] placeholder-[#93856d] outline-none tracking-widest uppercase"
                    />

                    <input
                        type="password"
                        placeholder="PASSWORD"
                        className="bg-transparent border border-[#e3d5ba]/20 p-3 text-[#e3d5ba] placeholder-[#93856d] outline-none tracking-widest uppercase"
                    />

                    <button
                        type="submit"
                        className="bg-[#e3d5ba] text-black py-3 tracking-widest uppercase hover:scale-[1.02] transition-all duration-300"
                    >
                        {isLogin ? "LOGIN" : "CREATE ACCOUNT"}
                    </button>
                </form>

                <div className="text-center mt-6 text-[#93856d] tracking-widest text-sm">
                    {isLogin ? (
                        <>
                            DON'T HAVE AN ACCOUNT?{" "}
                            <button
                                onClick={() => setIsLogin(false)}
                                className="text-[#e3d5ba]"
                            >
                                SIGN UP
                            </button>
                        </>
                    ) : (
                        <>
                            ALREADY HAVE AN ACCOUNT?{" "}
                            <button
                                onClick={() => setIsLogin(true)}
                                className="text-[#e3d5ba]"
                            >
                                LOGIN
                            </button>
                        </>
                    )}
                </div>

            </div>
        </div>
    );
};

export default GetStarted;