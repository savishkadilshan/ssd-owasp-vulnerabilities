import React, { useState, useEffect } from "react";
import { Button } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import LoginImg from "../../images/login.jpg";
import '../../index.css';
import { useAuthContext } from "../../hooks/useAuthContext";
import { toast } from "react-toastify";

const PatientLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const location = useLocation();
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const userType = params.get("userType");
    const email = params.get("email");

    if (token && userType && email) {
      const user = { email, token, userType };

      localStorage.setItem("user", JSON.stringify(user));

      dispatch({ type: "LOGIN", payload: user });


      toast.success('Successfully Logged In with Google!', {
        position: "bottom-right",
        theme: "colored",
      });


      if (userType === "staffMember") {
        navigate("/staffMember/dashboard");
      } else if (userType === "doctor") {
        navigate("/doctor/doctorDashboard");
      } else if (userType === "staffAdmin") {
        navigate("/admin/adminDashboard");
      } else {
        navigate("/");
      }
    }
  }, [location, dispatch, navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div>
      <section className="flex flex-col items-center h-screen md:flex-row">
        <img src={LoginImg} className="object-cover w-2/3 h-full" alt="Login Visual" />
        <div className="flex items-center justify-center w-1/3 px-6 bg-white">
          <div className="w-full h-100">
            <Link to={`/`} className="font-medium ">
              <Button className="bg-blue-500 rounded-full hover:bg-blue-700">
                Home
              </Button>
              <h1 className="mt-8 text-3xl font-[poppins] font-bold leading-tight text-purple-900 md:text-2xl">
                Welcome to HealthCard!
              </h1>
            </Link>
            <h1 className="mt-4 text-xl font-bold leading-tight text-blue-600 md:text-2xl">
              Log in to your account
            </h1>
            <form className="mt-6 login" action="#" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter Email Address"
                  className="w-full px-4 py-3 mt-2 bg-gray-200 border rounded-lg focus:border-blue-500 focus:bg-white focus:outline-none"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </div>

              <div className="mt-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter Password"
                  minLength="6"
                  className="w-full px-4 py-3 mt-2 bg-gray-200 border rounded-lg focus:border-blue-500 focus:bg-white focus:outline-none"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              <div className="mt-2 text-right">
                <a
                  href="#"
                  className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
                >
                  Forgot Password?
                </a>
              </div>
              {error && (
                <div className="font-bold text-red-600 error">{error}</div>
              )}
              <button
                type="submit"
                className="block w-full px-4 py-3 mt-6 font-semibold text-white bg-indigo-500 rounded-lg hover:bg-indigo-400 focus:bg-indigo-400"
                disabled={isLoading}
              >
                Log In
              </button>
            </form>

            <hr className="w-full my-6 border-gray-300" />

            <a href="http://localhost:3000/user/google" className="block w-full px-4 py-3 font-semibold text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:bg-gray-100">
              <div className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="w-6 h-6" viewBox="0 0 48 48"><defs><path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" /></defs><clipPath id="b"><use xlinkHref="#a" overflow="visible" /></clipPath><path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" /><path clipPath="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z" /><path clipPath="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z" /><path clipPath="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" /></svg>
                <span className="ml-4">
                  Sign in with Google
                </span>
              </div>
            </a>

            <p className="mt-8">
              Need an account?{" "}
              <a
                href="/signup"
                className="font-semibold text-blue-500 hover:text-blue-700"
              >
                Create an account
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PatientLogin;