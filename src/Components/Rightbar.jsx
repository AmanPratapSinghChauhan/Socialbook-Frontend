import React from 'react';
import './Rightbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../actions/UserActions';


const Rightbar = () => {
    const {user}=useSelector((state)=>state.user);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleLogout=(e)=>{
           e.preventDefault();
           dispatch(logout());
           navigate('/');
    }
  return (
    <div className='right-bar'>
        <div className='r-b-user'>
            <img src={user.image.url}/><span> {user.name}</span> 
        </div>
        <div className='r-b-options'>
           <div className='r-b-item'>
              <span>Setting</span>
           </div>
           <div className='r-b-item'>
              <Link>Update Account</Link>
              <Link to='/post'>Create Post</Link>

           </div>
           <div className='r-b-item'> 
              <button type='button'  onClick={handleLogout}>Logout</button>
           </div>

        </div>
    </div>
  )
}

export default Rightbar