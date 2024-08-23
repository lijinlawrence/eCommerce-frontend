import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../Redux/actions/userActions";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerFail } from "../../Redux/slices/authSlice";
import MetaData from "../utils/MetaData";
import defaultAvatar from "../../assets/images/default_avatar.png";

const Register = () => {
  // State to hold user input
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [avatar, setAvatar] = useState("");
  const [avatarPreview , setAvatarPreview]= useState(defaultAvatar)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.authState
  );

  // Effect to handle authentication and error state
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
      toast.success("Registered successfully");
    }

    if (error) {
      toast.error(error);
      dispatch(registerFail(null));
    }
  }, [error, isAuthenticated, dispatch, navigate]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file){
      const reader = new FileReader(); // this is object and handleing asyc operatiom
      reader.onload=()=>{
        setAvatarPreview(reader.result) // to read url for preview and only way to acces url for calling result
        
      }
      setAvatar(file)
      reader.readAsDataURL(file) // convert file to url
    }
  
   
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // const { name, email, password, avatar } = user;
    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("password", user.password);
    if(avatar){
      formData.append("avatar", avatar);}
    dispatch(register(formData));
    
  };

  return (
    <>
      {/* Meta data for the page */}
      <MetaData title={"Register Page"} />

      <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md p-8 space-y-3 bg-white rounded-xl shadow-md">
          <h1 className="text-2xl font-bold text-center">Create New Account</h1>

          {/* Registration form */}
          <form className="space-y-6" onSubmit={handleFormSubmit}>
            {/* Name input field */}
            <div className="space-y-1">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={user.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            {/* Email input field */}
            <div className="space-y-1">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            {/* Password input field */}
            <div className="space-y-1">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>

            {/* Profile avatar input field */}
            <div className="space-y-1">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="avatar"
              >
                Profile Avatar
              </label>
              <div className="flex gap-5 justify-center items-center">
                {/* Display avatar preview */}

                <div className="flex justify-center">
                  <img
                    src={avatarPreview}
                    alt="Avatar Preview"
                    className="w-20 h-16 rounded-full"
                  />
                </div>

                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/*" // for resiriction onlu accept image type only example .jpg , .png etc..
                  onChange={handleFileChange}
                  className="w-full file-input px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>
            </div>

            {/* Submit button with loading state */}
            <button
              type="submit"
              className="w-full py-2 font-medium text-white bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </form>

          {/* Navigation link to login */}
          <p className="text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-sm text-blue-500 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
