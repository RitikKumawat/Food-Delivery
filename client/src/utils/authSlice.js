import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token:localStorage.getItem("token")? localStorage.getItem("token"):null,
};

const authSlice = createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setToken(state,value){
            state.token = value.payload;
        },
        clearToken(state,value){
            state.token = null;
            localStorage.removeItem("token");
        }
    }
});

export const {setToken, clearToken} = authSlice.actions;
export default authSlice.reducer;