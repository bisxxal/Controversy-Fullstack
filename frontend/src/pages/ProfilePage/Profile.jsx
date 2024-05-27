import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/Context";
import { AiOutlineLike } from "react-icons/ai";
import { IoMdArrowRoundBack } from "react-icons/io";
import { BiCommentDetail } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { MdWorkOutline } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Profile() {
  const {
    userinfo,
    friendsinfo,
    setFindId,
    updatePost,
    formatTimestampToAgo,
    isDarkMode,
    url,
    logout,
  } = useContext(StoreContext);
  const [postdata, setPostdata] = useState([]);
  const [friend, setFriend] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async (e) => {
      const responce = await axios.get(`${url}/post/${id}/posts`);
      if (responce.data) {
        setPostdata(responce.data.post);
      } else {
        console.log("error");
      }
    }; 
    const featchfriend= async()=>{
      const responce  = await axios.get(url+`/user/${id}`)
      // if(responce.data.success){
        setFriend(responce.data)   
      // }
    
  }
    fetchData();
    featchfriend()
  }, []); 
  return (
    <div className=" pt-20 w-full min-h-screen flex flex-col items-center ">
      <div className="user-profile w-full lg:w-1/2 px-3">
        <div className="flex flex-col w-full overflow-hidden bg-[#4949495a]  rounded-md  pb-3">
          <div className="flex flex-col gap-1 bg-[#151f28cb] rounded-md p-5 mb-5">
            <div className="flex gap-6">
               
              <IoMdArrowRoundBack
                onClick={() => navigate(`/home`)}
                className="text-[29px]"
              />
             <div>
             <h1 className='font-bold text-lg'>
                {friend
                  ? `${friend.firstName} ${friend.lastName}`
                  : `${userinfo.firstName} ${userinfo.lastName}`}
              </h1>
              <h1 className="my-2 text-zinc-300">
                <span className="text-white font-semibold">{postdata.length } </span>Posts
              </h1>
             </div>


            </div>

             <img
              className="w-32 h-32 border-[3px] object-cover object-center border-blue-500 rounded-full"
              src={`${url}/images/${
                friend ? friend.picturePath: userinfo.picturePath
              }`}
              alt=""
            />

            <div className="flex items-center justify-between">
              <div className="my-4 text-[13px]">
                <h1 className=" text-lg font-bold">
                {friend
                  ? `${friend.firstName} ${friend.lastName}`
                  : `${userinfo.firstName} ${userinfo.lastName}`}
                </h1> 
                <h1 className="text-sm mt-2 text-zinc-300 font-semibold">
                  {friend && friend.friends
                    ? friend.friends.length
                    : userinfo && userinfo.friends
                      ? userinfo.friends.length
                      : '0'}
                  <span className="text-zinc-400"> Following</span>
                </h1>


              </div>
              <div>
              
                <button
                onClick={() => logout()}
                className="border-red-600 border-[2px] hover:bg-red-600 px-4 py-1 rounded-md font-semibold  "
                >
                  Logout
                </button> 
              </div>
            </div>
          </div>

          <div className=" p-5 border-b-[2px] border-b-zinc-600 py-3 text-[15px] text-zinc-400">
            <div className="flex mb-4 items-center gap-2">
              <FaLocationDot className=" text-[20px]" />
              <h1>
                {friend
                  ? friend.location
                  : `${userinfo.location}`}
              </h1>
            </div>
            <div className="flex mt-2 items-center gap-2">
            
            <MdWorkOutline className=" text-[20px]" />
            <h1>{friend ? friend.occupation : userinfo.occupation}</h1>
            
            </div>
          </div>
          <div className="border-b-[2px] px-5 w-full border-b-zinc-600 py-3 text-[15px] text-zinc-400">
            <div className="flex justify-between w-full">

             
              <h2> Profile Viewers </h2>
              <h2 className='text-white font-semibold'>{friend ? friend.viewedProfile : userinfo.viewedProfile}  </h2> 
             
            </div>

            <div className="flex justify-between w-full">
              <h2>Impression </h2><h2 className='text-white font-semibold'> {friend ? friend.impressions :userinfo.impressions}</h2>
            </div>
          </div>

          <div className="flex mt-4 px-3 justify-center">
            <button
              onClick={() => navigate(`/home`)}
              className="w-full bg-blue-500 rounded-md px-4 py-1"
            >
              {" "}
              Back to Home
            </button>
          </div>
        </div>
      </div>
      <div className="px-3 w-full">
        {postdata
          ? postdata.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`post-display-section mt-5 pb-3 lg:w-1/2 mx-auto ${
                    isDarkMode ? "bg-[#d2d2d2]" : "bg-zinc-800 "
                  } transition-all hover:bg-[#00000042] rounded-md `}
                >
                  <div className="flex flex-col px-4 pt-4">
                    <div className="flex   items-center ">
                      <img
                        className="w-10 h-10 rounded-full object-cover object-center"
                        src={`${url}/images/${item.userPicturePath}`}
                        alt=""
                      />
                      <div className="ml-5 text-[13px]">
                        <h1 className="font-bold text-[16px]">
                          {item.firstName} {item.lastName}
                        </h1>
                        <p
                          className={`${
                            isDarkMode ? " text-zinc-800" : "text-[#ffffff60] "
                          } `}
                        >
                          {formatTimestampToAgo(item.createdAt)}
                        </p>
                      </div>
                    </div>

                    <div className="ml-3 mt-3">{item.description} </div>
                  </div>

                  <div className="w-[90%] flex justify-center ml-5  rounded-md py-5 ">
                    {item.picturePath ? (
                      <img
                        className="w-[95%]  h-full object-cover object-center rounded-md outline-none border-none"
                        src={`${url}/images/${item.picturePath}`}
                        alt=""
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="flex justify-between w-full px-14">
                    <h1 className="flex gap-2  hover:bg-zinc-700 px-3 py-1 rounded-full  items-center">
                      <AiOutlineLike
                        onClick={async () => {
                          setLikeId(item._id);
                          if (item._id && userinfo._id) {
                            await likeThePost(item._id, userinfo._id);
                            setTriggerEffect(!triggerEffect);
                          }
                        }}
                        className="text-[22px] "
                      />
                      {updatePost
                        ? Object.keys(updatePost.likes).length
                        : Object.keys(item.likes).length}
                    </h1>
                    <h2 className="flex items-center gap-2 hover:bg-zinc-700 px-3 py-1 rounded-full  ">
                      <FaEye /> {Math.floor(Math.random() * 1000)}
                    </h2>
                    <h2 className="flex items-center gap-2 hover:bg-zinc-700 px-3 py-1 rounded-full  ">
                      <BiCommentDetail className="text-[21px]" />
                      {item.comments.length}
                    </h2>
                  </div>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
}

export default Profile;
