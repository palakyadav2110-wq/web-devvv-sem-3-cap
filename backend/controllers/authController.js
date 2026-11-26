import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import {makeToken} from '../utils/token.js';

export async function register(req,res,next){
 try{
  const {name,email,password}=req.body;
  if(!name||!email||!password) return res.status(400).json({message:'Name, email and password are required'});
  if(password.length<8) return res.status(400).json({message:'Password must be at least 8 characters'});
  const exists=await User.findOne({email});
  if(exists) return res.status(409).json({message:'Email already registered'});
  const user=await User.create({name,email,password:await bcrypt.hash(password,12)});
  res.status(201).json({user:{id:user._id,name:user.name,email:user.email,role:user.role},token:makeToken(user)});
 }catch(e){next(e)}
}
export async function login(req,res,next){
 try{
  const {email,password}=req.body;
  const user=await User.findOne({email});
  if(!user || !(await bcrypt.compare(password||'',user.password))) return res.status(401).json({message:'Incorrect email or password'});
  res.json({user:{id:user._id,name:user.name,email:user.email,role:user.role},token:makeToken(user)});
 }catch(e){next(e)}
}
export async function me(req,res){res.json({user:req.user})}
