import React from "react";
import { AnimatedTestimonials } from "../components/AnimatedTestimonials.jsx";
import aman from "../assets/aman.jpeg";
import nandini from "../assets/nandini.jpeg";
import prachi from "../assets/prachi.jpeg";
import sridatri from "../assets/sridatri.jpeg";
import about_us from "../assets/about_us.jpeg";

const AboutUsPage = () => {

    const team = [
        {
            name: "Aman Jha",
            designation: "Backend / Systems",
            src: aman,
            quote: "Designing robust backend systems that keep industrial intelligence running reliably at scale.",
        },
        {
            name: "Sridatri Chakrabarti",
            designation: "Backend / Systems",
            src: sridatri,
            quote: "Building the core logic that transforms raw data into meaningful system intelligence.",
        },
        {
            name: "Prachi Bhosale",
            designation: "Frontend / UX",
            src: prachi,
            quote: "Crafting intuitive interfaces that make complex industrial systems feel simple and human.",
        },
        {
            name: "Nandini Paul",
            designation: "Frontend / UX",
            src: nandini,
            quote: "Designing seamless user experiences that bridge technology and real-world usability.",
        },
    ];

    return (
        <div className="bg-black text-[#d6c3a0] min-h-screen pt-36 md:pt-40 px-6 md:px-10">

            <div className="max-w-3xl mx-auto">

                <img
                    src={about_us}
                    alt="About Us"
                    className="w-full h-[300px] object-cover mb-8 brightness-[0.65]"
                />

                <h1 className="text-[44px] font-medium text-[#e3d5ba] mb-6">
                    About Us
                </h1>

                <div className="space-y-5 text-[14.5px] leading-[1.8] text-[#b9ab92] mb-12">

                    <p className="text-[16px] text-[#e3d5ba] leading-relaxed">
                        We believe innovation should not wait for graduation — it should begin the moment curiosity turns into action.
                    </p>

                    <p>
                        BUDLY is being built by students from St. Thomas College of Engineering and Technology, Kolkata, focused on solving real-world industrial problems using AI and computer vision.
                    </p>

                    <p>
                        What started as curiosity turned into a mission to make factories safer, smarter, and more aware of risks before they become failures.
                    </p>

                    <p>
                        We are still students, but we are building with intent, curiosity, and a belief that impactful systems can come from anywhere.
                    </p>

                </div>

                <section>

                    <div className="h-px bg-[#2d2d2d] mb-6" />

                    <h2 className="text-[22px] text-[#e3d5ba] mb-4">
                        Meet Our Team
                    </h2>

                    <p className="text-[14.5px] text-[#b9ab92] mb-8">
                        The people behind BUDLY — students building real-world industrial intelligence systems.
                    </p>

                    <AnimatedTestimonials testimonials={team} autoplay={true} />

                    <div className="h-px bg-[#2d2d2d] mb-6" />

                </section>

            </div>
        </div>
    );
};

export default AboutUsPage;