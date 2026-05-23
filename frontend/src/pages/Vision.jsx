import React, { useEffect, useRef } from "react";
import vision_asset from "../assets/vision.jpg"

const sections = [
    {
        number: "01",
        title: "From Monitoring to Intelligence",
        content:
            "Traditional factory systems are reactive. Cameras record, sensors collect values, and issues are often identified after disruption begins. SNAP transforms monitoring into intelligence through AI-powered computer vision and anomaly detection, helping factories identify risks before failures escalate.",
    },
    {
        number: "02",
        title: "Understanding the Factory Floor",
        content:
            "Every factory generates signals. Missing protective gear, unusual worker movement, abnormal machine vibration, rising temperatures, and unexpected sounds all reveal operational risk. SNAP combines computer vision and sensor intelligence to transform scattered signals into actionable awareness.",
    },
    {
        number: "03",
        title: "Predicting Before Failure",
        content:
            "Machine failures rarely happen without warning. Abnormal vibration, overheating, and unusual sound patterns often appear long before breakdown. SNAP continuously monitors these indicators to enable predictive maintenance and reduce downtime before operations are disrupted.",
    },
    {
        number: "04",
        title: "Human-Centered Safety",
        content:
            "Industrial intelligence should protect people first. SNAP improves workplace safety by monitoring PPE compliance, detecting worker falls, identifying unsafe movement, and recognizing hazardous situations in near real time. Technology becomes an additional layer of awareness where human attention alone is not enough.",
    },
    {
        number: "05",
        title: "The Future of Industrial Intelligence",
        content:
            "We envision factories that are not only automated, but intelligent. Environments capable of understanding risk, predicting failure, and continuously improving operational safety. The future of industry belongs to systems that detect problems before accidents happen.",
    },
];

function Vision() {

    const sectionRefs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(
                            "opacity-100",
                            "translate-y-0"
                        );

                        const line = entry.target.querySelector(".line-reveal");

                        if (line) {
                            line.classList.add("scale-x-100");
                        }
                    }
                });
            },
            { threshold: 0.15 }
        );

        sectionRefs.current.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="bg-black text-[#d6c3a0] min-h-screen pt-36 md:pt-40 px-6 md:px-10">

            <div className="max-w-3xl mx-auto">

                <img
                    src={vision_asset}
                    alt="Factory Vision"
                    className="w-full h-[280px] md:h-[340px] object-cover mb-8 brightness-[0.65]"
                />

                <h1 className="text-[44px] font-medium text-[#e3d5ba] mb-6">
                    Vision
                </h1>

                <div className="space-y-5 text-[14.5px] leading-[1.8] text-[#b9ab92] mb-12">
                    <p>
                        Factory floors power the industries that move the world,
                        yet behind productivity lie risks that often go unnoticed,
                        abnormal machine behavior, missing safety equipment,
                        overheating systems, and unsafe movement patterns.
                    </p>

                    <p>
                        At SNAP, we believe industries should not merely react to
                        problems. They should anticipate them. Through AI-powered
                        monitoring, computer vision, and intelligent anomaly detection,
                        SNAP enables factories to identify risks before accidents
                        happen and detect failures before operations stop.
                    </p>
                </div>

                <div className="space-y-10">
                    {sections.map((section, index) => (
                        <section
                            key={index}
                            ref={(el) => (sectionRefs.current[index] = el)}
                            className="opacity-0 translate-y-10 transition-all duration-1000 ease-out"
                        >
                            <div className="overflow-hidden mb-6">
                                <div className="line-reveal origin-left scale-x-0 transition-transform duration-[1200ms] ease-out h-px bg-[#2d2d2d]" />
                            </div>

                            <div className="flex justify-between items-start gap-4 mb-4">
                                <h2 className="text-[22px] leading-tight text-[#e3d5ba]">
                                    {section.title}
                                </h2>

                                <span className="text-[11px] text-[#7e7463] shrink-0">
                                    {section.number}
                                </span>
                            </div>

                            <p className="text-[14.5px] leading-[1.85] text-[#b9ab92]">
                                {section.content}
                            </p>
                        </section>
                    ))}
                </div>

                <div className="pt-16 pb-14 text-center">
                    <div className="w-full h-px bg-[#2d2d2d] mb-8" />

                    <h2 className="text-[38px] md:text-[46px] leading-tight text-[#b8a27c] font-medium">
                        “Every failure speaks first in silence. Intelligence is learning to hear it.”
                    </h2>

                    <p className="mt-3 text-[11px] uppercase tracking-[0.25em] text-[#746857]">
                        BUDLY VISION
                    </p>
                </div>

            </div>
        </div>
    );
}

export default Vision;