import React, { useContext } from 'react'
import { StoreContext } from '../../context/Context'
import { IoIosPersonAdd } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { MdWorkOutline } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
 
function Sidebar() {
    const{userinfo,friendsinfo,setFindId,isDarkMode , url ,logout} = useContext(StoreContext)
  const navigate =  useNavigate() 
  return (
    <div className=' lg:block hidden' >
    <div className={` w-[400px] ${isDarkMode?'bg-[#d2d2d2]' :'bg-zinc-800 '}  rounded-md py-3 `}>
        <div className='user-profile px-3'>
        <div className={`flex items-center ${isDarkMode?' border-b-zinc-400' :' border-b-zinc-600 '} border-b-[2px]  pb-3 `}>
                <img  onClick={() => navigate(`/profile/${userinfo._id}`)}   className=' cursor-pointer w-10 h-10 rounded-full object-cover object-center' src={`${url}/images/${userinfo.picturePath}`} alt="" />
 
                    <div className='ml-5 text-[13px]'>
                    <h1 className=' text-lg font-medium'>{userinfo.firstName} {userinfo.lastName}</h1>
                    <h1 className=' text-xs text-zinc-300'>{userinfo.friends?userinfo.friends.length:'0'} friends</h1>
                    </div>
                </div>
                <div className={`border-b-[2px] ${isDarkMode?' border-b-zinc-400' :' border-b-zinc-600 '} py-3 text-[15px] text-zinc-400`}>
               <div className='flex items-center gap-2'>
                 <FaLocationDot className={`${isDarkMode?' text-zinc-800' :'text-[#ffffff60] '} text-[24px]`} />  <h1 className={`${isDarkMode?' text-zinc-800' :'text-[#ffffff60] '} `}>{userinfo.location}</h1>
                </div>
                   <div className='flex mt-2 items-center gap-2'>
                <MdWorkOutline className={`${isDarkMode?' text-zinc-800' :'text-[#ffffff60] '} text-[24px]`} />
                    <h1 className={`${isDarkMode?' text-zinc-800' :'text-[#ffffff60] '} `}>{userinfo.occupation}</h1>
                </div>
                </div>
                <div className={`border-b-[2px] w-full  ${isDarkMode?' border-b-zinc-400' :' border-b-zinc-600 '}  py-3 text-[15px] text-zinc-400`}>
                   <div className='flex justify-between w-full'> <h2 className={`${isDarkMode?' text-zinc-800' :'text-[#ffffff60] '} `}>Who 's viwed your profile  </h2> 
                    <h2 className={`${isDarkMode?' text-zinc-800' :'text-[#ffffff60] '} `}> {userinfo.viewedProfile}</h2>
                
                  </div>

                  <div className='flex justify-between w-full'> 
                    <h2 className={`${isDarkMode?' text-zinc-800' :'text-[#ffffff60] '} `}>Impression </h2><h2 className={`${isDarkMode?' text-zinc-800' :'text-[#ffffff60] '} `}> {userinfo.impressions}</h2>
                  </div>
                    
                </div>

                <div className='  mt-4 justify-center'>
                <div className='w-full flex justify-between'>
                  <button onClick={()=>{logout();
                    navigate('/')
                  }} className='border-red-600 border-[2px] hover:bg-red-600 px-4 py-1 rounded-md font-semibold flex items-center gap-3 '> <IoIosLogOut className="text-[20px]   "/> Logout</button>
                
                <button onClick={() => navigate(`/profile/${userinfo._id}`)} className=' bg-blue-500 rounded-md px-4 py-1'>View Profile</button>
                </div>
                </div>

                
        </div>

  </div> 
        <div className={`friend-list px-5 w-[400px] ${isDarkMode?'bg-[#d2d2d2]' :'bg-zinc-800 '} rounded-md py-3 mt-5 `}>
            <h1 className='text-[18px] font-medium'>Friend list</h1>

            {
               friendsinfo ? friendsinfo.map((item , index)=>{
                    return( 
                         <div key={index} className='flex mt-2 items-center bg-[#48484833] px-3 rounded-md py-1 justify-between'>
                <div className='flex items-center'>
                <img className='w-10 h-10 rounded-full object-cover object-center cursor-pointer' onClick={() => navigate(`/profile/${item._id}`)}  src={`${url}/images/${item.picturePath}`} alt="" />
                    <div className='ml-5 text-[13px]'>
                    <h1 className=' text-[16px]'>{item.firstName} {item.lastName}</h1>
                    <p className='text-[#676767]'>{item.occupation}</p>
                    </div>
                </div>
                <IoIosPersonAdd className='text-[23px] text-red-500 cursor-pointer rounded-full' onClick={()=>{ setFindId(item._id)}}/>    
                
            </div>
            
                    )
                })
                :
                ""
            }
           
        </div>

              
    </div>
  )
}

export default Sidebar