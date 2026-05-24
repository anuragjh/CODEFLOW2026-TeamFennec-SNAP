import { createSlice } from "@reduxjs/toolkit";

const storedToken = localStorage.getItem("token");

const storedDevices =
    JSON.parse(
        localStorage.getItem("deviceCodes")
    ) || [];

const initialState = {
    token: storedToken || null,
    deviceCodes: storedDevices,
    isAuthenticated: !!storedToken,
};

const authSlice = createSlice({
    name: "auth",

    initialState,

    reducers: {

        loginSuccess: (state, action) => {

            state.token = action.payload.token;

            state.deviceCodes =
                action.payload.deviceCodes || [];

            state.isAuthenticated = true;

            localStorage.setItem(
                "token",
                action.payload.token
            );

            localStorage.setItem(
                "deviceCodes",
                JSON.stringify(
                    action.payload.deviceCodes || []
                )
            );
        },

        logout: (state) => {

            state.token = null;

            state.deviceCodes = [];

            state.isAuthenticated = false;

            localStorage.removeItem("token");

            localStorage.removeItem("deviceCodes");
        },
    },
});

export const {
    loginSuccess,
    logout,
} = authSlice.actions;

export default authSlice.reducer;