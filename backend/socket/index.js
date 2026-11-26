import {Server} from 'socket.io';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Room from '../models/Room.js';
import Message from '../models/Message.js';

let io;
export function initSocket(server){
 io=new Server(server,{cors:{origin:process.env.CLIENT_URL||'http://localhost:5173',methods:['GET','POST']}});
 io.use(async(socket,next)=>{
  try{const token=socket.handshake.auth?.token; if(!token)return next(new Error('Auth token missing'));
   const p=jwt.verify(token,process.env.JWT_SECRET); socket.user=await User.findById(p.id).select('-password');
   if(!socket.user)return next(new Error('User not found')); next();
  }catch(e){next(new Error('Unauthorized socket connection'))}
 });
 io.on('connection',(socket)=>{
  const uid=socket.user._id.toString();
  socket.join(`user:${uid}`); socket.emit('presence:online',{userId:uid});
  socket.on('room:join',async(roomId)=>{
   try{const room=await Room.findById(roomId); if(room&&room.members.some(m=>m.equals(socket.user._id)))socket.join(`room:${roomId}`)}catch{}
  });
  socket.on('message:send',async({roomId,content}={})=>{
   try{
    if(!content?.trim()||content.length>2000)return;
    const room=await Room.findById(roomId); if(!room||!room.members.some(m=>m.equals(socket.user._id)))return;
    const msg=await Message.create({room:roomId,sender:socket.user._id,content:content.trim()});
    room.lastMessage=msg._id; room.updatedAt=new Date(); await room.save(); await msg.populate('sender','name role');
    io.to(`room:${roomId}`).emit('message:new',msg);
   }catch(e){socket.emit('message:error',{message:'Unable to send message'})}
  });
  socket.on('typing:start',({roomId})=>socket.to(`room:${roomId}`).emit('typing',{roomId,userId:uid,name:socket.user.name}));
  socket.on('typing:stop',({roomId})=>socket.to(`room:${roomId}`).emit('typing:stop',{roomId,userId:uid}));
  socket.on('disconnect',async()=>{await User.findByIdAndUpdate(uid,{lastSeen:new Date()}); io.emit('presence:offline',{userId:uid});});
 });
 return io;
}
export const getIO=()=>io;
