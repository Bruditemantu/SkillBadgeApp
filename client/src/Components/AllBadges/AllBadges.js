import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AllBadges.css';
import Axios  from 'axios';
import { useState ,useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";


const AllBadges = () => {
    const navigate = useNavigate();
    
    const [userData, setUserData] = useState([]); // Initialize as an empty array
    useEffect(() => {
        
      const fetchUserData = async () => {
        try {
          const response = await Axios.get("http://127.0.0.1:8000/api/recipient/allbadges/", {
            headers: {
              Authorization: "token 3de2cd0cef5ce4c86730bd8cacb777ea6b62cc56", // Replace with your authentication token
            },
          });
          
          setUserData(response.data);
          
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
      console.log(userData);
      console.log(userData.image_url);
      
      
      
  }, []);

  const [user, setUser] = useState({
    email: '',
    username: '',
  });
  useEffect(() => {
    
    const UserData = async () => {
      try {
        const response = await Axios.get("http://127.0.0.1:8000/api/recipient/alluser/", {
          headers: {
            Authorization: "token 3de2cd0cef5ce4c86730bd8cacb777ea6b62cc56", // Replace with your authentication token
          },
        });
        
        setUser(response.data.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    UserData();
    
}, []);



useEffect(()=>{
  AOS.init({
    offset: 200,
    duration: 600,
    easing: 'ease-in-sine',
    delay: 100,
  });
})

  return (
    
    <div className="container1">
        <div className="leftrectangle1" data-aos= "slide-right">
         <div className="title1">
           SKILLBADGE
         </div>
         <div className="line1">
         </div>
         <div className="firstoption1" onClick={()=>navigate('/user')}>
           <div className="icon1">
            
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<rect width="24" height="24" fill="None"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 7C8 5.93913 8.42143 4.92172 9.17157 4.17157C9.92172 3.42143 10.9391 3 12 3C13.0609 3 14.0783 3.42143 14.8284 4.17157C15.5786 4.92172 16 5.93913 16 7C16 8.06087 15.5786 9.07828 14.8284 9.82843C14.0783 10.5786 13.0609 11 12 11C10.9391 11 9.92172 10.5786 9.17157 9.82843C8.42143 9.07828 8 8.06087 8 7ZM8 13C6.67392 13 5.40215 13.5268 4.46447 14.4645C3.52678 15.4021 3 16.6739 3 18C3 18.7956 3.31607 19.5587 3.87868 20.1213C4.44129 20.6839 5.20435 21 6 21H18C18.7956 21 19.5587 20.6839 20.1213 20.1213C20.6839 19.5587 21 18.7956 21 18C21 16.6739 20.4732 15.4021 19.5355 14.4645C18.5979 13.5268 17.3261 13 16 13H8Z" fill="#F5EBEB"/>
</svg>
           </div>
           <div className="text1">
            User Profile
           </div>
  </div>
      
         <div className="secondoption1" onClick={()=> navigate('/editprofile')}>
           <div className="icon1">
           <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 22 23" fill="none">
<rect width="22" height="23" fill="None"/>
<path d="M12.8883 8.64417L13.7317 9.52583L5.42667 18.2083H4.58333V17.3267L12.8883 8.64417ZM16.1883 2.875C15.9592 2.875 15.7208 2.97083 15.5467 3.15292L13.8692 4.90667L17.3067 8.50042L18.9842 6.74667C19.0691 6.65801 19.1366 6.5527 19.1826 6.43676C19.2286 6.32083 19.2522 6.19655 19.2522 6.07104C19.2522 5.94553 19.2286 5.82125 19.1826 5.70532C19.1366 5.58939 19.0691 5.48408 18.9842 5.39542L16.8392 3.15292C16.6558 2.96125 16.4267 2.875 16.1883 2.875ZM12.8883 5.93208L2.75 16.5312V20.125H6.1875L16.3258 9.52583L12.8883 5.93208Z" fill="#FFFDFD"/>
</svg>


           </div>
           <div className="text1">
             Edit Profile
           </div>
         </div>
         <div className="profileimage1">
         <svg xmlns="http://www.w3.org/2000/svg" width="88" height="80" viewBox="0 0 88 80" fill="None">
   <ellipse cx="44" cy="40" rx="44" ry="40" fill="white"/>
   </svg>
         </div>
         <div className="name1">
          
          {user.username}
         </div>
         <div className="email1">
           
           {user.contact_info}
         </div>
         <div className="email1">
           
           {user.email}
         </div>
      </div>
      
       <div className='rightrectanglebadge'>
        {userData.map((badge, index) => (
          <div key={index} className='firstbadge' >
             <img src={`http://127.0.0.1:8000${badge.image_url}`} alt={`badge_${index}`} width={'100px'} height={'100px'}   data-aos= "flip-right"/>
             
           <p>{badge.name}</p>
            <p>{badge.date_created}</p>
            {/* <p>{badge.description}</p> */}
            <p>{badge.expiration_durations}</p>
          </div>
        ))}
      
        
    </div>
      
    </div>
  )
}

export default AllBadges