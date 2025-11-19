import { io } from 'socket.io-client';
import { serverDomain } from './store';
const socket = io(serverDomain);
export default socket;
