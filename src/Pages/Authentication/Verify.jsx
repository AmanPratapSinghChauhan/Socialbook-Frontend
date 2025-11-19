import React, { useState } from 'react';
import './Authentication.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { verify } from '../../actions/UserActions';
import Loader from '../../Components/Loader/Loader';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import toast from 'react-hot-toast';

const Verify = () => {
  const {loading}=useSelector((state)=>state.user);
    const [otp,setOtp]=useState();
    const dispatch=useDispatch();
    const navigate=useNavigate();

     const verifyValidation = (otp) => {
        if(!otp){
              toast.error("Otp is required");
              return false;
            }
            return true;
    }

    const handleVerify=(e)=>{
       e.preventDefault();
       if(verifyValidation(otp)){
       dispatch(verify(otp));
       navigate('/home');
       }
    }
  return (<>
    {loading?<Loader/>:

  
    <div className='social-auth-container'>
      <div className='social-auth-box'>
        <div className='social-auth-h1'>
           <h1>Socialbook</h1>
        </div>
        <div className='social-auth-item'>
           <p>Verification</p>
        </div>
        <div className='social-auth-item'>
           <input type='otp'
            value={otp}
            placeholder='Enter OTP'
            onChange={(e)=>{setOtp(e.target.value)}}
            required
           />
        </div>
        <div className='social-auth-item'>
          
          <button type='button'
          onClick={handleVerify}
          >Verify</button>
          
          
        </div>

      </div>

    </div>
  }
  </>
  )
}

export default Verify;