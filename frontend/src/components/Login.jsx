import React, { useContext, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/Context';


function Login() {
    const navigate = useNavigate()
    const [image , setImage] = useState(false)
  
    const [currState , setCurrState] =useState("Login")
    const {token,url ,setToken  ,setUserId} = useContext(StoreContext)
    const [data  , setData] = useState({
      
        password:"",
        email:'',
        firstName:'',
        lastName:'',
        location:'',occupation:''
      })
      const onChangeHandeler = (e)=>{
        const name =e.target.name
        const value =e.target.value
        setData(data=>({...data,[name]:value}))
    
      }
 
      const onLogin  = async(e)=>{
        e.preventDefault()   
        
        if (currState !== 'Login') { 
          const formData = new FormData();
          formData.append('firstName', data.firstName);
          formData.append('lastName', data.lastName);
          formData.append('occupation', data.occupation);
          formData.append('location', data.location);
          formData.append('email', data.email);
        formData.append('password', data.password);
       
            formData.append('image', image);
          
          const responce  = await axios.post(`${url}/auth/register` ,formData ,{headers:{token}})
       
          if(responce.data.success){
              
            setUserId(responce.data.user._id) 
            setToken(responce.data.token)
            localStorage.setItem("token",responce.data.token)
            localStorage.setItem("id",responce.data.user._id)
            navigate('/home')
          }
          else{ 
            alert(responce.data.message)
          }

        } 
        else{
           let formData = {};
        formData.email = data.email;
        formData .password = data.password; 
        
        const responce  = await axios.post(`${url}/auth/login`,formData ,{headers:{token}})
       
        if(responce.data.success){
            
          setUserId(responce.data.user._id) 
          setToken(responce.data.token)
          localStorage.setItem("token",responce.data.token)
          localStorage.setItem("id",responce.data.user._id)
          navigate('/home')
        }
        else{ 
          alert(responce.data.message)
        }
        } 
       
      } 
      
       

  return (
    <div className=' relative w-full min-h-screen overflow-hidden flex items-center justify-center'>
<h1 className='signlogo absolute lg:text-[300px] text-[100px] font-bold text-[#6f6f6f]'>CONTROVERSY.</h1>
         <form onSubmit={onLogin} encType="multipart/form-data" className=' backdrop-blur-[3px] bg-[#0000006e] w-[350px] lg:w-[400px] rounded-lg gap-4 py-10 px-5 flex-col flex items-center justify-center '>
            <div className='w-full flex  justify-center relative'>
                <h2 className='text-bold text-3xl'>{currState}</h2>
                   
            </div>
            <div className='inputs w-[95%] flex flex-col gap-3'>
                {currState === 'Login' ? <></> :<>
               <div className='flex gap-2 w-full '> 
               <input type="text" name="firstName" value={data.firstName} onChange={onChangeHandeler} placeholder="First Name"className='px-2 w-1/2 rounded py-1 outline-none bg-transparent border border-[#ffffff65]' />
               <input type="text" name="lastName" value={data.lastName} onChange={onChangeHandeler} placeholder="Last Name"   className='px-2 w-1/2 rounded py-1 outline-none bg-transparent border border-[#ffffff65]'/>
              </div>    
               </>
                } 
                <input onChange={onChangeHandeler} name='email' value={data.email} className='px-2 rounded py-1 outline-none bg-transparent border border-[#ffffff65]' type="email" placeholder='email'/>
                <input onChange={onChangeHandeler} name='password' value={data.password} className='px-2 rounded py-1 outline-none bg-transparent border border-[#ffffff65]' type="password" placeholder='password'/>
 
                {currState === 'Login' ? <></> :<> 

                <div className='flex gap-2 w-full '> 
                  <input type="text" name="location" value={data.location} onChange={onChangeHandeler}    placeholder="Location" className='   w-1/2 px-2 rounded py-1 outline-none bg-transparent border border-[#ffffff65]'/>
                  <input type="text" name="occupation" value={data.occupation} onChange={onChangeHandeler} placeholder="Occupation" className='w-1/2 px-2 rounded py-1 outline-none bg-transparent border border-[#ffffff65]'/>
                </div>
            <input required name="image"   onChange={(e)=>setImage(e.target.files[0])} className=' px-3 py-1   rounded-md bg-transparent border border-[#ffffff4f] outline-none  '    type="file"   />
                </>
                } 
            </div>
            <button type='sumbit' className=' bg-[#0095ff7d]   font-bold px-7 py-2 rounded-full '>{currState === 'Sign UP'?'Create account' :'Login' }</button>
            <div className='condition flex w-full gap-3 text-[13px] items-center'>
               
                  </div>
             {currState === "Login"

             ? <p className='   text-center '>Create a new  account ? <Link className=' text-blue-500' onClick={()=> setCurrState("Sign UP")}>Click here</Link> </p>
             : <p className='   text-center '>Already have an account ? <Link  className=' text-blue-500'onClick={()=> setCurrState("Login")}>Click here</Link> </p>
             }
          
           
        </form>
    </div>
  )
}

export default Login