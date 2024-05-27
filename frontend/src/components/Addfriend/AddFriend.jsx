import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/Context'
import axios from 'axios'
import { IoIosPersonAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
 
function AddFriend() {
  const navigate = useNavigate()
  const{mightknow,findId ,userId,url, addfriendOrRemove,isDarkMode ,setFindId} = useContext(StoreContext)
  
  return (
   <div>
     <div className={`w-[300px] min-h-0 ${isDarkMode?'bg-[#d2d2d2]' :'bg-zinc-800 '} py-2 px-5 rounded-md `}>
      <h1 className='my-3 text-lg text-zinc-300'>People You Might Be Know ...</h1>
      
      {
        mightknow ? mightknow.map((item , index)=>{
          return(
             <div key={index} className='flex mt-3 items-center bg-[#5b5b5b6e] rounded-md px-2 py-1   mb-3 justify-between'>
                <div className='flex items-center'>
                <img className='w-10 h-10 rounded-full object-cover' onClick={() => navigate(`/profile/${item._id}`)}  src={`${url}/images/${item.picturePath}`} alt="" />
                    <div className='ml-5 text-[13px]'>
                    <h1 className=' text-[16px]'>{item.firstName} {item.lastName}</h1>
                    <p className='text-[#878787]'>{item.occupation}</p>
                    </div>
                </div>
                <IoIosPersonAdd className='text-[23px] cursor-pointer text-blue-500 rounded-full' onClick={()=>{ setFindId(item._id)}}/>    
            </div>
          )
        }):''
      }
     
    </div>
   </div>
  )
}

export default AddFriend