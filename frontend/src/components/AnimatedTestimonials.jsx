"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export const AnimatedTestimonials = ({ testimonials, autoplay = false }) => {
    const [active, setActive] = useState(0);

    const handleNext = () => {
        setActive((prev) => (prev + 1) % testimonials.length);
    };

    const handlePrev = () => {
        setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const isActive = (index) => index === active;

    useEffect(() => {
        if (autoplay) {
            const interval = setInterval(handleNext, 5000);
            return () => clearInterval(interval);
        }
    }, [autoplay]);

    const randomRotateY = () => Math.floor(Math.random() * 21) - 10;

    return (
        <div className="mx-auto max-w-3xl px-4 py-16 text-[#b9ab92]">
            <div className="relative grid grid-cols-1 gap-12 md:grid-cols-2">

                <div className="relative h-80 w-full">
                    <AnimatePresence>
                        {testimonials.map((t, index) => (
                            <motion.div
                                key={t.src}
                                initial={{
                                    opacity: 0,
                                    scale: 0.9,
                                    rotate: randomRotateY(),
                                }}
                                animate={{
                                    opacity: isActive(index) ? 1 : 0.4,
                                    scale: isActive(index) ? 1 : 0.95,
                                    rotate: isActive(index) ? 0 : randomRotateY(),
                                    zIndex: isActive(index) ? 50 : 10,
                                }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                                className="absolute inset-0"
                            >
                                <img
                                    src={t.src}
                                    alt={t.name}
                                    className="h-full w-full object-cover rounded-2xl brightness-[0.8]"
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <div className="flex flex-col justify-between">

                    <motion.div
                        key={active}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h3 className="text-xl text-[#e3d5ba] font-semibold">
                            {testimonials[active].name}
                        </h3>

                        <p className="text-sm text-[#7e7463]">
                            {testimonials[active].designation}
                        </p>

                        <p className="mt-6 text-[15px] leading-relaxed text-[#b9ab92]">
                            {testimonials[active].quote}
                        </p>
                    </motion.div>

                    <div className="flex gap-4 mt-10">
                        <button
                            onClick={handlePrev}
                            className="h-8 w-8 flex items-center justify-center rounded-full bg-[#1a1a1a] hover:bg-[#2a2a2a]"
                        >
                            <IconArrowLeft className="h-4 w-4 text-[#e3d5ba]" />
                        </button>

                        <button
                            onClick={handleNext}
                            className="h-8 w-8 flex items-center justify-center rounded-full bg-[#1a1a1a] hover:bg-[#2a2a2a]"
                        >
                            <IconArrowRight className="h-4 w-4 text-[#e3d5ba]" />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};