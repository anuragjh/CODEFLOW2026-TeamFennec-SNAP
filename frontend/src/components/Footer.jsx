import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full bg-black text-[#C5B39A] font-sans pb-8 pt-0 px-6 md:px-12 selection:bg-[#C5B39A] selection:text-black -mt-4">
            <div className="max-w-7xl mx-auto flex flex-col justify-between mt-0 pt-0">

                <div className="w-full flex justify-center items-center select-none overflow-hidden mt-0 pt-0">
                    <h1 className="text-[14vw] md:text-[16vw] font-black tracking-tighter leading-none text-[#C5B39A] font-mono uppercase">
                        BUDLY
                    </h1>
                </div>

                <div className="w-full grid grid-cols-2 md:grid-cols-5 gap-y-4 text-xs md:text-sm font-medium text-zinc-400 tracking-wide mt-8 border-t border-transparent">
                    <div className="text-zinc-500 order-5 md:order-1 col-span-2 md:col-span-1 pt-4 md:pt-0">
                        2026 © Budly
                    </div>
                    <div className="hover:text-white transition-colors duration-200 cursor-pointer order-1 md:order-2">
                        <a href="#contact">Contact</a>
                    </div>
                    <div className="hover:text-white transition-colors duration-200 cursor-pointer order-2 md:order-3">
                        <a href="https://x.com" target="_blank" rel="noopener noreferrer">
                            Follow on X
                        </a>
                    </div>
                    <div className="hover:text-white transition-colors duration-200 cursor-pointer order-3 md:order-4">
                        <a href="#careers">Careers</a>
                    </div>
                    <div className="hover:text-white transition-colors duration-200 cursor-pointer order-4 md:order-5 md:text-right">
                        <a href="#privacy">Privacy & Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;