import mongoose from 'mongoose';
const taskSchema=new mongoose.Schema({
 room:{type:mongoose.Schema.Types.ObjectId,ref:'Room',required:true,index:true},
 title:{type:String,required:true,trim:true,maxlength:180},
 details:{type:String,default:'',maxlength:500},
 dueDate:{type:Date,default:null},
 status:{type:String,enum:['todo','doing','done'],default:'todo'},
 createdBy:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
 assignedTo:{type:mongoose.Schema.Types.ObjectId,ref:'User',default:null}
},{timestamps:true});
export default mongoose.model('Task',taskSchema);
