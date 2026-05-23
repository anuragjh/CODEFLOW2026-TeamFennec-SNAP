import React from 'react';

const Landing = () => {

  const industrialTexture = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80";

  return (
    <div className="min-h-screen bg-black text-[#E8DCC4] font-sans flex flex-col justify-between relative overflow-hidden select-none">


      <header className="w-full max-w-7xl mx-auto px-8 py-6 flex justify-between items-center z-10">

        <div className="text-xl font-black tracking-[0.2em] text-[#E8DCC4]">
          ATOMS
        </div>


        <nav className="flex gap-8 text-sm font-medium tracking-wide text-[#A69B85]">
          <a href="#vision" className="hover:text-[#E8DCC4] transition-colors duration-300">Vision</a>
          <a href="#careers" className="hover:text-[#E8DCC4] transition-colors duration-300">Careers</a>
          <a href="#contact" className="hover:text-[#E8DCC4] transition-colors duration-300">Contact</a>
        </nav>
      </header>


      <main className="flex-1 flex flex-col justify-center items-center text-center px-4 z-10 my-12">


        <div className="w-48 h-48 mb-12 grid grid-cols-2 grid-rows-2 gap-5 relative">


          <div className="relative w-full h-full">
            <div className="w-10 h-10 bg-[#534632] absolute bottom-0 left-0 rounded-sm" />
            <div className="w-10 h-10 bg-[#534632] absolute top-0 right-0 rounded-sm" />
          </div>


          <div className="relative w-full h-full">
            <div className="w-10 h-10 bg-[#534632] absolute top-0 left-0 rounded-sm" />
            <div className="w-10 h-10 bg-[#534632] absolute bottom-0 right-0 rounded-sm" />
          </div>


          <div className="relative w-full h-full">
            <div
              className="w-10 h-10 absolute top-0 left-0 rounded-sm bg-cover bg-center brightness-90 contrast-125 sepia-[0.4] hue-rotate-[15deg]"
              style={{ backgroundImage: `url(${industrialTexture})` }}
            />
            <div
              className="w-10 h-10 absolute bottom-0 right-0 rounded-sm bg-cover bg-bottom brightness-75 contrast-125 sepia-[0.4] hue-rotate-[15deg]"
              style={{ backgroundImage: `url(${industrialTexture})` }}
            />
          </div>


          <div className="relative w-full h-full">
            <div
              className="w-10 h-10 absolute bottom-0 left-0 rounded-sm bg-cover bg-top brightness-75 contrast-125 sepia-[0.4] hue-rotate-[15deg]"
              style={{ backgroundImage: `url(${industrialTexture})` }}
            />
            <div
              className="w-10 h-10 absolute top-0 right-0 rounded-sm bg-cover bg-center brightness-90 contrast-125 sepia-[0.4] hue-rotate-[15deg]"
              style={{ backgroundImage: `url(${industrialTexture})` }}
            />
          </div>

        </div>

        
        <h1 className="text-4xl md:text-5xl lg:text-5xl font-light tracking-tight max-w-2xl leading-[1.25] text-[#EADEC9] mb-8">
          Physical automation <br />
          to transform industry <br />
          and <span className="text-[#BAA783] font-normal">move the world.</span>
        </h1>


        <a
          href="#vision"
          className="group flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#EADEC9] font-medium hover:text-white transition-colors duration-300 mt-2"
        >
          Read vision
          <span className="transform group-hover:translate-x-1 transition-transform duration-300 text-sm">→</span>
        </a>
      </main>


      <footer className="w-full py-6 text-center opacity-0 pointer-events-none">
        Spacer
      </footer>

    </div>
  );
};

export default Landing;