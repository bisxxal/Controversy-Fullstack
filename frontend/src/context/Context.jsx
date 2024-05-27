import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow, parseISO } from 'date-fns';


export const StoreContext = createContext();

const StoreContextProvider = (props) => {
    const navigate = useNavigate()
    const [dark, setDark] = useState(false);
    const url = 'http://localhost:5000'
    const [token , setToken] = useState('')
    const [userId  ,setUserId] = useState([])
    const [userinfo , setUserInfo] = useState([]) 
    const [friendsinfo , setFriendsInfo] = useState([]) 
    const [mightknow , setMightknow] = useState([]) 
    const [findId , setFindId] = useState()
    const[likeId , setLikeId] = useState()
    const [updatePost ,setUpdatedPost] = useState()
    const [isDarkMode, setDarkMode] =useState(false);

    const toggleDarkMode = () => {
      setDarkMode(!isDarkMode);
    };
    function formatTimestampToAgo(timestamp) {
        const parsedTimestamp = parseISO(timestamp);
        return formatDistanceToNow(parsedTimestamp, { addSuffix: true });
      } 

    const featchUser= async(id)=>{
        const responce  = await axios.get(url+`/user/${id}`)
        setUserInfo(responce.data)
        
    } 
      const featchUserFriend= async(id)=>{ 
        const responce  = await axios.get(url+`/user/${id}/friends`)
        setFriendsInfo(responce.data)
        
    } 
      const mightknowfriend= async(id)=>{
        const responce  = await axios.post(url+`/user/allfriends`)
        setMightknow(responce.data.allFriend)
        
    } 
  const addfriendOrRemove= async(id,friendId)=>{
      await axios.patch(`http://localhost:5000/user/${id}/${friendId}`)
  
} 
const logout = ()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    setToken('')
    setUserId('')

    navigate('/')
  }

  const likeThePost  = async(likeId , userId)=>{
    const responce  = await axios.patch(url+`/post/${likeId}/like` , {userId})
setUpdatedPost(responce.data)
  }
   
    useEffect(() => {
        const updateFriends = async () => {
            if (userId && findId  && token) {
                await addfriendOrRemove(userId, findId);
                await featchUserFriend(userId)
            }
        };

        updateFriends();
    }, [findId]);


    useEffect(() => {
        
        const getList = async () => {
            if (localStorage.getItem("token")  ){
                const userI = localStorage.getItem("id");
                const userToken = localStorage.getItem("token");

                setUserId(userI);
                setToken(userToken);
                
                await featchUser(userI)
                await featchUserFriend(userI)
                await mightknowfriend()
            }
        };

        getList(); 
    }, [ ]);

  
    const data = { 
        dark, setDark,url,token ,setToken,updatePost,userId ,findId ,likeThePost, 
        likeId ,setLikeId ,addfriendOrRemove, setFindId ,setUserId,logout ,mightknow,userinfo ,
         setUserInfo,friendsinfo,setFriendsInfo ,isDarkMode,toggleDarkMode,formatTimestampToAgo };
         
    return (
        <StoreContext.Provider value={data}>
            {props.children}
        </StoreContext.Provider>
    );
}

export default StoreContextProvider;
