import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:null,
    loader:true,
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        userExist: (state,action)=>{
            state.user= action.payload,
            state.loader = false
        },

        userNotExists: (state) => {
            state.user = null,
            state.loader = null
        }
    }
})


export default authSlice;

export const {userExist,userNotExists} = authSlice.actions;