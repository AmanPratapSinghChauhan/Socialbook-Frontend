  import {createReducer} from '@reduxjs/toolkit';
export const userReducer=createReducer(
    {},
    {
    loginRequest: state => {
        state.loading = true;
        state.change=false;
      },
      loginSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.isVarified = true;
        state.change=true;
        state.user = action.payload.user;
        state.message = action.payload.msg;
      },
      loginFail: (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.isVarified = false;
        state.error = action.payload;
        state.change=false;
      },
  
      registerRequest: state => {
        state.loading = true;
        state.change=false;
      },
      registerSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.isVarified = false;
        state.change=true;
        state.user = action.payload.user;
        state.message = action.payload.msg;
      },
      registerFail: (state, action) => {
        state.loading = false;
        state.isVarified = false;
        state.isAuthenticated = false;
        state.error = action.payload;
        state.change=false;
      },
      verificationRequest: (state)=>{
        state.loading=true;
        state.change=false;
      },
      verificationSuccess: (state,action) =>{
        state.loading=false;
        state.isVarified=true;
        state.change=true;
        state.user=action.payload.user;
        state.message=action.payload.msg;

      },
      verificationFailure:(state,action )=>{
        state.loading=false;
        state.isVarified=false;
        state.error=action.payload;
        state.change=false;
      },
      loadUserRequest: state => {
        state.loading = true;
        state.change=false;
      },
      loadUserSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.isVarified = true;
        state.change=true;
        state.user = action.payload.user;
      },
      loadUserFail: (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.isVarified = false;
        state.error = action.payload;
        state.change=false;
      },
  
      logoutRequest: state => {
        state.loading = true;
        state.change=false;
      },
      logoutSuccess: (state, action) => {
        state.loading = false;
        state.isVarified = false;
        state.isAuthenticated = false;
        state.user = null;
        state.change=true;
        state.message = action.payload;
      },
      logoutFail: (state, action) => {
        state.loading = false;
        state.isVarified = true;
        state.isAuthenticated = true;
        state.error = action.payload;
        state.change=false;
      },
      forgetPasswordRequest: state => {
        state.loading = true;
        state.change=false;
      },
      forgetPasswordSuccess: (state, action) => {
        state.loading = false;
        state.change=true;
        state.message = action.payload;
      },
      forgetPasswordFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.change=false;
      },
  
      resetPasswordRequest: state => {
        state.loading = true;
        state.change=false;
      },
      resetPasswordSuccess: (state, action) => {
        state.loading = false;
        state.change=true;
        state.message = action.payload;
      },
      resetPasswordFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.change=false;
      },
      postCreateRequest: state =>{
        state.loading=true;
        state.change=false;

      },
      postCreateSuccess: (state,action)=>{
        state.loading=false;
        state.user=action.payload.user;
        state.change=true;
        state.message=action.payload.msg;
      },
      postCreateFail: (state,action)=>{
        state.loading=false;
        state.error=action.payload;
        state.change=false;
      },
      addFriendRequest: state=>{
        state.loading=true;
        state.change=false;
      },
      addFriendSuccess: (state,action)=>{
        state.loading=false;
        state.user=action.payload.data;
        state.change=true;
        state.message=action.payload.msg;
      },
      addFriendFail: (state,action)=>{
        state.loading=false;
        state.error=action.payload;
        state.change=false;
      },
      cancelRequest: state=>{
        state.loading=true;
        state.change=false;
      },
      cancelSuccess: (state,action)=>{
        state.loading=false;
        state.user=action.payload.data;
        state.change=true;
        state.message=action.payload.msg;
      },
      cancelFail: (state,action)=>{
        state.loading=false;
        state.change=false;
        state.error=action.payload;
      },
      friendRequest: (state)=>{
        state.loading=true;
        state.change=false;
      },
      friendSuccess: (state,action)=>{
        state.loading=false;
        state.change=true;
        state.user=action.payload.data;
        state.message=action.payload.msg;
      },
      friendFail:(state,action)=>{
        state.loading=false;
        state.change=false;
        state.error=action.payload;
      },
      friendAcceptRequest: (state)=>{
        state.loading=true;
        state.change=false;
      },
      friendAcceptSuccess: (state,action)=>{
        state.change=true;
        state.loading=false;
        state.user=action.payload.data;
        state.message=action.payload.msg;
      },
      friendAcceptFail:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
        state.change=false;
      },
      friendDeleteRequest: (state)=>{
        state.loading=true;
        state.change=false;
      },
      friendDeleteSuccess: (state,action)=>{
        state.loading=false;
        state.user=action.payload.data;
        state.change=true;
        state.message=action.payload.msg;
      },
      friendDeleteFail:(state,action)=>{
        state.loading=false;
        state.change=false;
        state.error=action.payload;
      },
      clearError: state =>{
        state.error=null;
      },
      clearMessage: state =>{
        state.message=null;
      }
    }
)