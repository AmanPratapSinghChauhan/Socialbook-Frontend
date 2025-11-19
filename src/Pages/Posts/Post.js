import React, { useState } from 'react';
import Header from '../../Components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadUser, postCreater } from '../../actions/UserActions';
import './Post.css';
import toast from 'react-hot-toast';
import { LoadUserAPI } from '../../ServerAPI';

const Post = () => {
    const {user}=useSelector((state)=>state.user);
    const [description,setDescription]=useState("");
    const [file,setFile]=useState();
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const handleFile=(e)=>{
        setFile(e.target.files[0]);
    }
const postValidation = (file, description) => {
    if (description == "") {
      toast.error("Description is required.");
      return false;
    }
    else if(!file){
       toast.error("Image is required, please select an image.");
       return false;
    }
    return true;
  };

    const handlePost= async (e)=>{
        e.preventDefault();
        if(postValidation(file, description)){
         const formdata = new FormData;
         const {data} = await LoadUserAPI();
         
         console.log("userName",data.user.name);
        formdata.append('file',file);
        formdata.append('description',description);
        formdata.append('name',data.user.name);
        formdata.append('email',data.user.email);
        formdata.append('profilepic',data.user.image?.url);
        dispatch(postCreater(formdata));
        navigate('/home');
        }   
    }
  return (
    <>
    <Header/>
      <div className='post-box'>
      <div className='p-b-form'>

      <div className='post-item post-head'>
        <h1>Socialbook</h1>

      </div>
      <div className='post-item'>
          <span>Create Post</span>
      </div>
      <div className='post-item post-input'>
         <label>Photo: &nbsp;&nbsp; <input type='file' accept = "image/*"
            onChange={handleFile}
            required

          /></label>
         
      </div>
      <div className='post-item'>
         <label> Description: &nbsp;&nbsp;
         <input type='text'
            className='post-item-input'
            placeholder='Description'
            onChange={(e)=>{setDescription(e.target.value)}}
            value={description}
            required
         />
         </label>

      </div>
      <div className='post-item'>
         <button type='button' onClick={handlePost}>
            Upload
         </button>
      </div>
      </div>

      </div>
    </>
    
  )
}

export default Post;