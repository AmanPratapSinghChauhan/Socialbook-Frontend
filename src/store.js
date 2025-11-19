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
export const serverDomain = "http://localhost:4000";
export const server=`${serverDomain}/api/s1`;