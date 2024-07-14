import React, { useContext } from 'react'
import { StoreContext } from '../../context/Context'
import { useNavigate } from 'react-router-dom'
import { DarkModeSwitch } from 'react-toggle-dark-mode';
function Navbar() {
    const {userinfo,url,isDarkMode,toggleDarkMode,token } = useContext(StoreContext)
    const navigate = useNavigate()
  return (
    <div className='flex items-center justify-between fixed px-3 lg:px-10 backdrop-blur-[2px] bg-[#0000007e] w-full h-[60px]'>
      {
        token?
        <div className='flex items-center gap-3 text-[19px]'>
          <img onClick={() => navigate(`/profile/${userinfo._id}`)}   className=' cursor-pointer w-[40px] lg:w-[50px] h-[45px] lg:h-[50px] object-cover object-centerv rounded-xl' src={`${url}/images/${userinfo.picturePath}`} alt="" />
          <h1 className=' leading-[0]'>Hii <span className='font-bold text-green-500 lg:text-[20px]'> {userinfo.firstName} </span> 👋</h1>
        </div>
:''
      }
        <div className='  mx-auto flex justify-between'>
            <h1 className='text-white text-[30px] lg:text-[50px] leading-none font-bold '>CONTROVERSY.</h1>
        </div>

        {
          token?
          <DarkModeSwitch 
          checked={!isDarkMode}
          onChange={toggleDarkMode}
          className=' text-[40px] size-8 '
          /> :""
        }
    </div>
  )
}

export default Navbar
