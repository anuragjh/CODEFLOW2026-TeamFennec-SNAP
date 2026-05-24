import React from 'react';

const Landing = () => {
  const industrialTexture = "https://images.unsplash.com/photo-1716191300020-b52dec5b70a8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (

      <div
          className="min-h-screen bg-black text-[#e3d5ba] antialiased flex flex-col justify-between relative px-6 md:px-12 selection:bg-[#51432d] selection:text-white"
          style={{
            backgroundImage: `url(${industrialTexture})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'soft-light'
          }}
      >

        <main className="flex-1 flex flex-col justify-center items-center text-center z-10 py-16 max-w-4xl mx-auto w-full">


          <div className="w-[224px] h-[224px] mb-20 grid grid-cols-2 grid-rows-2 gap-[24px] select-none">

            <div className="relative w-full h-full">
              <div className="w-[58px] h-[58px] bg-[#51432d] absolute bottom-0 left-0 rounded-[1px]" />
              <div className="w-[58px] h-[58px] bg-[#51432d] absolute top-0 right-0 rounded-[1px]" />
            </div>

            <div className="relative w-full h-full">
              <div className="w-[58px] h-[58px] bg-[#51432d] absolute top-0 left-0 rounded-[1px]" />
              <div className="w-[58px] h-[58px] bg-[#51432d] absolute bottom-0 right-0 rounded-[1px]" />
            </div>

            <div className="relative w-full h-full">
              <div
                  className="w-[58px] h-[58px] absolute top-0 left-0 rounded-[1px] bg-cover bg-center mix-blend-lighten brightness-95 contrast-[1.15] sepia-[0.35]"
                  style={{ backgroundImage: `url(${industrialTexture})` }}
              />
              <div
                  className="w-[58px] h-[58px] absolute bottom-0 right-0 rounded-[1px] bg-cover bg-bottom mix-blend-lighten brightness-[0.85] contrast-[1.2] sepia-[0.35]"
                  style={{ backgroundImage: `url(${industrialTexture})` }}
              />
            </div>

            <div className="relative w-full h-full">
              <div
                  className="w-[58px] h-[58px] absolute bottom-0 left-0 rounded-[1px] bg-cover bg-top mix-blend-lighten brightness-[0.85] contrast-[1.2] sepia-[0.35]"
                  style={{ backgroundImage: `url(${industrialTexture})` }}
              />
              <div
                  className="w-[58px] h-[58px] absolute top-0 right-0 rounded-[1px] bg-cover bg-center mix-blend-lighten brightness-95 contrast-[1.15] sepia-[0.35]"
                  style={{ backgroundImage: `url(${industrialTexture})` }}
              />
            </div>

          </div>

          <h1 className="text-[34px] sm:text-[40px] md:text-[44px] font-normal tracking-tight leading-[1.22] text-[#e3d5ba] max-w-xl mx-auto mb-9">
            Physical automation <br />
            to transform industry <br />
            and <span className="text-[#a29171] font-normal">move the world.</span>
          </h1>

          <a
              href="/vision"
              className="group inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#e3d5ba] hover:text-white transition-colors duration-200"
          >
            Read vision
            <span className="inline-block transform group-hover:translate-x-1 transition-transform duration-200 text-sm font-normal">
            &rarr;
          </span>
          </a>
        </main>

        <footer className="w-full py-6 text-center opacity-0 pointer-events-none select-none">
          Spacer Layout Buffer
        </footer>

      </div>
  );
};

export default Landing;