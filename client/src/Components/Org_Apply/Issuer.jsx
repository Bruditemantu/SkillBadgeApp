import React, { useState } from 'react';
import Axios from 'axios';
import "./Issuer.css";
const Issuer = () => {
  const [formData, setFormData] = useState({
    Organisation_Name: "",
    organisation_domain: "",
    organisation_size: "",
    badges_and_types: "",
  });



  const { Organisation_Name, organisation_domain, organisation_size, badges_and_types} = formData;

  const onChangeInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await Axios.post(
      "http://127.0.0.1:8000/api/org/apply_for_issuer",
      formData,
      config
    );
    console.log(response.data);
  };

  return (
    <>
      <div className="backgroundd">
        <form onSubmit={onSubmitHandler}>
          <h3>Edit Issuer Details</h3>
            
              <label htmlFor="OrganisationName">Organisation Name</label>
              <input
                onChange={onChangeInput}
                value={Organisation_Name}
                type="text"
                placeholder="Enter Organisation Name"
                name="OrganisationName"
                required
              />
              <label htmlFor="organisation_domain">Organisation Domain</label>
              <input
                value={organisation_domain}
                onChange={onChangeInput}
                type="text"
                placeholder="Enter Organisation Domain"
                id="organisation_domain"
                name="organisation_domain"
                required
              />
              <label htmlFor="organisation_size">Organisation Size</label>
              <input
                value={organisation_size}
                onChange={onChangeInput}
                type="text"
                placeholder="Enter Organisation Size"
                id="organisation_size"
                name="organisation_size"
                required
              />
           
            
            <label htmlFor="badges_and_types">Badges and Types</label>
            <input
              value={badges_and_types}
              onChange={onChangeInput}
              type="text"
              placeholder="Enter Badges and Types"
              id="badges_and_types"
              name="badges_and_types"
              required
            />

<button type="submit">Apply</button>
          
        </form>
      </div>
    </>
  );
};

export default Issuer;
