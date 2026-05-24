import React, {
    useEffect,
    useState,
} from "react";

import {
    Eye,
    EyeOff,
} from "lucide-react";

import {
    useNavigate,
} from "react-router-dom";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import {
    loginSuccess,
} from "../store/authSlice";

import {
    loginUser,
} from "../backend_apis/login.js";

const GetStarted = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { isAuthenticated } =
        useSelector((state) => state.auth);

    const [showPassword, setShowPassword] =
        useState(false);

    const [acceptedTerms, setAcceptedTerms] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [formData, setFormData] =
        useState({
            email: "",
            password: "",
        });

    useEffect(() => {

        if (isAuthenticated) {

            navigate(
                "/dashboard",
                {
                    replace: true,
                }
            );
        }

    }, [isAuthenticated, navigate]);

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        if (
            !emailRegex.test(
                formData.email
            )
        ) {

            setError(
                "Please enter a valid email address"
            );

            return;
        }

        if (
            !formData.password.trim()
        ) {

            setError(
                "Please enter your password"
            );

            return;
        }

        if (!acceptedTerms) {

            setError(
                "Please accept Terms & Conditions"
            );

            return;
        }

        try {

            setLoading(true);

            const response =
                await loginUser({

                    identifier:
                        formData.email,

                    password:
                        formData.password,
                });

            console.log(
                "LOGIN RESPONSE:",
                response
            );

            dispatch(
                loginSuccess({

                    token:
                        response.token,

                    deviceCodes:
                        response.deviceCodes || [],
                })
            );

            navigate(
                "/dashboard",
                {
                    replace: true,
                }
            );

        } catch (error) {

            console.error(
                "LOGIN FAILED:",
                error
            );

            setError(

                error?.message ||

                error?.error ||

                error?.data?.message ||

                error?.response?.data?.message ||

                "Login failed"
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center px-4 sm:px-6">

            <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-[#e3d5ba]/10 blur-[120px] rounded-full" />

            <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-[#e3d5ba]/5 blur-[100px] rounded-full" />

            <div className="relative z-10 w-full max-w-md border border-[#e3d5ba]/10 bg-[#050505]/90 backdrop-blur-2xl rounded-[32px] p-6 sm:p-8 shadow-[0_0_60px_rgba(227,213,186,0.06)]">

                <div className="mb-10 text-center">

                    <p className="uppercase tracking-[0.35em] text-[#93856d] text-xs mb-4">
                        Budly Access Portal
                    </p>

                    <h1 className="text-4xl sm:text-5xl font-light text-[#e3d5ba] tracking-tight">
                        Sign In
                    </h1>

                    <p className="text-[#93856d] text-sm mt-4 tracking-wide">
                        Access your industrial monitoring dashboard
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div>

                        <label className="block text-xs uppercase tracking-[0.25em] text-[#93856d] mb-3">
                            Email Address
                        </label>

                        <input
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email:
                                        e.target.value,
                                })
                            }
                            className="w-full bg-[#0c0c0c] border border-[#e3d5ba]/10 focus:border-[#e3d5ba]/40 rounded-2xl px-5 py-4 text-[#e3d5ba] placeholder-[#6f675b] outline-none transition-all duration-300"
                        />
                    </div>

                    <div>

                        <label className="block text-xs uppercase tracking-[0.25em] text-[#93856d] mb-3">
                            Password
                        </label>

                        <div className="relative">

                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Enter password"
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        password:
                                            e.target.value,
                                    })
                                }
                                className="w-full bg-[#0c0c0c] border border-[#e3d5ba]/10 focus:border-[#e3d5ba]/40 rounded-2xl px-5 py-4 pr-14 text-[#e3d5ba] placeholder-[#6f675b] outline-none transition-all duration-300"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#93856d] hover:text-[#e3d5ba] transition"
                            >
                                {showPassword ? (
                                    <EyeOff size={20} />
                                ) : (
                                    <Eye size={20} />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 pt-1">

                        <input
                            type="checkbox"
                            checked={acceptedTerms}
                            onChange={() =>
                                setAcceptedTerms(
                                    !acceptedTerms
                                )
                            }
                            className="mt-1 accent-[#e3d5ba] w-4 h-4"
                        />

                        <p className="text-xs leading-relaxed text-[#93856d]">

                            I agree to the{" "}

                            <span className="text-[#e3d5ba] hover:underline cursor-pointer">
                                Terms & Conditions
                            </span>

                            {" "}and privacy policy.
                        </p>
                    </div>

                    {error && (

                        <div className="border border-red-500/20 bg-red-500/10 rounded-2xl p-4 text-sm text-red-300 break-words">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={
                            loading ||
                            !acceptedTerms
                        }
                        className="w-full mt-2 bg-[#e3d5ba] text-black py-4 rounded-2xl tracking-[0.25em] uppercase text-sm font-medium hover:opacity-90 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                    >

                        {loading
                            ? "Authenticating..."
                            : "Sign In"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default GetStarted;