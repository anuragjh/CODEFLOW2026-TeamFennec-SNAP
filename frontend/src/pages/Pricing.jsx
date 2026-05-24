import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    createOrder,
    verifyPayment,
    checkEmailAvailability,
} from "../backend_apis/payment.js";

export default function PricingPage() {

    const navigate = useNavigate();

    const [selectedPlan, setSelectedPlan] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
    });

    const plans = [
        {
            name: "Core Monitor",
            price: 1299,
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
            price: 3999,
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
            price: null,
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


    useEffect(() => {

        const script = document.createElement("script");

        script.src = "https://checkout.razorpay.com/v1/checkout.js";

        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };

    }, []);


    const openPurchaseModal = (plan) => {

        if (!plan.price) {
            alert("Please contact sales for Enterprise plans.");
            return;
        }

        setSelectedPlan(plan);

        setIsModalOpen(true);
    };


    const handlePayment = async () => {

        try {

            if (!formData.name.trim()) {
                alert("Please enter your name");
                return;
            }

            if (!formData.email.trim()) {
                alert("Please enter your email");
                return;
            }

            setLoading(true);

            /*
             CHECK EMAIL
            */
            const emailCheck =
                await checkEmailAvailability(formData.email);

            if (!emailCheck.allowed) {

                alert(
                    "This email is already used. Please use another email."
                );

                setLoading(false);

                return;
            }

            /*
             CREATE ORDER
            */
            const orderData = await createOrder({
                amount: selectedPlan.price,
                userName: formData.name,
                userEmail: formData.email,
            });

            /*
             RAZORPAY
            */
            const options = {

                key: orderData.key,

                amount: orderData.amount * 100,

                currency: "INR",

                name: "Budly",

                description: selectedPlan.name,

                order_id: orderData.orderId,

                prefill: {
                    name: formData.name,
                    email: formData.email,
                },

                theme: {
                    color: "#c8ad86",
                },

                modal: {
                    ondismiss: function () {
                        setLoading(false);
                    },
                },

                handler: async function (response) {

                    try {

                        await verifyPayment({

                            orderId:
                                response.razorpay_order_id,

                            paymentId:
                                response.razorpay_payment_id,

                            signature:
                                response.razorpay_signature,

                            userName: formData.name,

                            userEmail: formData.email,

                            amount: selectedPlan.price,
                        });

                        alert("✅ Payment Successful");

                        setIsModalOpen(false);

                        navigate("/getstarted");

                    } catch (err) {

                        console.error(err);

                        alert(
                            "Payment verification failed"
                        );
                    } finally {

                        setLoading(false);
                    }
                },
            };

            const razorpay = new window.Razorpay(options);

            razorpay.open();

        } catch (error) {

            console.error(error);

            alert(
                error?.message ||
                "Something went wrong"
            );

            setLoading(false);
        }
    };


    return (

        <div className="min-h-screen bg-black text-[#fff7dd] px-6 md:px-10 py-20 overflow-hidden">

            {/* Background Blur */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#c8ad86]/10 blur-[140px] rounded-full" />

            {/* Hero */}
            <div className="relative max-w-5xl mx-auto text-center mb-24 z-10">

                <p className="uppercase tracking-[0.4em] text-[#c8ad86] text-xs mb-6">
                    AUTOMATIVE SMART FACTORY
                </p>

                <h1 className="text-5xl md:text-7xl font-light leading-tight tracking-tight mb-8">
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


            {/* Pricing */}
            <div className="relative grid md:grid-cols-3 gap-8 max-w-7xl mx-auto z-10">

                {plans.map((plan, index) => (

                    <div
                        key={index}
                        className={`group rounded-[32px] border p-10 transition-all duration-500 hover:-translate-y-3 backdrop-blur-xl ${
                            plan.highlighted
                                ? "border-[#c8ad86] bg-[#0b0b0b]"
                                : "border-[#232323] bg-[#070707]"
                        }`}
                    >

                        {plan.highlighted && (
                            <div className="mb-8 inline-flex items-center border border-[#c8ad86] bg-[#c8ad86]/10 px-4 py-2 rounded-full text-xs tracking-[0.2em] text-[#c8ad86]">
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
                                {plan.price
                                    ? `₹${plan.price.toLocaleString()}`
                                    : "Custom"}
                            </span>

                            <span className="text-gray-500 ml-2">
                                {plan.duration}
                            </span>
                        </div>

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

                        <button
                            onClick={() =>
                                openPurchaseModal(plan)
                            }
                            className={`w-full py-4 rounded-2xl text-sm tracking-[0.2em] uppercase transition-all duration-300 ${
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


            {/* MODAL */}
            {isModalOpen && (

                <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 px-4">

                    <div className="w-full max-w-md rounded-[32px] border border-[#2a2a2a] bg-[#090909] p-8">

                        <div className="flex items-center justify-between mb-8">

                            <div>
                                <h2 className="text-2xl font-light">
                                    Complete Purchase
                                </h2>

                                <p className="text-sm text-gray-500 mt-2">
                                    {selectedPlan.name}
                                </p>
                            </div>

                            <button
                                onClick={() =>
                                    setIsModalOpen(false)
                                }
                                className="text-gray-500 hover:text-white text-xl"
                            >
                                ✕
                            </button>
                        </div>


                        <div className="space-y-5">

                            <div>

                                <label className="text-sm text-gray-400 block mb-2">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            name: e.target.value,
                                        })
                                    }
                                    className="w-full bg-[#111] border border-[#222] rounded-2xl px-5 py-4 outline-none focus:border-[#c8ad86] transition"
                                />
                            </div>


                            <div>

                                <label className="text-sm text-gray-400 block mb-2">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            email: e.target.value,
                                        })
                                    }
                                    className="w-full bg-[#111] border border-[#222] rounded-2xl px-5 py-4 outline-none focus:border-[#c8ad86] transition"
                                />
                            </div>
                        </div>


                        <div className="mt-8 flex items-center justify-between mb-6">

                            <div>

                                <p className="text-sm text-gray-500">
                                    Total
                                </p>

                                <h3 className="text-3xl font-light">
                                    ₹{selectedPlan.price.toLocaleString()}
                                </h3>
                            </div>
                        </div>


                        <button
                            onClick={handlePayment}
                            disabled={loading}
                            className="w-full py-4 rounded-2xl bg-[#c8ad86] text-black uppercase tracking-[0.2em] text-sm hover:opacity-90 transition disabled:opacity-60"
                        >

                            {loading
                                ? "Processing..."
                                : "Proceed To Pay"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}