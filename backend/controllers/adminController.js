import Room from '../models/Room.js';
import User from '../models/User.js';
import Message from '../models/Message.js';
export async function deleteRoom(req,res,next){
 try{const room=await Room.findByIdAndDelete(req.params.id); if(!room)return res.status(404).json({message:'Room not found'}); await Message.deleteMany({room:room._id}); res.json({message:'Room and messages deleted'});}catch(e){next(e)}
}
export async function deleteUser(req,res,next){
 try{if(req.params.id===req.user.id)return res.status(400).json({message:'You cannot remove your own account'}); const u=await User.findByIdAndDelete(req.params.id); if(!u)return res.status(404).json({message:'User not found'}); await Room.updateMany({},{$pull:{members:u._id}}); res.json({message:'User removed'});}catch(e){next(e)}
}
