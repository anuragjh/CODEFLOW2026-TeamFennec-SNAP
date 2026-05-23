const features = [
    {
        name: "Fallen Worker Detection",
        category: "Computer Vision",
        description: "AI-powered camera monitoring detects fallen or unconscious workers in near real time and instantly triggers emergency alerts for faster response.",
        logo: "◉",
    },
    {
        name: "PPE Compliance Detection",
        category: "Safety Measure",
        description: "Continuously checks whether workers are wearing required safety gear such as helmets, safety jackets, and goggles using computer vision.",
        logo: "▣",
    },
    {
        name: "Fire & Smoke Detection",
        category: "Hazard Detection",
        description: "Detects fire, smoke, sparks, or abnormal heat signatures from factory environments to reduce risks and improve emergency response time.",
        logo: "✦",
    },
    {
        name: "Worker Presence Detection",
        category: "Monitoring",
        description: "Tracks worker movement and detects unauthorized presence in restricted or hazardous factory zones for improved workplace safety.",
        logo: "◎",
    },
    {
        name: "Abnormal Sound Detection",
        category: "Audio AI",
        description: "Uses microphones and AI audio models to identify unusual machine noises, vibrations, or mechanical abnormalities before breakdown occurs.",
        logo: "◌",
    },
    {
        name: "Machine Vibration Monitoring",
        category: "IoT Sensors",
        description: "Monitors unusual vibration patterns using simulated or sensor-based data to predict machine wear, imbalance, or potential failure.",
        logo: "≈",
    },
    {
        name: "Temperature & Heat Monitoring",
        category: "Sensors",
        description: "Tracks abnormal temperature rise and overheating in machinery to prevent equipment damage and operational shutdowns.",
        logo: "△",
    },
    {
        name: "Air Quality Monitoring",
        category: "Environment",
        description: "Detects poor air quality, gas leakage, dust concentration, or unsafe environmental conditions inside factory floors.",
        logo: "◍",
    },
    {
        name: "Instant Smart Alerts",
        category: "Real-Time AI",
        description: "Generates instant alerts, dashboard updates, and anomaly logs whenever unsafe behavior or abnormal machine activity is detected.",
        logo: "✧",
    },
];

function FeaturesGrid() {
    return (
        <section className="bg-black text-[#f2ead7] px-8 md:px-16 py-28">
            <div className="max-w-[1400px] mx-auto">
                <div className="mb-16">
                    <h2 className="text-[58px] md:text-[78px] font-semibold tracking-tight text-[#efe7d0] leading-none">
                        Features
                    </h2>

                    <p className="text-gray-400 mt-4 max-w-2xl text-lg">
                        AI-powered edge monitoring features designed to improve worker
                        safety, machine health, and anomaly detection in near real time.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-20">
                    {features.map((feature, index) => (
                        <div key={index}>
                            <div className="h-[360px] rounded-[28px] flex items-center justify-center
                                            bg-white/5 backdrop-blur-xl
                                            border border-white/10
                                            shadow-[0_8px_32px_rgba(255,255,255,0.05)]
                                            hover:bg-white/8
                                            hover:border-white/20
                                            hover:scale-[1.02]
                                            transition-all duration-300 overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
                                    <span className="relative z-10 text-[#efe7d0] text-6xl md:text-8xl font-medium">{feature.logo}</span>
                                </div>

                            <div className="mt-6">
                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                    <h3 className="text-[26px] md:text-[30px] font-medium text-white leading-tight">{feature.name}</h3>
                                    <span className="bg-[#161616] text-gray-300 text-xs px-3 py-1 rounded-full whitespace-nowrap">{feature.category}</span>
                                </div>

                                <p className="text-gray-300 text-[16px] leading-[1.5] max-w-[420px]">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="border-t border-[#222] mt-20"></div>
            </div>
        </section>
    );
}

export default FeaturesGrid;