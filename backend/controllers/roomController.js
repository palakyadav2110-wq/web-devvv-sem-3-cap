import Room from '../models/Room.js';
import Message from '../models/Message.js';
import User from '../models/User.js';

export async function listRooms(req,res,next){
 try{
  const rooms=await Room.find({members:req.user._id}).populate('members','name email role').populate('lastMessage').sort({updatedAt:-1});
  res.json({rooms});
 }catch(e){next(e)}
}
export async function createRoom(req,res,next){
 try{
  const {name,description,isPrivate=false}=req.body;
  if(!name?.trim()) return res.status(400).json({message:'Room name is required'});
  const room=await Room.create({name:name.trim(),description:description||'',isPrivate,members:[req.user._id],createdBy:req.user._id});
  await room.populate('members','name email role');
  res.status(201).json({room});
 }catch(e){next(e)}
}
export async function joinRoom(req,res,next){
 try{
  const room=await Room.findById(req.params.id);
  if(!room) return res.status(404).json({message:'Room not found'});
  if(room.isPrivate) return res.status(403).json({message:'Private room requires an invitation'});
  if(!room.members.some(m=>m.equals(req.user._id))) room.members.push(req.user._id);
  await room.save(); await room.populate('members','name email role');
  res.json({room});
 }catch(e){next(e)}
}
export async function leaveRoom(req,res,next){
 try{
  const room=await Room.findById(req.params.id);
  if(!room) return res.status(404).json({message:'Room not found'});
  room.members=room.members.filter(m=>!m.equals(req.user._id));
  await room.save(); res.json({message:'You left the room'});
 }catch(e){next(e)}
}
export async function getMessages(req,res,next){
 try{
  const room=await Room.findById(req.params.id);
  if(!room || !room.members.some(m=>m.equals(req.user._id))) return res.status(403).json({message:'Room access denied'});
  const messages=await Message.find({room:room._id}).populate('sender','name role').sort({createdAt:1}).limit(200);
  res.json({messages});
 }catch(e){next(e)}
}
export async function sendMessage(req,res,next){
 try{
  const {content}=req.body;
  if(!content?.trim()) return res.status(400).json({message:'Message cannot be empty'});
  if(content.length>2000) return res.status(400).json({message:'Message is too long'});
  const room=await Room.findById(req.params.id);
  if(!room || !room.members.some(m=>m.equals(req.user._id))) return res.status(403).json({message:'Room access denied'});
  const message=await Message.create({room:room._id,sender:req.user._id,content:content.trim()});
  room.lastMessage=message._id; room.updatedAt=new Date(); await room.save();
  await message.populate('sender','name role');
  res.status(201).json({message});
 }catch(e){next(e)}
}
