import React from 'react';

const Navbar = () => {
  return (

 <div>
<header className="w-full max-w-360 mx-auto pt-9 pb-4 flex justify-between items-baseline z-20">
<div className="text-[26px] font-black tracking-[0.22em] text-[#e3d5ba] font-mono select-none">
 SNAP
 </div>
 <nav className="flex gap-9 text-[18px] font-medium tracking-wider text-[#93856d]">
 <a href="#vision" className="hover:text-[#e3d5ba] transition-colors duration-200">Vision</a>
 <a href="#careers" className="hover:text-[#e3d5ba] transition-colors duration-200">Careers</a>
 <a href="#contact" className="hover:text-[#e3d5ba] transition-colors duration-200">Contact</a>
 </nav>
 </header>
 </div>
 );
};


export default Navbar;
