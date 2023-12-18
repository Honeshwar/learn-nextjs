"use client"
import react from 'react';
import Link from "next/link"

export default function SignupPage() {
  const [user,setUser] = react.useState({username:"",email:"",password:""})
  const handleSubmit = (e:any) => {
   e.preventDefault();
   
   console.log(user)
  }
  
  return (
     <form action="" onSubmit={handleSubmit} className='w-full h-screen flex flex-col gap-10 justify-center items-center'>
         <h1 className="text-3xl">SignUp</h1>
         <div className='flex flex-col gap-2 items-center'>
      <label htmlFor="username">Username</label>
       <input type="username" id="username" onChange={(e) => setUser({...user,username:e.target.value})} required/>
      </div>
      <div className='flex flex-col gap-5 items-center'>
      <label htmlFor="email">Email</label>
       <input type="email" id="email" onChange={(e) => setUser({...user,email:e.target.value})} required/>
      </div>
      <div className='flex flex-col gap-5 items-center'>
      <label htmlFor="password">Password</label>
       <input type="password" id="password" onChange={(e) => setUser({...user,password:e.target.value})} required/>
      </div>
      <button type='submit' className='bg-blue-500 p-2 rounded text-white'>SignUp</button>
      <Link href="/login" className="text-blue-500">Login</Link>
     </form>       
    )
}