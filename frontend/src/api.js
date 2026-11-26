const API=import.meta.env.VITE_API_URL||'http://localhost:5000';
export async function api(path,token,options={}){
 const res=await fetch(`${API}/api${path}`,{...options,headers:{'Content-Type':'application/json',...(token?{Authorization:`Bearer ${token}`}:{})}});
 const data=await res.json().catch(()=>({message:'Unexpected response'}));
 if(!res.ok)throw new Error(data.message||'Request failed'); return data;
}
export {API};
