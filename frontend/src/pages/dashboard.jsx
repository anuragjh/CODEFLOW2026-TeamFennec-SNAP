import React, {
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import {
    connectMQTT,
} from "../lib/mqttClient.js";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import {
    useNavigate,
} from "react-router-dom";

import {
    AlertTriangle,
    Flame,
    HardHat,
    LogOut,
    ShieldAlert,
    Thermometer,
    User,
    Users,
    Waves,
} from "lucide-react";

import {
    logout,
} from "../store/authSlice";

import {
    connectWebSocket,
} from "../backend_apis/ws.js";

const Dashboard = () => {

    const navigate =
        useNavigate();

    const dispatch =
        useDispatch();

    const {
        token,
        deviceCodes,
        isAuthenticated,
    } = useSelector(
        (state) => state.auth
    );

    const [audioAvailable, setAudioAvailable] =
    useState(true);

const [audioBars, setAudioBars] =
    useState(
        Array.from(
            { length: 24 },
            () => 10
        )
    );

useEffect(() => {

    const mqtt =
        connectMQTT({

            topic:
                "snap/sensor/data",

            onMessage:
                (message) => {

                    console.log(
                        "LIVE SENSOR:",
                        message
                    );

                    const sensorData =
                        message?.data;

                    if (
                        sensorData?.temperature !== undefined
                    ) {

                        setTemperature(
                            sensorData.temperature
                        );
                    }

                    if (
                        sensorData?.gas_data !== undefined
                    ) {

                        setGasLevel(
                            sensorData.gas_data
                        );
                    }

                    addLog(
                        "SENSOR",
                        JSON.stringify(
                            sensorData
                        )
                    );
                },
        });

    return () => {

        mqtt?.end();
    };

}, []);

useEffect(() => {

    let interval;

    const checkAudio =
        async () => {

            try {

                const response =
                    await fetch(
                        "http://192.168.31.155:8080/audio.wav",
                        {
                            method: "HEAD",
                        }
                    );

                setAudioAvailable(
                    response.ok
                );

            } catch {

                setAudioAvailable(
                    false
                );
            }
        };

    checkAudio();

    interval = setInterval(
        checkAudio,
        5000
    );

    return () =>
        clearInterval(
            interval
        );

}, []);

useEffect(() => {

    if (!audioAvailable) {

        return;
    }

    const waveformInterval =
        setInterval(() => {

            setAudioBars(

                Array.from(
                    { length: 24 },
                    () =>
                        Math.floor(
                            Math.random() * 90
                        ) + 10
                )
            );

        }, 120);

    return () =>
        clearInterval(
            waveformInterval
        );

}, [audioAvailable]);

    const [temperature, setTemperature] =
    useState("--");

const [gasLevel, setGasLevel] =
    useState("--");
    const [socketStatus, setSocketStatus] =
        useState("CONNECTING");

    const [liveData, setLiveData] =
        useState(null);

    const [videoAvailable, setVideoAvailable] =
        useState(true);

    const [logs, setLogs] =
        useState([]);

    const [dangerModal, setDangerModal] =
        useState(false);

    const [equipmentModal, setEquipmentModal] =
        useState(false);

    const liveMonitorRef =
        useRef(null);

    const addLog = (
        type,
        message
    ) => {

        const time =
            new Date()
                .toLocaleTimeString();

        setLogs((prev) => {

            const updated = [

                ...prev,

                {
                    time,
                    type,
                    message,
                },
            ];

            return updated.slice(-60);
        });
    };

    useEffect(() => {

        if (
            !isAuthenticated ||
            !token
        ) {

            navigate(
                "/getstarted",
                {
                    replace: true,
                }
            );

            return;
        }

        if (
            !deviceCodes ||
            deviceCodes.length === 0
        ) {

            addLog(
                "ERROR",
                "No devices found"
            );

            return;
        }

        const deviceCode =
            deviceCodes[0];

        const topic =
            `monitor/${deviceCode}`;

        let socket;

        const initializeSocket =
            async () => {

                try {

                    addLog(
                        "INFO",
                        `Connecting to ${topic}`
                    );

                    socket =
                        await connectWebSocket({

                            topic,

                            onOpen: () => {

                                setSocketStatus(
                                    "CONNECTED"
                                );

                                addLog(
                                    "SUCCESS",
                                    "Realtime monitoring active"
                                );
                            },

                            onMessage: (
                                data
                            ) => {

                                console.log(
                                    "LIVE DATA:",
                                    data
                                );

                                setLiveData(
                                    data
                                );

                                addLog(
                                    "LIVE",
                                    JSON.stringify(
                                        data
                                    )
                                );
                            },

                            onClose: (
                                event
                            ) => {

                                setSocketStatus(
                                    "DISCONNECTED"
                                );

                                addLog(
                                    "CLOSE",
                                    `Socket closed (${event.code})`
                                );
                            },

                            onError: () => {

                                setSocketStatus(
                                    "ERROR"
                                );

                                addLog(
                                    "ERROR",
                                    "Realtime websocket failed"
                                );
                            },
                        });

                } catch (error) {

                    setSocketStatus(
                        "ERROR"
                    );

                    addLog(
                        "ERROR",
                        error?.message ||
                        "Failed to connect"
                    );
                }
            };

        initializeSocket();

        return () => {

            if (socket) {

                socket.close();
            }
        };

    }, [
        token,
        deviceCodes,
        isAuthenticated,
        navigate,
    ]);

    const handleLogout =
        () => {

            dispatch(
                logout()
            );

            navigate(
                "/getstarted",
                {
                    replace: true,
                }
            );
        };

    const people =
        liveData?.people || [];

    const peopleCount =
        liveData?.ppl_number || 0;

    const hasDanger =
        people.some(
            (person) =>
                person.falling === "Y"
        );

    const hasFire =
        people.some(
            (person) =>
                person.fire === "Y"
        );

    const hasSmoke =
        people.some(
            (person) =>
                person.smoke === "Y"
        );

    const equipmentIssues =
        people.filter(
            (person) =>
                person.helmet_wearing === "N" ||
                person.goggle === "N"
        );

    const connectionLost =
        socketStatus !== "CONNECTED";

    const liveStatus =
        useMemo(() => {

            if (
                connectionLost
            ) {

                return "No connection to monitoring system";
            }

            if (hasFire) {

                return "Fire detected";
            }

            if (hasSmoke) {

                return "Smoke detected";
            }

            return "No fire or smoke detected";

        }, [
            connectionLost,
            hasFire,
            hasSmoke,
        ]);

    return (

        <div className="min-h-screen bg-black text-[#e3d5ba] px-4 md:px-8 py-6 overflow-hidden">

            <div className="max-w-7xl mx-auto border border-[#2b2721] rounded-[38px] p-4 md:p-6 bg-[#050505]">

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

                    <div>

                        <h1 className="text-4xl font-semibold tracking-tight">
                            Budly Monitor
                        </h1>

                        <p className="text-[#7d7366] mt-1">
                            Real-time industrial monitoring
                        </p>
                    </div>

                    <div className="flex items-center gap-3">

                        <div className="border border-[#2b2721] bg-[#0d0d0d] rounded-2xl px-4 py-3 flex items-center gap-3">

                            <div className="w-11 h-11 rounded-full bg-[#151515] flex items-center justify-center">

                                <User
                                    size={18}
                                />
                            </div>

                            <div>

                                <p className="font-medium">
                                    Admin
                                </p>

                                <p className="text-xs text-[#7d7366]">
                                    {deviceCodes?.[0]}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={
                                handleLogout
                            }
                            className="border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 transition-all duration-300 rounded-2xl px-5 py-3 flex items-center gap-2 text-red-300"
                        >

                            <LogOut
                                size={18}
                            />

                            Logout
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-[1.5fr_0.8fr] gap-6">

                    <div className="space-y-6">

                        <div className="border border-[#2b2721] rounded-[32px] overflow-hidden bg-[#090909] h-[300px] md:h-[420px] relative">

                            {videoAvailable ? (

                                <img
                                    src="http://192.168.31.155:8080/video"
                                    alt="Live Stream"
                                    className="w-full h-full object-cover"
                                    onError={() =>
                                        setVideoAvailable(false)
                                    }
                                />

                            ) : (

                                <div className="w-full h-full flex flex-col items-center justify-center text-center">

                                    <p className="text-2xl">
                                        No Video Feed
                                    </p>

                                    <p className="text-[#7d7366] mt-2">
                                        Camera system unavailable
                                    </p>
                                </div>
                            )}

                            <div className="absolute top-5 left-5 border border-[#2b2721] bg-black/70 backdrop-blur-xl rounded-full px-4 py-2 flex items-center gap-2">

                                <div className={`w-2 h-2 rounded-full ${
                                    socketStatus === "CONNECTED"
                                        ? "bg-green-500"
                                        : socketStatus === "ERROR"
                                        ? "bg-red-500"
                                        : "bg-yellow-500"
                                }`} />

                                <span className="uppercase tracking-[0.25em] text-xs">

                                    {socketStatus}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">

                            <div className="border border-[#2b2721] rounded-[28px] bg-[#090909] p-5 min-h-[170px] flex flex-col justify-between">

                                <div className="flex items-center justify-between">

                                    <span className="uppercase tracking-[0.2em] text-xs text-[#7d7366]">
                                        People
                                    </span>

                                    <Users
                                        size={18}
                                    />
                                </div>

                                <div className="text-6xl font-semibold">
                                    {peopleCount}
                                </div>
                            </div>

                            <button
                                onClick={() =>
                                    setDangerModal(
                                        true
                                    )
                                }
                                className={`border rounded-[28px] p-5 min-h-[170px] flex flex-col justify-between text-left transition-all duration-300 ${
                                    hasDanger
                                        ? "border-red-500/20 bg-red-500/10"
                                        : "border-[#2b2721] bg-[#090909]"
                                }`}
                            >

                                <div className="flex items-center justify-between">

                                    <span className="uppercase tracking-[0.2em] text-xs text-[#7d7366]">
                                        Danger
                                    </span>

                                    <ShieldAlert
                                        size={18}
                                    />
                                </div>

                                <div>

                                    <div className={`text-4xl font-semibold ${
                                        hasDanger
                                            ? "text-red-400"
                                            : "text-green-400"
                                    }`}>

                                        {hasDanger
                                            ? "Unsafe"
                                            : "Safe"}
                                    </div>

                                    <p className="text-xs mt-2 text-[#7d7366]">
                                        Tap to inspect safety
                                    </p>
                                </div>
                            </button>

                            <button
                                onClick={() =>
                                    setEquipmentModal(
                                        true
                                    )
                                }
                                className={`border rounded-[28px] p-5 min-h-[170px] flex flex-col justify-between text-left transition-all duration-300 ${
                                    equipmentIssues.length > 0
                                        ? "border-yellow-500/20 bg-yellow-500/10"
                                        : "border-[#2b2721] bg-[#090909]"
                                }`}
                            >

                                <div className="flex items-center justify-between">

                                    <span className="uppercase tracking-[0.2em] text-xs text-[#7d7366]">
                                        Equipments
                                    </span>

                                    <HardHat
                                        size={18}
                                    />
                                </div>

                                <div>

                                    <div className={`text-4xl font-semibold ${
                                        equipmentIssues.length > 0
                                            ? "text-yellow-300"
                                            : "text-green-400"
                                    }`}>

                                        {equipmentIssues.length > 0
                                            ? "Issues"
                                            : "Safe"}
                                    </div>

                                    <p className="text-xs mt-2 text-[#7d7366]">
                                        Tap to inspect equipment
                                    </p>
                                </div>
                            </button>

                            <div className={`border rounded-[28px] p-5 min-h-[170px] flex flex-col justify-between ${
                                hasFire || hasSmoke
                                    ? "border-red-500/20 bg-red-500/10"
                                    : "border-[#2b2721] bg-[#090909]"
                            }`}>

                                <div className="flex items-center justify-between">

                                    <span className="uppercase tracking-[0.2em] text-xs text-[#7d7366]">
                                        Fire & Smoke
                                    </span>

                                    <Flame
                                        size={18}
                                    />
                                </div>

                                <div>

                                    <div className={`text-2xl font-semibold leading-tight ${
                                        hasFire || hasSmoke
                                            ? "text-red-400"
                                            : "text-green-400"
                                    }`}>

                                        {liveStatus}
                                    </div>
                                </div>
                            </div>

                        <div className={`border rounded-[28px] p-5 min-h-[170px] flex flex-col justify-between ${
    Number(gasLevel) > 2500
        ? "border-red-500/20 bg-red-500/10"
        : "border-[#2b2721] bg-[#090909]"
}`}>

    <div className="flex items-center justify-between">

        <span className="uppercase tracking-[0.2em] text-xs text-[#7d7366]">
            Gas Levels
        </span>

        <Waves
            size={18}
        />
    </div>

    <div>

        <div className={`text-4xl font-semibold ${
            Number(gasLevel) > 2500
                ? "text-red-400"
                : "text-green-400"
        }`}>

            {gasLevel}
        </div>

        <p className="text-xs mt-3 text-[#7d7366]">

            {Number(gasLevel) > 2500
                ? "Dangerous gas concentration"
                : "Air quality stable"}
        </p>
    </div>
</div>
                          <div className={`border rounded-[28px] p-5 min-h-[170px] flex flex-col justify-between ${
    Number(temperature) > 45
        ? "border-orange-500/20 bg-orange-500/10"
        : "border-[#2b2721] bg-[#090909]"
}`}>

    <div className="flex items-center justify-between">

        <span className="uppercase tracking-[0.2em] text-xs text-[#7d7366]">
            Temperature
        </span>

        <Thermometer
            size={18}
        />
    </div>

    <div>

        <div className={`text-4xl font-semibold ${
            Number(temperature) > 45
                ? "text-orange-300"
                : "text-green-400"
        }`}>

            {temperature}°C
        </div>

        <p className="text-xs mt-3 text-[#7d7366]">

            {Number(temperature) > 45
                ? "High temperature detected"
                : "Temperature stable"}
        </p>
    </div>
</div>
                        </div>
<div className="border border-[#2b2721] rounded-[30px] h-[150px] bg-[#070707] px-6 py-5 overflow-hidden">

    <div className="flex items-center justify-between mb-5">

        <div>

            <p className="uppercase tracking-[0.3em] text-sm">
                Audio Module
            </p>

            <p className="text-[#7d7366] text-xs mt-1">

                {audioAvailable
                    ? "Realtime industrial audio monitoring"
                    : "Audio system unavailable"}
            </p>
        </div>

        <div className={`w-3 h-3 rounded-full ${
            audioAvailable
                ? "bg-green-500"
                : "bg-red-500"
        }`} />
    </div>

    {audioAvailable ? (

        <div className="h-[80px] flex items-center justify-center gap-[7px] overflow-hidden">

            {audioBars.map(
                (
                    height,
                    index
                ) => (

                    <div
                        key={index}
                        className="w-[2px] bg-[#3b9eff] rounded-full transition-all duration-100"
                        style={{
                            height: `${height}px`,
                        }}
                    />
                )
            )}
        </div>

    ) : (

        <div className="h-[80px] flex items-center justify-center text-[#7d7366]">

            No Audio Feed Available
        </div>
    )}
</div>

                    </div>

                    <div className="border border-[#2b2721] rounded-[32px] bg-[#090909] flex flex-col h-[1000px] overflow-hidden">

                        <div className="px-6 py-5 border-b border-[#171717]">

                            <h2 className="text-3xl font-semibold">
                                Live Monitor
                            </h2>

                            <p className="text-[#7d7366] mt-1">
                                Realtime websocket system logs
                            </p>
                        </div>

                        <div
                            ref={liveMonitorRef}
                            className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-4"
                        >

                            {logs.map(
                                (
                                    log,
                                    index
                                ) => (

                                    <div
                                        key={index}
                                        className={`rounded-3xl border p-4 ${
                                            log.type === "ERROR"
                                                ? "border-red-500/20 bg-red-500/10"
                                                : log.type === "SUCCESS"
                                                ? "border-green-500/20 bg-green-500/10"
                                                : log.type === "LIVE"
                                                ? "border-[#2b2721] bg-[#111111]"
                                                : "border-[#2b2721] bg-[#0d0d0d]"
                                        }`}
                                    >

                                        <div className="flex items-center justify-between mb-3">

                                            <span className="uppercase tracking-[0.2em] text-xs">

                                                {log.type}
                                            </span>

                                            <span className="text-xs opacity-60">

                                                {log.time}
                                            </span>
                                        </div>

                                        <pre className="text-xs whitespace-pre-wrap break-words leading-relaxed overflow-hidden">

                                            {log.message}
                                        </pre>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {dangerModal && (

                <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">

                    <div className="w-full max-w-3xl border border-[#2b2721] rounded-[32px] bg-[#080808] p-6 max-h-[90vh] overflow-y-auto">

                        <div className="flex items-center justify-between mb-6">

                            <h2 className="text-3xl font-semibold">
                                Danger Analysis
                            </h2>

                            <button
                                onClick={() =>
                                    setDangerModal(
                                        false
                                    )
                                }
                                className="text-[#7d7366]"
                            >
                                Close
                            </button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">

                            {people.length > 0 ? (

                                people.map(
                                    (
                                        person,
                                        index
                                    ) => (

                                        <div
                                            key={index}
                                            className={`border rounded-3xl p-5 ${
                                                person.falling === "Y"
                                                    ? "border-red-500/20 bg-red-500/10"
                                                    : "border-[#2b2721] bg-[#0d0d0d]"
                                            }`}
                                        >

                                            <div className="flex items-center justify-between mb-5">

                                                <h3 className="text-2xl font-semibold">

                                                    Person {
                                                        person.person_id
                                                    }
                                                </h3>

                                                <div className={`px-4 py-2 rounded-full text-sm ${
                                                    person.falling === "Y"
                                                        ? "bg-red-500/20 text-red-300"
                                                        : "bg-green-500/20 text-green-300"
                                                }`}>

                                                    {person.falling === "Y"
                                                        ? "Unsafe"
                                                        : "Safe"}
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between">

                                                <span>
                                                    Falling
                                                </span>

                                                <span className={
                                                    person.falling === "Y"
                                                        ? "text-red-400"
                                                        : "text-green-400"
                                                }>

                                                    {person.falling === "Y"
                                                        ? "Detected"
                                                        : "No"}
                                                </span>
                                            </div>
                                        </div>
                                    )
                                )

                            ) : (

                                <div className="text-[#7d7366]">
                                    No people detected
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {equipmentModal && (

                <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">

                    <div className="w-full max-w-4xl border border-[#2b2721] rounded-[32px] bg-[#080808] p-6 max-h-[90vh] overflow-y-auto">

                        <div className="flex items-center justify-between mb-6">

                            <h2 className="text-3xl font-semibold">
                                Equipment Analysis
                            </h2>

                            <button
                                onClick={() =>
                                    setEquipmentModal(
                                        false
                                    )
                                }
                                className="text-[#7d7366]"
                            >
                                Close
                            </button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">

                            {people.length > 0 ? (

                                people.map(
                                    (
                                        person,
                                        index
                                    ) => (

                                        <div
                                            key={index}
                                            className="border border-[#2b2721] rounded-3xl bg-[#0d0d0d] p-5"
                                        >

                                            <div className="flex items-center justify-between mb-5">

                                                <h3 className="text-2xl font-semibold">

                                                    Person {
                                                        person.person_id
                                                    }
                                                </h3>

                                                <div className={`px-4 py-2 rounded-full text-sm ${
                                                    person.helmet_wearing === "Y" &&
                                                    person.goggle === "Y"
                                                        ? "bg-green-500/20 text-green-300"
                                                        : "bg-yellow-500/20 text-yellow-300"
                                                }`}>

                                                    {person.helmet_wearing === "Y" &&
                                                    person.goggle === "Y"
                                                        ? "Protected"
                                                        : "Missing Equipment"}
                                                </div>
                                            </div>

                                            <div className="space-y-4">

                                                <div className="flex items-center justify-between">

                                                    <span>
                                                        Helmet
                                                    </span>

                                                    <span className={
                                                        person.helmet_wearing === "Y"
                                                            ? "text-green-400"
                                                            : "text-red-400"
                                                    }>

                                                        {person.helmet_wearing === "Y"
                                                            ? "Wearing"
                                                            : "Not Wearing"}
                                                    </span>
                                                </div>

                                                <div className="flex items-center justify-between">

                                                    <span>
                                                        Goggles
                                                    </span>

                                                    <span className={
                                                        person.goggle === "Y"
                                                            ? "text-green-400"
                                                            : "text-red-400"
                                                    }>

                                                        {person.goggle === "Y"
                                                            ? "Wearing"
                                                            : "Not Wearing"}
                                                    </span>
                                                </div>

                                                <div className="flex items-center justify-between">

                                                    <span>
                                                        Fire
                                                    </span>

                                                    <span className={
                                                        person.fire === "Y"
                                                            ? "text-red-400"
                                                            : "text-green-400"
                                                    }>

                                                        {person.fire === "Y"
                                                            ? "Detected"
                                                            : "No"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )

                            ) : (

                                <div className="text-[#7d7366]">
                                    No equipment data available
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default Dashboard;