import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Post from '../../components/post/Post'
import AddFriend from '../../components/Addfriend/AddFriend'

function Home() {
  return (
    <div className='flex flex-col lg:flex-row min-h-screen pt-20 justify-center gap-10 px-3 lg:px-10 py-7 mx-auto w-full'>
      
      <Sidebar/>
      <Post/>
      <AddFriend/>
    </div>
  )
}

export default Home