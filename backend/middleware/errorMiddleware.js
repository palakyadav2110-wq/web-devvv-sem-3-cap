export function notFound(req,res,next){ const e=new Error(`Route not found: ${req.originalUrl}`); e.status=404; next(e); }
export function errorHandler(err,req,res,next){
  const status=err.status || (err.name==='ValidationError'?400:500);
  res.status(status).json({message:err.message || 'Server error'});
}
