import mongoose from 'mongoose';
const roomSchema = new mongoose.Schema({
  name:{type:String,required:true,trim:true,minlength:2,maxlength:50},
  description:{type:String,default:'',maxlength:160},
  sharedNotes:{type:String,default:''},
  type:{type:String,enum:['group','direct'],default:'group'},
  isPrivate:{type:Boolean,default:false},
  members:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
  createdBy:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
  lastMessage:{type:mongoose.Schema.Types.ObjectId,ref:'Message'}
},{timestamps:true});
roomSchema.index({members:1,updatedAt:-1});
export default mongoose.model('Room',roomSchema);
