import React, { useState,useEffect,useReducer, useContext } from 'react';
import './Message.css';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Header from '../../Components/Header';
import Userchat from '../../Components/UserChats/Userchat';
import { GetUserByIds, LoadUserAPI } from '../../ServerAPI';

const initial2={
  notification:false,
}
const reducer2=(state,action)=>{
  switch(action){
    case 'notification':
      return {
        notification:true,
      }
      case 'unsetnotification':
        return{
          notification:false,
        }
  }

}

const initialState={
  chatUser:'',
}
const reducer=(state,action)=>{
  switch(action.type){
    case 'newChat':
      return {
        state:action.value,
      }  
    default:
     return {
      state:''
    }
  }
}

export const ChatContext=React.createContext();


const Message = () => {
  const [display,setDisplay]=useState(false);
  const [chat,dispatch]=useReducer(reducer,initialState);
  const [notification,dispatch2]=useReducer(reducer2,initial2);
    
    const [data,setDatas]=useState([]);
    const {user,isAuthenticated}=useSelector((state)=>state.user);
    var userID='';
    var userFriends=[];
    if(isAuthenticated){
       userID=user._id;
       userFriends=user.friends;
    }
    
   

    useEffect( ()=>{
      const fetchData= async () => {
      const {data} = await LoadUserAPI();
      const usersRes = await GetUserByIds(data.user.friends);
      if(usersRes.status){
        setDatas(usersRes.data.data);
      }
      }
      fetchData();
      },[]);
      const handleChat=  (chatuser)=>{ 
        setDisplay(true);
        dispatch({type:'newChat',value:{chatUser:chatuser}});
        if(notification.notification){
          dispatch2('unsetnotification');
        }
        }
                        
      const friendsCreater=(data)=>{
        return(
          <div className='l-s-m-item' onClick={()=>handleChat(data._id)}>
          <img src={data.image.url}/><span>{data.name}</span>
         </div>
        )
  }
  return (
    <>
    <ChatContext.Provider value={{chatState:chat,chatDispatch:dispatch ,notificationState:notification,notificationDispatch:dispatch2}}>
        <Header/>
        <div className='for-header'>

        </div>
        <div className='chat-page'>
           <div className='chat-left'>
                {data.map(friendsCreater)}
                {notification.notification?'notify':'no notification'}
           </div>
           <div id='chat-right'>
           {display?<Userchat chatId={chat} userId={user._id}/>:'Nothing'}
           </div>

        </div>
        </ChatContext.Provider>
    </>
  )
}

export default Message;