import React, { useState } from "react";
import { assets } from "../assets/assets";

const RecruiterLogin = () => {
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file)
    if (file) {
      setImage(file);
      // Create a preview URL for the selected image
      const reader = new FileReader();
      reader.onloadend = () => {  
        console.log(reader.result)
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const OnhandleSubmit = async (e) => {
    e.preventDefault();
    if (state === "SignUp") {
      if (!isTextDataSubmitted) {
        // First step: validate and submit text data
        if (name && email && password) {
          setIsTextDataSubmitted(true);
        }
      } else {
        // Second step: handle image upload and final submission
        // Add your image upload and final submission logic here
        console.log("Final submission with image");
      }
    } else {
      // Handle login logic
      console.log("Login submission");
    }
  };

  const toggleState = () => {
    setState((prev) => (prev === "Login" ? "SignUp" : "Login"));
    // Reset the form state when toggling
    setIsTextDataSubmitted(false);
    setName("");
    setEmail("");
    setPassword("");
    setImage(null);
    setImagePreview(null);
  };

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/50 flex justify-center items-center">
      <form
        onSubmit={OnhandleSubmit}
        className="bg-white w-[90%] max-w-md rounded-2xl shadow-xl p-8 space-y-6"
      >
        <h1 className="text-2xl font-bold text-sky-700 text-center">
          Recruiter {state}
        </h1>
        <p className="text-gray-600 text-center">
          Welcome back, please {state} to continue
        </p>
        {state === "SignUp" && isTextDataSubmitted ? (
          <div className="space-y-4">
            <p className="text-center text-gray-700 font-medium">Add your company logo</p>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {imagePreview ? (
                <div className="space-y-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-48 mx-auto rounded-lg"
                  />
                  <div className="flex justify-center gap-2">
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer text-sky-700 hover:text-sky-800 bg-sky-50 px-4 py-2 rounded-lg"
                    >
                      Change Image
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setImage(null);
                        setImagePreview(null);
                      }}
                      className="text-red-600 hover:text-red-700 bg-red-50 px-4 py-2 rounded-lg"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer text-sky-700 hover:text-sky-800"
                >
                  Click to upload image
                </label>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
              />
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {state !== "Login" && (
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                  <img
                    src={assets.person_icon}
                    alt="Company Name"
                    className="w-5 h-5 mr-3"
                  />
                  <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    type="text"
                    placeholder="Company Name"
                    required
                    className="w-full focus:outline-none text-gray-800"
                  />
                </div>
              )}

              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                <img
                  src={assets.email_icon}
                  alt="Email"
                  className="w-5 h-5 mr-3"
                />
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  placeholder="Email"
                  required
                  className="w-full focus:outline-none text-gray-800"
                />
              </div>

              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                <img
                  src={assets.lock_icon}
                  alt="Password"
                  className="w-5 h-5 mr-3"
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  placeholder="Password"
                  required
                  className="w-full focus:outline-none text-gray-800"
                />
              </div>

              {state === "Login" && (
                <div className="text-right">
                  <button
                    type="button"
                    className="text-sm text-sky-700 hover:underline"
                    onClick={() => alert("Redirect to forgot password logic")}
                  >
                    Forgot Password?
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full bg-sky-700 hover:bg-sky-800 text-white py-2 rounded-lg font-semibold transition duration-300"
        >
          {state === "Login" ? "Login" : isTextDataSubmitted ? "Create Account" : "Next"}
        </button>

        <p className="text-center text-gray-600">
          {state === "Login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={toggleState}
            className="text-sky-700 hover:underline font-medium"
          >
            {state === "Login" ? "Sign Up" : "Login"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default RecruiterLogin;
