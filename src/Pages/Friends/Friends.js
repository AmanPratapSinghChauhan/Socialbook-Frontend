import React, { useEffect, useState } from 'react';
import Header from '../../Components/Header';
import './Friends.css';
import { useSelector } from 'react-redux'
import FriendBox from '../../Components/FriendBox';
import { useDispatch } from 'react-redux';
import { loadUser, friendAcceptRequest, friendDeleteRequest } from '../../actions/UserActions';
import { getAllUsersAPI, GetUserAPI, LoadUserAPI } from '../../ServerAPI';
import socket from '../../socket';

const Friends = () => {
    const {user, loading} = useSelector((state) => state.user);
    const [friends,setFriends]=useState([]);
    const [requestRecieved,setrequestRecieved]=useState(0);
    const [fUser,setfUser]=useState();
    const [requestedUser,setRequestedUser]=useState([]);
    const [userId, setUserId] = useState(user?._id);
    
    const dispatch=useDispatch();

    const handleAcceptRequest=async (fId)=>{
        const friendId=fId;
        dispatch(friendAcceptRequest(friendId));
        await getAllUsers();
    }
    const handleDeleteRequest= async (fId)=>{
        const friendId=fId;
        dispatch(friendDeleteRequest(friendId));
        await getAllUsers();
    }

    
    const handleRequest=(fff)=>{
        return(<>
            <div className='fb-container'>
            <div className='fb-item'>
               <img src={fff.image.url}/><span>{fff.name}</span>
            </div>
            <div className='fb-item'>
              <button id='fb-item-b' type='button' onClick={()=>handleAcceptRequest(fff._id)}>Confirm</button>
              <button id='fb-item-b' type='button' onClick={()=>handleDeleteRequest(fff._id)} >Delete</button>
               
            </div>
    
            </div>
            
            </>)
    }
    
    const hfriendRequest=async()=>{
        try{
            const {data}=await LoadUserAPI();
            if(data.status){
            const fRe=data.user.friendRequest;
            const res = await getAllUsersAPI(5,0);
            if(res.data.status){
                
                var nfuser= res.data.users.filter((auser) =>fRe.some((fR) => auser._id.includes(fR)));
                setRequestedUser(nfuser);
            }
            
        }
    }
        catch(error){
            console.log(error);
        }
    };
    const friendBox=(friend)=>{

        return(<FriendBox friend={friend}/>)
    
    }
    const getAllUsers=async()=>{

        const {data} = await LoadUserAPI();
        setUserId(data.user._id);

        const res = await getAllUsersAPI(6,0);

                if(res.data.status){
                    const userRequests=data.user.userRequest;
                    const userFriends=data.user.friends;
                    const userFriendRequests = data.user.friendRequest;
                    var usersExcludeHim=res.data?.users?.filter((auser)=>!auser?._id?.includes(data.user._id));
                   var usersExcludeUserFriends= usersExcludeHim?.filter((nuser) =>!userFriends?.some((uFriends) => nuser?._id?.includes(uFriends)));
                   var usersExcludeUserRequests=usersExcludeUserFriends?.filter((nuser)=>!userRequests?.some((uRequest)=>nuser?._id?.includes(uRequest)));
                   var usersExcludeUserFriendRequests=usersExcludeUserRequests?.filter((nuser)=>!userFriendRequests?.some((uFriendRequest)=>nuser?._id?.includes(uFriendRequest)));

                   setFriends(usersExcludeUserFriendRequests);
                }

    };

    useEffect( ()=>{
       getAllUsers();
       hfriendRequest();
    },[requestRecieved,loading]);

    

    // useEffect(()=>{
    //     socket=io(ENDPOINT);
    //     socket.emit("setup", "");
    //     socket.on("friendRequestRecieved",(requestUserId)=>{
    //         setrequestRecieved(prevState=>{
    //             prevState=prevState+1;
    //         })
    //         hfriendRequest();
    //     });
    // },[]);

  useEffect(() => {
    // Register current user
    socket.emit('setup', userId);

    // Listen for incoming friend requests
    socket.on("friendRequestRecieved", ({ from }) => {
      getAllUsers();
      hfriendRequest();
    });

    return () => {
      socket.off("friendRequestRecieved");
    };
  }, [userId]);
    
  return (
    
    <>
        <Header/>
        <div className='friend-container'>
        <div className='fc-container'>

        
        <div className='friend-box'>
            {requestedUser.map(handleRequest)}
        </div>
        <div className='friend-box'>
             {friends?.map(friendBox)}
            </div>
        </div>
        </div>
    

    </>
  )
}

export default Friends;