import React, { useEffect,useState } from 'react';
import './Leftsidebar.css';
import { server } from '../store';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GetUserByIds } from '../ServerAPI';


const Leftsidebar = () => {
  const {user,change}=useSelector((state)=>state.user);
  const userID=user._id;
  const userfriends=user.friends;
  const [datas,setDatas]=useState([]);
  const navigate=useNavigate();
  const handleProfile=(userId)=>{
    navigate(`/profile`,{state:{userId:userId}});
}
  const friendsCreater=(data)=>{
        return(
          <div className='l-s-item' onClick={()=>{handleProfile(data?._id)}}>
          <img src={data?.image?.url}/><span>{data?.name}</span>
         </div>
        )
  }

  const handleFetchAgain=async()=>{
    const ids=user.friends;
    if(ids.length>0){
      const usersRes = await GetUserByIds(ids);
      if(usersRes.status){
        setDatas(usersRes.data.data);
      }

    }
   

  }
  useEffect(()=>{
    handleFetchAgain();
  },[change]);
  console.log(datas.length);
  return (
    <div className='left-sidebar'>
       <div className='l-s-heading'>
        Friends
       </div>
       {change?
       <div className='l-s-contacts'>
       
        {datas.map(friendsCreater)}
       
       </div>
       :''}

    </div>
    
  )
}

export default Leftsidebar;