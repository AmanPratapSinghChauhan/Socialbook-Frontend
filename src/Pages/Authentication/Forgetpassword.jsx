import { useState } from 'react';
import './Authentication.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { forgetPassword } from '../../actions/UserActions';
import toast from 'react-hot-toast';

const Forgetpassword = () => {
    const [email,setEmail]=useState('');
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const forgetValidation = (email) => {
       if(!email){
          toast.error("Email is required");
          return false;
        }
        return true;
}

    const handleForget=(e)=>{
      e.preventDefault();
      if(forgetValidation(email)){
          dispatch(forgetPassword(email));
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
           <p>Forget password</p>
        </div>
        <div className='social-auth-item'>
           <input type='email'
           placeholder='Email'
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            required
           />
        </div>
        <div className='social-auth-item'>
          
          <button type='button'
          onClick={handleForget}>Submit</button>
          
          
        </div>

      </div>

    </div>
  )
}

export default Forgetpassword;