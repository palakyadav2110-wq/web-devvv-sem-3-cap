import mongoose from 'mongoose';
const pollSchema=new mongoose.Schema({
 room:{type:mongoose.Schema.Types.ObjectId,ref:'Room',required:true,index:true},
 question:{type:String,required:true,trim:true,maxlength:220},
 options:[{text:{type:String,required:true,trim:true},votes:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}]}],
 createdBy:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
 closed:{type:Boolean,default:false}
},{timestamps:true});
export default mongoose.model('Poll',pollSchema);
