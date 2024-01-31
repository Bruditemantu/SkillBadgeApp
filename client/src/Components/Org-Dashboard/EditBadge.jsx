import React, { useState } from "react";
import Axios from "axios";
import InputField from "./InputField.js";
import CustomBtn from "./CustomBtn";

const EditBadge = () => {
  const [formData, setFormData] = useState({
    name: "",
    criteria: "",
    description: "",
    image_url: null,
    expiration_durations: 0,
  });

  const [isEditBadge, setIsEditBadge] = useState(false);
  const [errormsg, setErrormsg] = useState("");

  const { name, criteria, description, expiration_durations } = formData;

  const onChangeInput = (e) => {
    if (e.target.name === "image_url") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization:`token ${localStorage.getItem('token')}`,
      },
    };
     try {
      const response = await Axios.put("http://127.0.0.1:8000/api/org/crud/", formData, config);
      console.log(response);
      setIsEditBadge(true);
    } catch (error) {
      setErrormsg("Error creating badge");
      console.error(error);
    }
  };

  return (
    <>
    <div className="bg-[#121212] flex items-center justify-center h-screen">
      <div className="bg-[#161616] p-8 rounded shadow-md w-3/4 lg:w-2/4">
        <h2 className="text-xl font-medium text-white text-center mb-4 font-roboto tracking-wider">
          CREATE Badge
        </h2>
        <form
          className="flex space-x-4 flex-wrap justify-center"
          onSubmit={onSubmitHandler}
        >
          {isEditBadge ? (
            <p className="text-green-500 text-center">Create Badge Successful</p>
          ) : (
            <p className="text-red-500 text-center">{errormsg}</p>
          )}
          <div className="mb-4 w-64">
            <InputField
              label="Name"
              type="text"
              id="name"
              placeholder="Enter name"
              name="name"
              value={name}
              onChange={onChangeInput}
            />
          </div>

          <div className="mb-4 w-64">
            <InputField
              label="Description"
              type="textarea"
              id="description"
              placeholder="Enter description"
              name="description"
              value={description}
              onChange={onChangeInput}
            />
          </div>

          <div className="mb-4 w-64">
            <InputField
              label="Criteria"
              type="text"
              id="criteria"
              placeholder="Enter criteria"
              name="criteria"
              value={criteria}
              onChange={onChangeInput}
            />
          </div>

          <div className="mb-4 w-64">
            <InputField
              label="Upload Badge Image"
              type="file"
              id="image_url"
              name="image_url"
              accept=".png"
              required
              onChange={onChangeInput}
            />
          </div>

          <div className="mb-4 w-64">
            <InputField
              label="Expiration Durations"
              type="number"
              id="expiration_durations"
              name="expiration_durations"
              value={expiration_durations}
              onChange={onChangeInput}
              required
            />
          </div>

          <div className="w-full flex justify-center">
            <CustomBtn type="submit" label="Create Badge" />
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default EditBadge;
