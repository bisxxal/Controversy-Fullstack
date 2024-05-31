import { IoImagesOutline } from "react-icons/io5";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineLike } from "react-icons/ai"; 
import { BiCommentDetail } from "react-icons/bi";
import { StoreContext } from "../../context/Context";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function Post() {
  const navigate = useNavigate()
  const [post, setPost] = useState([]);
  const [comment, setComment] = useState([]);
  const { url, userinfo, token, likeId, likeThePost,setLikeId ,updatePost,formatTimestampToAgo ,isDarkMode} = useContext(StoreContext);
  const [image, setImage] = useState(false);
  const [triggerEffect, setTriggerEffect] = useState(false);
  const [showCommentBoxForPost, setShowCommentBoxForPost] = useState(null);

  const getPost = async () => {
    const responce = await axios.get(`${url}/post`,{headers:{token}});
    if (responce.data.sucess) { 
      const reversedPosts = responce.data.post.reverse();  
      setPost(reversedPosts);
    } else {
      console.log("errpr");
    }
  };

  useEffect(() => {
    const gettingEffectPost = async () => {
      await getPost();
    };
    gettingEffectPost();
  }, [triggerEffect]);  

  const [data, setData] = useState();
  const onSumbithandeler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("description", data);
    formData.append("image", image);
    formData.append("userId", userinfo._id); 
    const responce = await axios.post(`${url}/posts`, formData, {
      headers: { token },
    });

    if (responce.data.success) {
      setTriggerEffect(!triggerEffect);
      setData(""); 
      setImage(null);  
    }  
  };

  const onSumbitcomment = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("comment", comment); 
    formData.append("firstName", userinfo.firstName ); 
   await axios.patch(url+`/post/${likeId}/comment` , {firstName:userinfo.firstName, comment},{headers:{token}})
    setTriggerEffect(!triggerEffect);
  };
 
  return (
    <div className=" ">
      <form
        onSubmit={onSumbithandeler}
        className={`post-section rounded-md w-full lg:w-[600px] ${isDarkMode?'bg-[#d2d2d2]' :'bg-zinc-800 '} mb-6 pt-5 pb-2 px-3  `}
      >
        <div className="flex justify-between">
          <img
            className="w-10 h-10 rounded-full object-cover object-center"
            src={`${url}/images/${userinfo.picturePath}`}
            alt=""
          />
          <input
          required
            type="text"
            name="description"
            value={data}
            onChange={(e) => setData(e.target.value)}
            placeholder="Write on your mind ..."
            className={`text-[15px] px-3 rounded-full w-[85%] lg:w-[90%] ${isDarkMode?' bg-zinc-400 text-black' :' bg-zinc-700 '} outline-none`}
          />
        </div>
        <div className={`flex border-t-[2px] ${isDarkMode?' border-t-zinc-400 ' :' border-t-zinc-600 '} py-2 px-2 items-center justify-between mt-5 `}>
          <div className={`flex items-center gap-3 hover:bg-zinc-700 px-4 py-2 rounded-full text-sm text-zinc-400 `}>
            <input
               
              name="image"
              onChange={(e) => setImage(e.target.files[0])}
              className={` opacity-0 px-3 py-1 absolute w-[80px] rounded-md bg-transparent `}
              type="file"
            />
            <IoImagesOutline className="text-[22px] text-blue-600" /> Image
          </div>

          <button
          onClick={()=>{  
            setTriggerEffect(!triggerEffect); 
          }} 
            type="sumbit"
            className="bg-blue-500 text-lg font-medium px-4 py-1 rounded-md"
          >
            Post
          </button>
        </div>
      </form>

      {post
        ? post.map((item, index) => { 
          const likesArray = Array.isArray(item.likes) ? item.likes : Object.keys(item.likes);
          const userLikedPost = likesArray.some((like) => like === userinfo._id);

            return (
              <div
                key={index}
                className={`post-display-section mt-5 pb-3 lg:w-[600px] ${isDarkMode?'bg-[#d2d2d2]' :'bg-zinc-800 '} transition-all hover:bg-[#00000042] rounded-md `}
              >
                <div className="flex flex-col px-4 pt-4">
                  <div className="flex   items-center ">
                    <img
                    onClick={() => navigate(`/profile/${item.userId}`)}
                      className="w-10 h-10 rounded-full object-cover cursor-pointer object-center"
                      src={`${url}/images/${item.userPicturePath}`}
                      alt=""
                    />
                    <div className="ml-5 text-[13px]">
                      <h1 className="font-bold text-[16px]">
                        {item.firstName} {item.lastName}
                      </h1>
                        <p  className={`${isDarkMode?' text-zinc-800' :'text-[#ffffff60] '} `}>{formatTimestampToAgo(item.createdAt)}</p>
                    </div>
                  </div>

                  <div className="ml-3 mt-3">{item.description} </div>
                </div>

                <div className="w-[90%] flex justify-center ml-5  rounded-md py-5 ">
                    {
                        item.picturePath ?<img
                    className="w-[95%]  h-full object-cover object-center rounded-md outline-none border-none"
                    src={`${url}/images/${item.picturePath}`}
                    alt=""
                  /> :''
                    }
                  
                </div>
                <div className="flex justify-between w-full px-14">
                    <h1 className={`${userLikedPost ? 'bg-[#ff00004 ':''} flex gap-2 cursor-pointer  hover:bg-zinc-700 px-3 py-1 rounded-full  items-center`}>
 
                  <AiOutlineLike onClick={async()=>{ 
                      setLikeId(item._id);
                      if (item._id && userinfo._id) {
                          await likeThePost(item._id, userinfo._id);
                          setTriggerEffect(!triggerEffect);
                      }
                    }} className={`${userLikedPost ? 'text-red-600  text-[24px] ':''} text-[22px] `} />
                  {updatePost ?Object.keys(updatePost.likes).length :Object.keys(item.likes).length}
                    </h1>
                  <h2 className="flex items-center gap-2 hover:bg-zinc-700 px-3 py-1 rounded-full  ">
                    <FaEye /> {item.views}
                  </h2>
                  <h2 onClick={() => setShowCommentBoxForPost(item._id === showCommentBoxForPost ? null : item._id)}
                   className="flex items-center gap-2 cursor-pointer  hover:bg-zinc-700 px-3 py-1 rounded-full  " >
                  <BiCommentDetail 
                   className="text-[21px] " />{item.comments.length}
                 
                 
                  </h2>
                </div>
                <div>

                {showCommentBoxForPost === item._id && (
                       <form onSubmit={onSumbitcomment} className="px-8 w-[90%] py-4 bg-zinc-700 mx-auto mt-5 rounded-md">  
                  <> 
                  <div className="flex justify-between bg-[#ffffffbf] rounded-md  w-full">
                    <input
                       required 
                       name="comment"
                       value={comment}
                       onClick={setLikeId(item._id)}
                       onChange={(e) =>
                       
                       setComment(e.target.value)} className=" text-black outline-none border-none px-3 w-full bg-transparent py-2" placeholder="Comment here" type="text" />
                      <button  onClick={()=>{  
                        setTriggerEffect(!triggerEffect); 
                      }}  className=" rounded-r-md py-2 px-4 bg-yellow-500" type="sumbit">Post</button>
                    </div> 
                    

                  <h1 className="mt-3 font-semibold">Top Comments :</h1>
                    <div className="mt-3">
                     <h1 className=""> {item.comments.map((com, idx) => {
                        return <p className="bg-zinc-800 rounded-md w-[70%] text-sm py-1 px-3 mb-1 text-zinc-400" key={idx}>@ {com.firstName? com.firstName: "SomeOne "} : <span className="text-white font-mediu">{com.comment}</span></p>;
                      })}
                      </h1>
                    </div>

                    
                  </>
                    </form>
                    )}
               

                    </div>

              </div>
            );
          })
        : ""}
    </div>
  );
}

export default Post;
