"use client"
import react from 'react';
import Link from "next/link"
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast,{Toaster} from 'react-hot-toast';

export default function SignupPage() {
  const [user,setUser] = react.useState({email:"",password:""});
  const [btnIsDisabled,setBtnIsDisabled] = react.useState(true);
  const [loading,setLoading] = react.useState(false);
  const router = useRouter();

  react.useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0)
    setBtnIsDisabled(false)
    else
    setBtnIsDisabled(true)
  },[user])

  const handleSubmit = async(e:any) => {
   e.preventDefault();
   console.log("before login",user)
   try{
    setLoading(true)
    const res = await axios.post("/api/users/login",user);
    console.log("after login route /api call response",res.data)
    if(res.data.success){
    toast.success(res.data.message)
    return router.push("/profile")
    }
    throw new Error(res.data.message)
   }catch(errmessage:any){
    console.log(errmessage)
    toast.error(errmessage)
   }finally{
    setLoading(false)
   }
}
  
  return (
    <>
    <Toaster position='top-center' reverseOrder={false}/>
     <form action="" onSubmit={handleSubmit} className='w-full h-screen flex flex-col gap-10 justify-center items-center'>
      {loading && <p>Loading...</p>}
      <h1 className="text-3xl">Login</h1>
      <div className='flex flex-col gap-2 items-center'>
      <label htmlFor="email">Email</label>
       <input type="email" id="email" onChange={(e) => setUser({...user,email:e.target.value})} required/>
      </div>
      <div className='flex flex-col gap-2 items-center'>
      <label htmlFor="password">Password</label>
       <input type="password" id="password" onChange={(e) => setUser({...user,password:e.target.value})} required/>
      </div>
      <button type='submit'disabled={btnIsDisabled ? true : false} className={`p-2 rounded text-white ${btnIsDisabled ? "bg-blue-200" : "bg-blue-500 "}`}>Login</button>
      <Link href="/signup" className="text-blue-500">SignUp</Link>
     </form>       
    </>
    )
}