import React, { useEffect, useState } from 'react';
import './Profile.css';
import PostCard from '../../Components/PostCard';
import Header from '../../Components/Header';
import { server } from '../../store';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { getAllPostsAPI, GetPostsByIds, GetUserAPI, GetUserByIds } from '../../ServerAPI';

const Profile = () => {
   
    const [posts, setPosts] = useState([]);
    const [userName,setUserName]=useState('');
    const [friends,setFriends]=useState([]);
    const [img,setImg]=useState('');
    const {state}=useLocation();
    const {userId}=state;
    

    

    useEffect(()=>{
        const fetchAgain=async ()=>{  
                const {data} = await GetUserAPI(userId);
                if(data.status){
                    setUserName(data?.data?.name);
                    setImg(data?.data?.image?.url);
                    const ids=data?.data?.friends;
                    const usersRes = await GetUserByIds(ids);
                    if(usersRes.status){
                         setFriends(usersRes?.data.data);
                    }
                        
                    
            
                     const postsRes = await GetPostsByIds(data.data.posts);
                     if(postsRes.status){
                        console.log("user Posts from ", postsRes.data.data)
                          setPosts(postsRes.data.data);
                     }
                            
                        
                   
                }
        }
        fetchAgain();
        
    },[userId])

    
    const createPost = (post) => {
        return (
            <PostCard postInfo={post} />
        )
    }

    const friendBox=(fff)=>{
        return(
            <>
            <div className='f-card'>

            
            <div className='f-image'> 
            <img src={fff?.image?.url}/>

            </div>
              <div className='f-name'>
                {fff?.name}
              </div>

              </div>

            </>
          
        )
    }

    return (
        <>
           <Header /> 
           
            

                
                <div className='profile-container'>
                    <div className='profile-box'>
                        <div className='user-info'>
                           <div className='user-item'>
                               <img className='p-user-pic' src={img}/>
                           </div>
                           <div className='user-item'>
                               <span>{userName}</span>
                           </div>


                        </div>
                        
                        {friends.length>0?<div className='user-friends'>
                           Friends

                            {friends.map(friendBox)}
                        </div>:
                        ''}
                        {!posts ? '' :
                        <div className='user-posts'>
                            {posts?.map(createPost)}
                        </div>
                        }

                    </div>
                </div>
            
        </>
    )
}

export default Profile;