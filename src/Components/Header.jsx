import React ,{useEffect}from 'react';
import './Header.css';
import { NavLink,Link,Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const {user,loading}=useSelector((state)=>state.user);
    const navigate =useNavigate();

   
    const handleProfile=(userId)=>{
          navigate(`/profile`,{state:{userId:userId}});
    }
   
    return (<>
        
        <div className='header-box'>
            <div className='header-left'>
                <p> S</p>
                <div className='search'>
                    <i class="fa fa-search" aria-hidden="true"></i>
                    <input type='search' placeholder='Search Socialbook' />
                </div>




            </div>
            <div className='header-middle'>
                <div className='mid-item'>
                   <NavLink to={'/home'} className='nav-link'><i class="fa fa-home" aria-hidden="true"></i></NavLink>
                </div>
                <div className='mid-item'>
                <NavLink to={'/friends'} className='nav-link'><i class="fa fa-user" aria-hidden="true"></i></NavLink>
                </div>
                <div className='mid-item'>
                <NavLink to={'/messaging'} className='nav-link'><i class="fa fa-comments" aria-hidden="true"></i></NavLink>
                </div>
                <div className='mid-item'>
                <NavLink to={'/notification'} className='nav-link'><i class="fa fa-bell" aria-hidden="true"></i></NavLink>
                </div>
                <div className='mid-item'>
                <NavLink to={'/post'} className='nav-link'><i class="fa fa-images" aria-hidden='true'></i></NavLink>
                </div>
            </div>
            <div className='header-right'>
               <div className='user-img'>
               <span onClick={()=>{handleProfile(user?._id)}} ><img src={user?.image?.url}/></span>
               </div>
               
            </div>

        </div>
    <Outlet/>
    </>
    )
}

export default Header;