import React from 'react';

const Landing = () => {
  const industrialTexture = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80";

  return (
    <div className="min-h-screen bg-black text-[#e3d5ba] antialiased font-sans flex flex-col justify-between relative px-6 md:px-12 selection:bg-[#51432d] selection:text-white">

      {/* Navigation Header */}
      <header className="w-full max-w-[1440px] mx-auto pt-9 pb-4 flex justify-between items-baseline z-20">
        <div className="text-[26px] font-black tracking-[0.22em] text-[#e3d5ba] font-mono select-none">
          SNAP
        </div>
        <nav className="flex gap-9 text-[18px] font-medium tracking-wider text-[#93856d]">
          <a href="#vision" className="hover:text-[#e3d5ba] transition-colors duration-200">Vision</a>
          <a href="#careers" className="hover:text-[#e3d5ba] transition-colors duration-200">Careers</a>
          <a href="#contact" className="hover:text-[#e3d5ba] transition-colors duration-200">Contact</a>
        </nav>
      </header>


      <main className="flex-1 flex flex-col justify-center items-center text-center z-10 py-16 max-w-4xl mx-auto w-full">

        <div className="w-[220px] h-[220px] mb-20 grid grid-cols-2 grid-rows-2 gap-[21px] select-none">

          <div className="relative w-full h-full">
            <div className="w-[48px] h-[48px] bg-[#51432d] absolute bottom-0 left-0 rounded-[1px]" />
            <div className="w-[48px] h-[48px] bg-[#51432d] absolute top-0 right-0 rounded-[1px]" />
          </div>

          {/* Top-Right Cluster (Solid Smooth Bronze) */}
          <div className="relative w-full h-full">
            <div className="w-[38px] h-[38px] bg-[#51432d] absolute top-0 left-0 rounded-[1px]" />
            <div className="w-[38px] h-[38px] bg-[#51432d] absolute bottom-0 right-0 rounded-[1px]" />
          </div>


          <div className="relative w-full h-full">
            <div
              className="w-[48px] h-[48px] absolute top-0 left-0 rounded-[1px] bg-cover bg-center mix-blend-lighten brightness-95 contrast-[1.15] sepia-[0.35]"
              style={{ backgroundImage: `url(${industrialTexture})` }}
            />
            <div
              className="w-[38px] h-[38px] absolute bottom-0 right-0 rounded-[1px] bg-cover bg-bottom mix-blend-lighten brightness-[0.85] contrast-[1.2] sepia-[0.35]"
              style={{ backgroundImage: `url(${industrialTexture})` }}
            />
          </div>

          {/* Bottom-Right Cluster (Organic Texture) */}
          <div className="relative w-full h-full">
            <div
              className="w-[38px] h-[38px] absolute bottom-0 left-0 rounded-[1px] bg-cover bg-top mix-blend-lighten brightness-[0.85] contrast-[1.2] sepia-[0.35]"
              style={{ backgroundImage: `url(${industrialTexture})` }}
            />
            <div
              className="w-[38px] h-[38px] absolute top-0 right-0 rounded-[1px] bg-cover bg-center mix-blend-lighten brightness-95 contrast-[1.15] sepia-[0.35]"
              style={{ backgroundImage: `url(${industrialTexture})` }}
            />
          </div>

        </div>

        {/* Hero Copy */}
        <h1 className="text-[34px] sm:text-[40px] md:text-[44px] font-normal tracking-tight leading-[1.22] text-[#e3d5ba] max-w-xl mx-auto mb-9">
          Physical automation <br />
          to transform industry <br />
          and <span className="text-[#a29171] font-normal">move the world.</span>
        </h1>

        {/* CTA */}
        <a
          href="#vision"
          className="group inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#e3d5ba] hover:text-white transition-colors duration-200"
        >
          Read vision
          <span className="inline-block transform group-hover:translate-x-1 transition-transform duration-200 text-sm font-normal">
            &rarr;
          </span>
        </a>
      </main>

      {/* Footer Spacer */}
      <footer className="w-full py-6 text-center opacity-0 pointer-events-none select-none">
        Spacer Layout Buffer
      </footer>

    </div>
  );
};

export default Landing;