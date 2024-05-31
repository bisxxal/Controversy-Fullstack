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

    const featchUser= async(id,token)=>{
        const responce  = await axios.get(url+`/user/${id}`,{headers:{token}})
        setUserInfo(responce.data)
        
    } 
      const featchUserFriend= async(id ,token)=>{ 
        const responce  = await axios.get(url+`/user/${id}/friends`,{headers:{token}})
        setFriendsInfo(responce.data)
        
    } 
      const mightknowfriend= async(id,token)=>{
        const responce  = await axios.post(url+`/user/allfriends`,{id},{headers:{token}})
        setMightknow(responce.data.allFriend)
        
    } 
  const addfriendOrRemove= async(id,friendId ,token)=>{
      await axios.patch(`http://localhost:5000/user/${id}/${friendId}`,{headers:{token}})
      console.log('addd');
  
} 
const logout = ()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    setToken('')
    setUserId('')

    navigate('/')
  }

  const likeThePost  = async(likeId , userId)=>{
    const responce  = await axios.patch(url+`/post/${likeId}/like` , {userId},{headers:{token}})
setUpdatedPost(responce.data)
  }
   
    useEffect(() => {
        const updateFriends = async () => {
            if (userId && findId  && token) {
                await addfriendOrRemove(userId, findId ,token);
                await featchUserFriend(userId ,token)
            }
        };

        updateFriends();
    }, [findId]);

// console.log(token);
    useEffect(() => {
        
        const getList = async () => {
            if (localStorage.getItem("token")  ){
                const userI = localStorage.getItem("id");
                const userToken = localStorage.getItem("token");

                setUserId(userI);
                setToken(userToken);
                
                await featchUser(userI ,userToken)
                await featchUserFriend(userI ,userToken)
                await mightknowfriend(userI,userToken)
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
