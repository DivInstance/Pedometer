import {createReducer} from '@reduxjs/toolkit'

//https://www.youtube.com/watch?v=1mUp9YZQGFE&list=PLuHGmgpyHfRzZy2xPF2Vn68sprpaZmCTV&index=42

export const userReducer = createReducer({token:null},(builder) => {
    //Login Cases
    builder.addCase("loginRequest",(state,action)  =>{
        state.loading = true;
    })
    builder.addCase("loginSuccess",(state,action)  =>{
        state.loading = false;
        state.message = action.payload.message;
        state.isAuthenticated = true;
        state.token = action.payload.token;
    })
    builder.addCase("loginFailure",(state,action)  =>{
        state.isAuthenticated = false;
        state.error = action.payload;   
    })

    //Error message case
    builder.addCase('clearError',(state)=>{ //https://youtu.be/1mUp9YZQGFE?list=PLuHGmgpyHfRzZy2xPF2Vn68sprpaZmCTV&t=1638   
        state.error = null;
    })
    builder.addCase('clearMessage',(state)=>{
        state.message = null;
    })
    //Register Reducer function
    builder.addCase("registerRequest",(state,action)  =>{
        state.loading = true;
    })
    builder.addCase("registerSuccess",(state,action)  =>{
        state.loading = false;
        state.isAuthenticated = true;
        state.message = action.payload
    })
    builder.addCase("registerFailure",(state,action)  =>{
        state.isAuthenticated = false;
        state.error = action.payload;   
    })

    //Get user Data request 
    builder.addCase("getUserDataRequest",(state,action)  =>{
        state.loading = true;
    })
    builder.addCase("getUserDataSuccess",(state,action)  =>{
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload
    })
    builder.addCase("getUserDataFailure",(state,action)  =>{
        state.isAuthenticated = false;
        state.error = action.payload;   
    })

    //Logout Case
    builder.addCase("logoutRequest",(state,action)  =>{
        state.loading = true;
    })
    builder.addCase("logoutSuccess",(state,action)  =>{
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.message = action.payload;
    })
    builder.addCase("logoutFailure",(state,action)  =>{
        state.isAuthenticated = false;
        state.error = action.payload;   
    })
})

