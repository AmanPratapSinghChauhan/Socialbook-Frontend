import React, { useContext,useRef, useEffect, useState } from 'react';
import './Userchat.css';
import { ChatContext } from '../../Pages/Messenger/Message';
import { useSelector } from 'react-redux';
import { GetChatAPI, GetMessageAPI, SendMessageAPI } from '../../ServerAPI';
import socket from '../../socket';

const Userchat = (props) => {
  const containerRef=useRef(null);

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
 
  const {user}=useSelector((state)=>state.user);
  const chatContext=useContext(ChatContext);
  const chatId=chatContext.chatState.state.chatUser;
  
  const [message,setMessage]=useState([]);
  const [newMessage,setNewMessage]=useState("");
  const [chats,setChats]=useState();
  const [sender,setSender]=useState();
  const [reciever,setReciever]=useState();
  const [socketConnected,setSocketConnected]=useState();
  const [typing ,setTyping]=useState(false);

  const handleGetMessages=async (chatID)=>{
    try{
      const {data}= await GetMessageAPI(chatID);
      if(data.success){
        setMessage(data.messages);
       // socket.emit("join chat",chatID);
      }
      else{
  
      }
    }
    catch(error){
      console.log(error);
    }
  }


  const sendMessage=async (event)=>{
    if (newMessage&&chats) {
      const chatID=chats._id;
      socket.emit("stop typing", props.chatId.state.chatUser);
      try {
        setNewMessage("");
        const { data } = await SendMessageAPI(chatID, newMessage);
        socket.emit("new message",data.message, props.chatId.state.chatUser);
        setMessage([...message, data.message]);
      } catch (error) {
        console.log(error);
      }
    }
  }


  
  
  useEffect(() => {
    socket.emit("setup",user._id);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setTyping(true));
    socket.on("stop typing", () => setTyping(false));
    socket.on("message recieved", (newMessageRecieved) => { 
      const chatID= props.chatId.state.chatUser;
      
      if ( chatID != newMessageRecieved.chat._id) {
        
        if(newMessageRecieved){
         chatContext.notificationDispatch('notification');
         setMessage((prevMessages) => [...prevMessages, newMessageRecieved]);
        }
      } else {
        
       
      }
    
    });
    scrollToBottom();

    return () => {
      socket.off("typing");
      socket.off("stop typing");
      socket.off("connected");
      socket.off("message recieved");
    };
    // eslint-disable-next-line
  },[props.chatId.state.chatUser]);



  useEffect(  ()=> {
    const handleFetchAgain=async()=>{
    try{
      console.log(props.chatId.state.chatUser);
      const {data}= await  GetChatAPI(props.chatId.state.chatUser);
      if(data.success){
        setChats(data.FullChat);
        setSender(data.sender);
        setReciever(data.reciever);
        const chatID=data.FullChat._id;
        handleGetMessages(chatID);
      }
      else{
        
      }
  
    }
    catch(error){
      console.log(error);
    }
  }
  handleFetchAgain();
    
  },[props.chatId.state.chatUser]);


  const typingHandler=(e)=>{

    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", props.chatId.state.chatUser);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", chatId);
        setTyping(false);
      }
    }, timerLength);

  }


  const handlePrevMessage=(m)=>{
    if(m){
      const datetime=m.createdAt.split("T");
      const date=datetime[0].split("-");
      const time=datetime[1].split(":");
      var hour=(Number(time[0])+5)%12;
      if(Number(time[1])>=30){
        hour=hour+1;
      }
      const minute=(Number(time[1])+30)%60;
      var timeString='';
      if(time[0]>12){
          timeString=String(hour)+":";
          if(minute<10){
            timeString=timeString+"0"+String(minute)+" pm";
          }
          else{
            timeString=timeString+String(minute)+" pm";
          }
      }
      else{
        timeString=String(hour)+":";
        if(minute<10){
          timeString=timeString+"0"+String(minute)+" am";
        }
        else{
          timeString=timeString+String(minute)+" am";
        }
      }
      
      const t=String([time[1]]);
      return(<div  >
      {m.sender._id==user._id? 
         <div className='sender-message-container' ref={containerRef}>
           <span className='s-m-message'>{m.content} </span> 
           <div className='s-m-t'>
           <span className='s-m-time'> {timeString}</span>
           </div>
           
           
           
         </div>
         :<>
         <div className='reciever-message-container' ref={containerRef}>
         <span className='r-m-message'>{m.content} </span>
           <div className='r-m-t'>
           <span className='r-m-time'> {timeString}</span>
           </div> 
         </div>
         </>
        }
      </div>)
    }
  }
 
  return (<>{!sender?"":
   <div className='chatting-body' >
   <div className='user-header'>
      <img src={reciever.image.url}></img>
      <span>{reciever.name}</span>

   </div>

   <div className='chat-p-message' >
    {message?message.map(handlePrevMessage):''}

    </div>

   
    <div className='chat-input'>
    
    <input type='text' value={newMessage} onChange={typingHandler}/>
    
    
  
    <button type='button' onClick={sendMessage}>Send</button>
    

    </div>
        
    </div>
   

  }</>
   
  )
}

export default Userchat;