import {configureStore} from '@reduxjs/toolkit';
import { userReducer } from './reducers/UserReducer';
const store=configureStore({
    reducer:{
        user:userReducer,
    }
})
export default store;
export const getToken = () => {
    const userAccessToken=localStorage.getItem('userAccessToken');
        const token = "Bearer " + JSON.parse(userAccessToken);
        return token;
}
export const serverDomain = `${process.env.REACT_APP_BACKEND_URL}`;
export const server=`${process.env.REACT_APP_BACKEND_URL}/api/s1`;