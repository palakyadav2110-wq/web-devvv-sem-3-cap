import jwt from 'jsonwebtoken';
export const makeToken=(user)=>jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
