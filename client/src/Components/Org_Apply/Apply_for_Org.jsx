import React, { useState } from 'react';
import Axios from 'axios';
import InputField from "../InputField";
import CustomBtn from "../CustomBtn";

const Apply_for_Org = () => {
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
      "http://127.0.0.1:8000/api/org/apply_for_org",
      formData,
      config
    );
    console.log(response.data);
  };

  return (
    <>
      <div className=" bg-[#121212] flex items-center justify-center h-screen">
        <div className="bg-[#161616] p-8 rounded shadow-md w-3/4 lg:w-2/4">
          <h2 class="text-xl  font-medium text-white text-center mb-4 font-roboto tracking-wider">
            Apply For Organisation
          </h2>
          <form className="flex  space-x-4 flex-wrap justify-center ">
            <div class="mb-4 w-60 ">
              <InputField
                // value={Organisation_Name}
                label="Organisation Name"
                type="text"
                id="Organisation_Name"

                placeholder="Enter Organisation Name"
                name="Organisation_Name"
              />
            </div>

            <div class="mb-4 w-60 ">
              <InputField
              // value={organisation_domain}
                label="Organisation Domain"
                type="text"
                id="Organisation_Domain"
                placeholder="Enter Organisation Domain"
                name="Organisation_Domain"
              />
            </div>

            <div class="mb-4 w-60 ">
              <InputField
              // value={organisation_size}
                label="Organisation Size"
                type="number"
                id="organisation_size"
                placeholder="Enter Organisation Size"
                name="organisation_size"
              />
            </div>

            <div class="mb-4 w-60 ">
              <InputField
                value={badges_and_types}
                label="Badges Type"
                type="text"
                id="badges_and_types"
                placeholder="Enter Badges Types"
                name="badges_and_types"
              />
            </div>

 


           <div className='mb-4 w-60 flex justify-center'>

            <CustomBtn type="submit" label="Submit" />
           </div>
          </form>
          
        </div>
      </div>
    </>
  );
};
export default Apply_for_Org;
