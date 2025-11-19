import axios from 'axios';
import { server } from './store';
import { getToken } from './store';

var token = getToken();
var config = {
    headers: {
      "Authorization":token
    },
  };

export const getAllUsersAPI = async (pageSize, pageIndex) =>  {
    const resp = await axios.post(`${server}/getallusers`
        ,{ pagesize : pageSize, pageindex : pageIndex},config);
        return resp;
} ;

export const getAllPostsAPI = async (pageSize, pageIndex) =>  {
    const resp = await axios.post(`${server}/getposts`
        ,{ pagesize : pageSize, pageindex : pageIndex},config);
        return resp;
} ;

export const logInAPI = async (email, password) =>  {
    const resp = await axios.post(
        `${server}/login`,
        {email,password}
    );
    if(resp.data.status)
        {
       token = resp.data.token;
    }
        return resp;
} 

export const RegisterAPI = async (formdata) =>  {

    const resp = await axios.post(`${server}/register`, formdata);
    if(resp.data.status)
        {
       token = resp.data.token;
    }
        return resp;
} 

export const VerifyAPI = async (otp) =>  {
    token = getToken();
    config = {
    headers: {
      "Authorization":token
    },
  };
    const resp = await axios.post(`${server}/verify`,{
        otp
    },config);
    if(resp.data.status)
        {
       token = resp.data.token;
    }
        return resp;
} 

export const LoadUserAPI = async () =>  {
    token = getToken();
    config = {
    headers: {
      "Authorization":token
    },
  };
    const resp = await axios.post(`${server}/loaduser`,{},config);
    if(resp.data.status)
        {
       token = resp.data.token;
    }
        return resp;
} 

export const ForgetAPI = async (email) =>  {
    const resp = await axios.post(
        `${server}/forgetpassword`,
        {
          email,
        },
        config
      );
        return resp;
} 

export const ResetAPI = async (token, password) =>  {
    const resp = await axios.put(
        `${server}/resetpassword/${token}`,
        {
          password
        },
        config
      );
        return resp;
} 

export const CreatePostAPI = async (formData) =>  {
    const resp = await axios.post(`${server}/createpost`, formData, config);
        return resp;
} 

export const AddFriendAPI = async (friendId) =>  {
    const resp = await axios.post(`${server}/addFriend`,{friendId},config);
        return resp;
} 

export const CancelRequestAPI = async (friendId) =>  {
    const resp = await axios.post(`${server}/cancelRequest`,{friendId},config);
        return resp;
} 


export const AcceptFriendAPI = async (friendId) =>  {
    const resp = await axios.post(`${server}/acceptfriend`,{friendId},config);
        return resp;
} 

export const DeleteFriendAPI = async (friendId) =>  {
    const resp = await axios.post(`${server}/deletefriend`,{friendId}, config);
        return resp;
} 

export const GetUserAPI = async (userId) =>  {
    const resp = await axios.post(`${server}/getUser`,{userId}, config);
        return resp;
} 

export const GetUserByIds = async (ids) =>  {
    const resp = await axios.post(`${server}/getUserByIds`,{ids}, config);
        return resp;
} 

export const GetPostsByIds = async (ids) =>  {
    const resp = await axios.post(`${server}/getPostsByIds`,{ids}, config);
        return resp;
} 

export const SendMessageAPI = async (chatId, content) =>  {
    const resp = await axios.post(`${server}/sendMessage`,{chatId, content}, config);
        return resp;
} 

export const GetChatAPI = async (chatId) =>  {
    const resp = await axios.post(`${server}/getChat`,{chatId}, config);
        return resp;
} 

export const GetMessageAPI = async (chatId) =>  {
    const resp = await axios.post(`${server}/getmessage`,{chatId}, config);
        return resp;
} 

export const LikeAPI = async (postId) => {
    const resp = await axios.post(`${server}/like`,{postId}, config);
    return resp;
}

export const UnLikeAPI = async (postId) => {
    const resp = await axios.post(`${server}/unlike`,{postId}, config);
    return resp;
}



















