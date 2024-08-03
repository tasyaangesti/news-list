import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

export function Register() {
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/register", data);
      console.log(response.data, ">> register");
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setRegisterError("Email is already registered.");
      } else {
        setRegisterError("An error occurred. Please try again.");
      }
      console.log(error);
    }
  };

  return (
    <div>
      <div
        className="h-screen flex justify-center items-center w-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-xl max-w-sm">
            <div className="space-y-4">
              <h1 className="text-center text-2xl font-semibold text-gray-600">
                Register
              </h1>
              <hr />
              {/* firstname */}
              <div className="flex flex-col mb-4">
                <div className="flex items-center border-2 py-2 px-3 rounded-md">
                  <input
                    className="pl-2 outline-none border-none w-full"
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="First Name"
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                  />
                </div>
                {errors.firstName && (
                  <p className="text-red-500 text-sm ml-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              {/* lastname */}
              <div className="flex flex-col mb-4">
                <div className="flex items-center border-2 py-2 px-3 rounded-md">
                  <input
                    className="pl-2 outline-none border-none w-full"
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Last Name"
                    {...register("lastName", {
                      required: "Last Name is required",
                    })}
                  />
                </div>
                {errors.lastName && (
                  <p className="text-red-500 text-sm ml-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
              {/* phone number */}
              <div className="flex flex-col mb-4">
                <div className="flex items-center border-2 py-2 px-3 rounded-md">
                  <input
                    className="pl-2 outline-none border-none w-full"
                    type="tel"
                    name="phoneNumber"
                    id="phoneNumber"
                    placeholder="Phone Number"
                    {...register("phoneNumber", {
                      required: "Phone Number is required",
                    })}
                  />
                </div>
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm ml-1">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
              {/* email */}
              <div className="flex flex-col mb-4">
                <div className="flex items-center border-2 py-2 px-3 rounded-md">
                  <input
                    className="pl-2 outline-none border-none w-full"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    {...register("email", {
                      required: "Email is required",
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm ml-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              {/* password */}
              <div className="flex flex-col mb-4">
                <div className="flex items-center border-2 py-2 px-3 rounded-md">
                  <input
                    className="pl-2 outline-none border-none w-full"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm ml-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
            {registerError && (
              <div className="text-red-500 text-center ml-4">
                {registerError}
              </div>
            )}
            <button
              type="submit"
              id="register"
              className="mt-6 w-full shadow-xl bg-black text-indigo-100 py-2 rounded-md text-lg tracking-wide transition duration-1000"
            >
              Register
            </button>
            <hr />
            <div className="flex justify-center items-center mt-4">
              <p className="inline-flex items-center text-gray-700 font-medium text-xs text-center">
                <span className="ml-2">
                  Already have an account?
                  <Link
                    to="/login"
                    className="text-xs ml-2 text-blue-500 font-semibold"
                  >
                    Login now →
                  </Link>
                </span>
              </p>
            </div>
          </div>
          <div className="pt-6 text-base font-semibold leading-7">
            <p className="font-sans text-black text-md hover:text-violet-950">
              <a href="/" className="absolute">
                ← Home
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
