import { useContext, useState } from 'react' 
import './App.css'
import * as ReactDOM from 'react-dom';
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import { StoreContext } from './context/Context'
import Login from './components/Login'
import Profile from './pages/ProfilePage/Profile'
import Navbar from './components/Navbar/Navbar'
import { DarkModeSwitch } from 'react-toggle-dark-mode';
function App() {
 const {isDarkMode , token} = useContext(StoreContext) 
  return (
    <>
     <div  className={`${isDarkMode?'bg-[#FFFFFF] text-black' :'bg-zinc-900 text-white '} w-full min-h-screen `}>
    <Navbar/>
      <Routes>
       <Route path='/' element={token? <Home/> : <Login/>}/>
       <Route path='/home' element={ token? <Home/> :<Login/>}/>
       <Route path='/profile/:id' element={token? <Profile/> :<Login/>}/>
      </Routes>
     </div>
    </>
  )
}

export default App
