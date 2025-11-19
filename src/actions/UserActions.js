import { AcceptFriendAPI, AddFriendAPI, CancelRequestAPI, CreatePostAPI, DeleteFriendAPI, ForgetAPI, GetUserAPI, LoadUserAPI, logInAPI, RegisterAPI, ResetAPI, VerifyAPI } from '../ServerAPI';

 
export const login =(email,password)=> async dispatch =>{
    try{
        dispatch({type:'loginRequest'});

        const {data} =await logInAPI(email, password);
       if(!data.status){
        dispatch({type:'loginFail',payload:data.msg});
       }
       else{
        dispatch({type:'loginSuccess',payload:data});
        localStorage.setItem('userAccessToken',JSON.stringify(data.token));
       }
    }
    catch(error){
        dispatch({type:'loginFail',payload:error.response.data.message});

    }


}

export const register= (formdata)=> async dispatch =>{
    try{
        dispatch({type:'registerRequest'});
        const {data}=await RegisterAPI(formdata);
        if(data.status){
            
            dispatch({type:'registerSuccess',payload:data.user});
            localStorage.setItem('userAccessToken',JSON.stringify(data.token));
        }
        else{
           
            dispatch({type:'registerFail',payload:data.msg});

        }
       
    }
    catch(error){
        dispatch({type:'registerFail',payload:error.response.data.message})
    }
}

export const verify=(otp)=> async dispatch =>{
    try {
        dispatch ({type:'verificationRequest'});
        const {data}= await VerifyAPI(otp);
        if(!data.status){
            dispatch({type:'verificationFailure',payload:data.msg});
        }
        else{
            localStorage.setItem('userAccessToken',JSON.stringify(data.token));
            dispatch({type:'verificationSuccess',payload:data});
            
        }
        
    }
    catch(error){
        dispatch({
            type:'verificationFailure',payload:error.response.data.message
        })
    }
}


export const logout=()=>async dispatch =>{
    try{
        dispatch({type:'logoutRequest'});

            dispatch({type:'logoutSuccess'});
            localStorage.removeItem('userAccessToken');
    }
    catch(error){
        dispatch({type:'logoutFail',payload:error.response.data.message});
    }
}

export const loadUser=()=>async dispatch=>{
    try{
       dispatch({type:'loadUserRequest'});

       const {data}= await LoadUserAPI();
       if(data.status){
        dispatch({type:'loadUserSuccess',payload:data});
       }
       else{
        dispatch({type:'loadUserFail',payload:data.msg});
       }
       
    } 
    catch(error){
        dispatch({type:'loadUserFail',payload:error.response.data.message});
    }
}

export const forgetPassword = (email) => async (dispatch) => {
    try {
      dispatch({ type: "forgetPasswordRequest" });
  
      const { data } = await ForgetAPI(email);
      if(data.status){
        dispatch({ type: "forgetPasswordSuccess", payload: data.msg });
      }
      else{
        dispatch({ type: "forgetPasswordFail", payload: data.msg });
      }
  
      
    } catch (error) {
      dispatch({
        type: "forgetPasswordFail",
        payload: error.response.data.message,
      });
    }
  };
  
  export const resetPassword = (token, password) => async (dispatch) => {
    try {
      dispatch({ type: "resetPasswordRequest" });

      const { data } = await ResetAPI(token, password);
      if(data.status){
        dispatch({ type: "resetPasswordSuccess", payload: data.msg });
      }
      else{
        dispatch({ type: "resetPasswordFail", payload: data.msg });
      }
  
      
    } catch (error) {
      dispatch({
        type: "resetPasswordFail",
        payload: error.response.data.message,
      });
    }
  };

  export const postCreater = (formData)=> async (dispatch)=>{
    try{
      dispatch({type:'postCreateRequest'});

      const {data}= await CreatePostAPI(formData);
       if(data.status){
        dispatch({type:"postCreateSuccess",payload:data});
       }
       else{
        dispatch({type:"postCreateFail",payload:data.msg})
       }

    }
    catch(error){
      dispatch({type:'postCreateFail',payload:error.response.data.message});
    }
  } 

  export const addfriend= (friendId) => async (dispatch)=>{
    try{
      dispatch({type:'addFriendRequest'});
   
      const {data}=await AddFriendAPI(friendId) ;

      if(data.status){
        dispatch({type:'addFriendSuccess',payload:data})
      }
      else{
        dispatch({type:'addFriendFail',payload:data.msg});
      }

    }
    catch(error){
      dispatch({type:'addFriendFail',payload:error.response.data.message});

    }
  }


  export const cancelRequest= (friendId) => async (dispatch)=>{
    try{
      dispatch({type:'cancelRequest'});
      const {data}=await CancelRequestAPI(friendId);

      if(data.status){
        dispatch({type:'cancelSuccess',payload:data})
      }
      else{
        dispatch({type:'cancelFail',payload:data.msg});
      }

    }
    catch(error){
      dispatch({type:'cancelFail',payload:error.response.data.message});

    }
  }

  export const friendRequest=(userId)=>async(dispatch)=>{
    try{
    dispatch({type:'friendRequest'});

    const {data}=await GetUserAPI(userId);
    if(data.status){
      dispatch({type:'friendSuccess',payload:data});
    }
    else{
      dispatch({type:'friendFail',payload:data.msg});
    }
  }
  catch(error){
    dispatch({type:'friendFail',payload:error.response.data.message});
  }
  }

  export const friendAcceptRequest=(friendId)=>async (dispatch)=>{
    try{
    dispatch({type:"friendAcceptRequest"});

    const {data}= await AcceptFriendAPI(friendId);
    if(data.status){
      dispatch({type:"friendAcceptSuccess",payload:data});
    }
    else{
      dispatch({type:"friendAcceptFail",payload:data.msg});
    }
  }
catch(error){
  dispatch({type:"friendAcceptFail",payload:error.response.data.message});
}
}

export const friendDeleteRequest=(friendId)=>async(dispatch)=>{
  try{
    dispatch({type:'friendDeleteRequest'});

    const {data}= await DeleteFriendAPI(friendId);
    if(data.status){
      dispatch({type:"friendDeleteSuccess",payload:data});
    }
    else{
      dispatch({type:"friendDeleteFail",payload:data.msg});
    }
  }
  catch(error){
    dispatch({type:"friendDeleteFail",payload:error.response.data.message});
  }
}

  
  