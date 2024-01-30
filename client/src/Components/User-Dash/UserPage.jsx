import React, { useState, useEffect } from "react";
import "./UserPage.css";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import AOS from "aos";

import "aos/dist/aos.css";
function UserPage() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    username: "",
    contact_info: "",
  });

  const [badgedata, setbadgedata] = useState([]);
  useEffect(() => {
    const fetchBadgeData = async () => {
      try {
        const response = await Axios.get(
          "http://127.0.0.1:8000/api/recipient/allbadges/",
          {
            headers: {
              Authorization: "token 3de2cd0cef5ce4c86730bd8cacb777ea6b62cc56", // Replace with your authentication token
            },
          }
        );

        setbadgedata(response.data[0]);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchBadgeData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await Axios.get(
          "http://127.0.0.1:8000/api/recipient/alluser/",
          {
            headers: {
              Authorization: "token 3de2cd0cef5ce4c86730bd8cacb777ea6b62cc56", // Replace with your authentication token
            },
          }
        );

        setUserData(response.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }); // Empty dependency array ensures that the effect runs only once, similar to componentDidMount

  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
  });
  return (
    <div className="container">
      {/* ... (rest of your component) */}

      <div className="leftrectangle" data-aos="slide-right">
        <div className="title">SKILLBADGE</div>
        <div className="line"></div>
        <div className="firstoption" onClick={() => navigate("/editprofile")}>
          <div className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24"
              viewBox="0 0 22 23"
              fill="none"
            >
              <rect width="22" height="23" fill="None" />
              <path
                d="M12.8883 8.64417L13.7317 9.52583L5.42667 18.2083H4.58333V17.3267L12.8883 8.64417ZM16.1883 2.875C15.9592 2.875 15.7208 2.97083 15.5467 3.15292L13.8692 4.90667L17.3067 8.50042L18.9842 6.74667C19.0691 6.65801 19.1366 6.5527 19.1826 6.43676C19.2286 6.32083 19.2522 6.19655 19.2522 6.07104C19.2522 5.94553 19.2286 5.82125 19.1826 5.70532C19.1366 5.58939 19.0691 5.48408 18.9842 5.39542L16.8392 3.15292C16.6558 2.96125 16.4267 2.875 16.1883 2.875ZM12.8883 5.93208L2.75 16.5312V20.125H6.1875L16.3258 9.52583L12.8883 5.93208Z"
                fill="#FFFDFD"
              />
            </svg>
          </div>
          <div className="text">Edit Profile</div>
        </div>
        <div className="secondoption" onClick={() => navigate("/allbadges")}>
          <div className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
            >
              <rect width="25" height="24" fill="None" />
              <path
                d="M21.875 11C21.875 16.55 17.875 21.74 12.5 23C7.125 21.74 3.125 16.55 3.125 11V5L12.5 1L21.875 5V11ZM12.5 21C16.4062 20 19.7917 15.54 19.7917 11.22V6.3L12.5 3.18L5.20833 6.3V11.22C5.20833 15.54 8.59375 20 12.5 21ZM15.6771 16L12.4688 14.15L9.27083 16L10.1146 12.5L7.29167 10.16L11.0208 9.85L12.4688 6.55L13.9271 9.84L17.6562 10.15L14.8229 12.5L15.6771 16Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="text">All Badge</div>
        </div>
        <div className="profileimage">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="88"
            height="80"
            viewBox="0 0 88 80"
            fill="none"
          >
            <ellipse cx="44" cy="40" rx="44" ry="40" fill="#4D4545" />
          </svg>
        </div>
        <div className="name">{userData.username}</div>
        <div className="email">{userData.contact_info}</div>
        <div className="email">{userData.email}</div>
      </div>

      <div className="rightrectangle">
        <div className="upper">
          <div className="username">{userData.name}</div>
          <div className="logout">
            <button className="logoutbtn" onClick={() => navigate("/login")}>
              Logout
            </button>
          </div>
        </div>
        <div className="lower">
          <h2>Badges</h2>
          <div className="badges">
            <div className="content">
              <li>Name:{badgedata.name}</li>
              <li>Issue Date:{badgedata.date_created}</li>
              <li>Expiry Date:{badgedata.expiration_durations}</li>
            </div>
            <div className="badgeimage" data-aos="flip-left">
              <img
                src={`http://127.0.0.1:8000${badgedata.image_url}`}
                alt="badgeimage"
                width={"100px"}
                height={"100px"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
