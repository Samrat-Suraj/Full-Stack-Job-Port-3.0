import { createSlice } from "@reduxjs/toolkit";

const modeSlice = createSlice({
    name: "mode",
    initialState: {
        mode: false,
    },
    reducers: {
        setMode: (state, action) => {
            state.mode = action.payload;
        },
    },
});

export const { setMode } = modeSlice.actions;
export default modeSlice.reducer;
