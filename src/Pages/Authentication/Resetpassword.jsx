import React, { useState} from 'react'
import './Authentication.css';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../../actions/UserActions';
import toast from 'react-hot-toast';

const Resetpassword = () => {
    const [password,setPassword]=useState('');
    const { resetToken } = useParams();
    const dispatch=useDispatch();
    const navigate=useNavigate();

       const resetValidation = (password) => {
        if(!password){
              toast.error("Password is required");
              return false;
            }
            return true;
    }

    const handleReset=(e)=>{
        e.preventDefault();
        if(resetValidation(password)){
        dispatch(resetPassword(resetToken, password));
        navigate('/home');
        }   
    }
  return (
    <div className='social-auth-container'>
      <div className='social-auth-box'>
        <div className='social-auth-item'>
           <h1>Socialbook</h1>
        </div>
        <div className='social-auth-item'>
           <p>Reset Password</p>
        </div>
        <div className='social-auth-item'>
           <input type='password'
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            required
           />
        </div>
        <div className='social-auth-item'>
          
          <button type='button'
          onClick={handleReset}
          >Submit</button>
          
          
        </div>

      </div>

    </div>
  )
}


export default Resetpassword;