import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addfriend } from '../actions/UserActions';
import '../Pages/Friends/Friends.css';
import socket from '../socket';
import { GetUserAPI, LoadUserAPI } from '../ServerAPI';

const FriendBox=({friend})=> {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleAddFriend=async (friendId)=>{
      const {data} = await LoadUserAPI();
        socket.emit('friendRequest',friendId, data.user._id);
        dispatch(addfriend(friendId));
   }

  //  useEffect(()=>{
  //   socket=io(ENDPOINT);
  //    socket.emit("setup",userID);
  //  },[])

  return (<>
        <div className='fb-container'>
        <div className='fb-item'>
           <img src={friend.image.url}/><span>{friend.name}</span>
        </div>
        <div className='fb-item'>
          <button id='fb-item-b' type='button' onClick={()=>handleAddFriend(friend._id)}>Add Friend</button>
          
           
        </div>

        </div>
        
        </>

        )
    }

export default FriendBox