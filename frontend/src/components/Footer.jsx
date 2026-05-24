import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full bg-black text-[#C5B39A] font-sans px-6 py-12 md:px-16 md:py-20 selection:bg-[#C5B39A] selection:text-black overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col justify-between h-full">

                {/* Massive Hero Branding Header */}
                <div className="w-full flex justify-center items-center select-none pointer-events-none mb-12 md:mb-20">
                    <h1 className="text-[15vw] font-extrabold tracking-tighter leading-[0.8] text-[#C5B39A] font-mono uppercase text-center w-full mix-blend-difference">
                        BUDLY
                    </h1>
                </div>

                {/* Separator Line with Accent Subtle Glow */}
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#C5B39A]/30 to-transparent mb-8" />

                {/* Premium Navigation & Metadata Area */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 text-xs md:text-sm tracking-widest uppercase font-medium">

                    {/* Brand Meta / Copyright */}
                    <div className="text-zinc-500 order-2 md:order-1 font-mono normal-case tracking-normal">
                        &copy; {new Date().getFullYear()} Budly. All rights reserved.
                    </div>

                    {/* Interactive Navigation Links */}
                    <div className="flex flex-wrap items-center gap-x-8 gap-y-4 order-1 md:order-2 text-zinc-400">
                        <div className="relative group cursor-pointer">
                            <a href="#contact" className="group-hover:text-white transition-colors duration-300">Contact</a>
                            <span className="absolute -bottom-1 left-1/2 w-0 h-[1px] bg-[#C5B39A] transition-all duration-300 group-hover:w-full group-hover:left-0" />
                        </div>

                        <div className="relative group cursor-pointer">
                            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="group-hover:text-white transition-colors duration-300">
                                Follow on X
                            </a>
                            <span className="absolute -bottom-1 left-1/2 w-0 h-[1px] bg-[#C5B39A] transition-all duration-300 group-hover:w-full group-hover:left-0" />
                        </div>

                        <div className="relative group cursor-pointer">
                            <a href="#careers" className="group-hover:text-white transition-colors duration-300">Careers</a>
                            <span className="absolute -bottom-1 left-1/2 w-0 h-[1px] bg-[#C5B39A] transition-all duration-300 group-hover:w-full group-hover:left-0" />
                        </div>

                        <div className="relative group cursor-pointer">
                            <a href="#privacy" className="group-hover:text-white transition-colors duration-300">Privacy & Terms</a>
                            <span className="absolute -bottom-1 left-1/2 w-0 h-[1px] bg-[#C5B39A] transition-all duration-300 group-hover:w-full group-hover:left-0" />
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;