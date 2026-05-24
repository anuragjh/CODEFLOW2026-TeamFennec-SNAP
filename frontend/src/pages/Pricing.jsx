import React from "react";

export default function PricingPage() {
    const plans = [
        {
            name: "Core Monitor",
            price: "₹12,999",
            duration: "/month",
            description:
                "Essential AI monitoring for modern industrial environments.",
            features: [
                "Factory Worker Safety Alerts",
                "Basic Abnormality Detection",
                "Machine Heat Tracking",
                "Incident Reports",
            ],
            highlighted: false,
        },
        {
            name: "Industrial AI",
            price: "₹39,999",
            duration: "/month",
            description:
                "Advanced AI-powered smart factory intelligence system.",
            features: [
                "Real-Time Safety Prediction",
                "AI Abnormality Detection",
                "Predictive Machine Analysis",
                "Danger Zone Detection",
            ],
            highlighted: true,
        },
        {
            name: "Enterprise Grid",
            price: "Custom",
            duration: "",
            description:
                "Large-scale monitoring infrastructure for multi-factory operations.",
            features: [
                "Unlimited Factory Integration",
                "Custom AI Models",
                "Centralized Monitoring",
                "24/7 Priority Support",
                "Industrial Risk Forecasting",
                "Private Cloud Deployment",
            ],
            highlighted: false,
        },
    ];

    return (
        <div className="min-h-screen bg-black text-[#fff7dd] px-8 py-20">


            <div className="max-w-5xl mx-auto text-center mb-24">

                <p className="uppercase tracking-[0.3em] text-[#c8ad86] text-sm mb-6">
                    AUTOMATIVE SMART FACTORY
                </p>

                <h1 className="text-6xl md:text-7xl font-light leading-tight tracking-tight mb-8">
                    AI Infrastructure
                    <br />
                    for Industrial Safety
                </h1>

                <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                    Predict abnormalities before failures happen.
                    Monitor worker safety in real time.
                    Build intelligent factory environments powered by AI.
                </p>
            </div>


            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">

                {plans.map((plan, index) => (
                    <div
                        key={index}
                        className={`rounded-[28px] border p-10 transition duration-300 hover:-translate-y-2 ${
                            plan.highlighted
                                ? "border-[#c8ad86] bg-[#0b0b0b]"
                                : "border-[#2a2a2a] bg-[#050505]"
                        }`}
                    >


                        {plan.highlighted && (
                            <div className="mb-8 inline-flex items-center border border-[#c8ad86] px-4 py-2 rounded-full text-xs tracking-[0.2em] text-[#c8ad86]">
                                MOST ADOPTED
                            </div>
                        )}


                        <h2 className="text-3xl font-light mb-4">
                            {plan.name}
                        </h2>

                        <p className="text-gray-500 text-sm leading-relaxed mb-10">
                            {plan.description}
                        </p>


                        <div className="mb-12">
              <span className="text-5xl font-light">
                {plan.price}
              </span>

                            <span className="text-gray-500 ml-2">
                {plan.duration}
              </span>
                        </div>

                        {/* Features */}
                        <div className="space-y-5 mb-14">
                            {plan.features.map((feature, i) => (
                                <div
                                    key={i}
                                    className="border-b border-[#1a1a1a] pb-4 text-sm tracking-wide text-gray-300"
                                >
                                    {feature}
                                </div>
                            ))}
                        </div>

                        {/* Button */}
                        <button
                            className={`w-full py-4 rounded-2xl text-sm tracking-[0.2em] uppercase transition ${
                                plan.highlighted
                                    ? "bg-[#c8ad86] text-black hover:opacity-90"
                                    : "border border-[#333] hover:border-[#c8ad86] hover:text-[#c8ad86]"
                            }`}
                        >
                            Purchase Access
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}