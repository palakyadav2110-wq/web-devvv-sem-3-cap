import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  name:{type:String,required:true,trim:true,minlength:2,maxlength:40},
  email:{type:String,required:true,unique:true,lowercase:true,trim:true},
  password:{type:String,required:true,minlength:8},
  role:{type:String,enum:['user','admin'],default:'user'},
  avatar:{type:String,default:''},
  lastSeen:{type:Date,default:Date.now}
},{timestamps:true});
export default mongoose.model('User',userSchema);
