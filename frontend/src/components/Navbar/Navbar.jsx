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
        <img onClick={() => navigate(`/profile/${userinfo._id}`)}   className='w-[45px] lg:w-[55px] h-[45px] lg:h-[52px] object-cover object-centerv rounded-lg' src={`${url}/images/${userinfo.picturePath}`} alt="" />
:''
      }
        <div className='  mx-auto flex justify-between'>
            <h1 className='text-white text-[40px] lg:text-[50px] leading-none font-bold '>CONTROVERSY.</h1>
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