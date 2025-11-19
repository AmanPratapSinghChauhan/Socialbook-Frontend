import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Postcard.css';
import { LikeAPI, LoadUserAPI, UnLikeAPI } from '../ServerAPI';


const PostCard = (props) => {
  var {user}=useSelector((state)=>state.user);
  const [like,setLike]=useState(props.postInfo.likes);

    const handleLike=async (index)=>{
          var postId=index;
          const {data}=await LikeAPI(postId);
          if(data.status){
            console.log(data);
            if(!like.includes())
             setLike((prevMessages) => [...prevMessages, user._id]);
          }    
    }
    const handleUnlike=async (index)=>{
          var postId=index;
          const {data}=await UnLikeAPI(postId);
          if(data.status){
             setLike(prev => prev.filter(msg => msg != user._id));
          }   

    }
    if(props){
    const datetime=props.postInfo.createdAt.split("T");
      const date=datetime[0].split("-");
      const time=datetime[1].split(":");
      var hour=(Number(time[0])+5)%12;
      if(Number(time[1])>=30){
        hour=hour+1;
      }
      const minute=(Number(time[1])+30)%60;
      var timeString='';
      if(time[0]>12){
          timeString=String(hour)+":";
          if(minute<10){
            timeString=timeString+"0"+String(minute)+" pm";
          }
          else{
            timeString=timeString+String(minute)+" pm";
          }
      }
      else{
        timeString=String(hour)+":";
        if(minute<10){
          timeString=timeString+"0"+String(minute)+" am";
        }
        else{
          timeString=timeString+String(minute)+" am";
        }
      }
      const month=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var dateString='';
      dateString=date[2]+" "+month[(date[1]-1)]+" "+date[0];
   }

    console.log(like.includes(user._id));
    
    
  return (
    <div className='p-c-container'>

    <div className='p-c-box'>
     <div className='pc-item'>
        <img className='p-c-pic' src={props.postInfo.profilepic} /><span>{props.postInfo.name}</span> 
     </div>
     <div className='pc-item'>
        <span className='created'>{timeString} at {dateString}</span>
     </div>
     <div className='pc-item'>
        <p>{props.postInfo.description}</p>

     </div>
     <div className='pc-item'>
        <img className='p-c-img' src={props.postInfo.image.url}/>
     </div>
     <div className='pc-item'>
     <span className='like-button'  >
     {like.includes(user._id)
     ?
     <i class="fa fa-heart-o"  style={{color:'red'}} onClick={()=>handleUnlike(props.postInfo._id)} aria-hidden="true"></i>
     :
     <i class="fa fa-heart-o"  onClick={()=>handleLike(props.postInfo._id)} aria-hidden='true'></i>
     
     }
     
     
     </span>
     <span className='like-count'>
      {like.length}
     </span>
      
     </div>

    </div>
    </div>
  )
}

export default PostCard;