import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./EditProfile.css";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    name: "",
    contact_info: "",
    email: "",
  });

  const onChangeInput = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handlePatchAPI = async () => {
    try {
      const response = await Axios.patch(
        "http://127.0.0.1:8000/api/recipient/update-user/",
        {
          name: userData.name,
          contact_info: userData.contact_info,
        },
        {
          headers: {
            Authorization: "token 3de2cd0cef5ce4c86730bd8cacb777ea6b62cc56", // Replace with your authentication token
          },
        }
      );

      console.log("Profile updated successfully:", response.data);
      // You can add a success message or redirect the user to another page
      navigate("/user");
    } catch (error) {
      console.error("Error updating user profile:", error);
      // Handle the error, display an error message, or redirect the user accordingly
    }
  };

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

        setUserData({
          name: response.data.data.name,
          contact_info: response.data.data.contact_info,
          username: response.data.data.username,
          email: response.data.data.email,
        });
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  return (
    <>
      <div className="container1">
        <div className="leftrectangle1">
          <div className="title1">SKILLBADGE</div>
          <div className="line1"></div>
          <div className="firstoption1" onClick={() => navigate("/userdash")}>
            <div className="icon1">
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
            <div className="text1">User Profile</div>
          </div>
          <div className="secondoption1" onClick={() => navigate("/allbadges")}>
            <div className="icon1">
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
            <div className="text1">All Badge</div>
          </div>
          <div className="profileimage1">
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
          <div className="name1">{userData.username}</div>
          <div className="email1">{userData.email}</div>
        </div>
        <div class="rightrectangle1">
          <form
            class="form1"
            onSubmit={(e) => {
              e.preventDefault();
              handlePatchAPI();
            }}
          >
            <h3>Update Profile</h3>
            <div className="form-feilds">
              <div className="left">
                <label htmlFor="name">Name</label>
                <input
                  onChange={onChangeInput}
                  value={userData.name}
                  type="text"
                  placeholder="Enter Name"
                  name="name"
                  required
                />
                <label htmlFor="email">Email</label>
                <input
                  value={userData.email}
                  type="email"
                  placeholder="Enter Email"
                  id="email"
                  name="email"
                  readOnly // Prevent editing
                />
              </div>
              <div className="right">
                <label htmlFor="username">Username</label>
                <input
                  value={userData.username}
                  type="text"
                  placeholder="Enter Username"
                  id="username"
                  name="username"
                  readOnly // Prevent editing
                />
                <label htmlFor="contact_info">Contact Info</label>
                <input
                  value={userData.contact_info}
                  onChange={onChangeInput}
                  type="text"
                  placeholder="Enter Contact Info"
                  id="contact_info"
                  name="contact_info"
                  required
                />
              </div>
            </div>
            <button type="submit">Update Profile </button>
            <a href="/login">Already Registered? Sign-In</a>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
