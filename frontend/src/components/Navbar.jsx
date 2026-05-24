import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header
                className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out px-6 md:px-12
          ${
                    isScrolled
                        ? 'py-4 bg-black/40 backdrop-blur-xl border-b border-[#e3d5ba]/5 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
                        : 'py-8 bg-transparent border-b border-transparent'
                }
        `}
            >
                <div className="w-full max-w-[1440px] mx-auto flex justify-between items-center">

                    <Link
                        to="/"
                        className="group relative text-[24px] font-black tracking-[0.25em] text-[#e3d5ba] font-mono select-none overflow-hidden block"
                    >
            <span className="relative inline-block transition-transform duration-500 ease-out group-hover:-translate-y-full">
              BUDLY
            </span>

                        <span className="absolute left-0 top-0 inline-block transition-transform duration-500 ease-out translate-y-full group-hover:translate-y-0 text-white">
              BUDLY
            </span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-10 text-[14px] font-medium tracking-[0.15em] uppercase text-[#93856d]">
                        {[
                            { name: 'Vision', path: '/vision' },
                            { name: 'About us', path: '/aboutus' },
                            { name: 'Get Started', path: '/getStarted' },
                            { name: 'Pricing', path: '/pricing' }

                        ].map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className="relative py-2 transition-colors duration-300 ease-out hover:text-[#e3d5ba] group"
                            >
                                {item.name}

                                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#e3d5ba] scale-x-0 origin-right transition-transform duration-500 ease-out group-hover:scale-x-100 group-hover:origin-left" />
                            </Link>
                        ))}
                    </nav>

                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="relative md:hidden w-10 h-10 flex flex-col justify-center items-center rounded-full border border-[#e3d5ba]/10 bg-black/20 backdrop-blur-md transition-colors duration-300 hover:border-[#e3d5ba]/30 z-50 focus:outline-none"
                        aria-label="Toggle Navigation Menu"
                    >
                        <div className="relative w-5 h-4">
              <span
                  className={`absolute left-0 w-full h-[1.5px] bg-[#e3d5ba] transition-all duration-300 ease-out
                  ${isMobileMenuOpen ? 'top-2 rotate-45 bg-white' : 'top-0'}
                `}
              />

                            <span
                                className={`absolute left-0 w-full h-[1.5px] bg-[#e3d5ba] top-[7px] transition-opacity duration-200
                  ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}
                `}
                            />

                            <span
                                className={`absolute left-0 w-full h-[1.5px] bg-[#e3d5ba] transition-all duration-300 ease-out
                  ${isMobileMenuOpen ? 'bottom-1.5 -rotate-45 bg-white' : 'bottom-0'}
                `}
                            />
                        </div>
                    </button>
                </div>
            </header>

            <div
                className={`fixed inset-0 bg-black/95 backdrop-blur-2xl z-40 flex flex-col justify-center items-center transition-all duration-500 ease-in-out md:hidden
          ${
                    isMobileMenuOpen
                        ? 'opacity-100 pointer-events-auto'
                        : 'opacity-0 pointer-events-none translate-y-4'
                }
        `}
            >
                <nav className="flex flex-col gap-8 text-center">
                    {[
                        { name: 'Vision', path: '/vision' },
                        { name: 'Careers', path: '/careers' },
                        { name: 'Get Started', path: '/getstarted' },
                    ].map((item, index) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`text-[28px] font-light tracking-[0.2em] uppercase text-[#93856d] hover:text-[#e3d5ba] transition-colors duration-300 transition-transform duration-500 ease-out delay-[${index * 75}ms]
                ${
                                isMobileMenuOpen
                                    ? 'translate-y-0 opacity-100'
                                    : 'translate-y-8 opacity-0'
                            }
              `}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </div>
        </>
    );
};

export default Navbar;