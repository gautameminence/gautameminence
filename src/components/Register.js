import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [user, setUser] = useState();

  const [result, setResult] = useState();
  const history = useHistory();

  const changeMe = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  console.log(user);
  const success = {
    padding: "10px 15px",
    border: "1px solid green",
    color: "green",
  };
  const fail = { padding: "10px 15px", border: "1px solid red", color: "red" };

  const registerMe = async (e) => {
    e.preventDefault();
    showmessage();
    try {
      const data = await axios.post("http://localhost:5000/user/SignUp", user);
      console.log(data);
      setResult(data);
    } catch (error) {
      // console.log(error.response.status, "==============");
      setResult(error.response.status);
    }
  };
  const showmessage = () => {
    if (result == "200") {
      toast.success("User Register", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        history.push("/verification");
      }, 2000);
    } else {
      toast.warn("Phone Number Already Exist !!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        history.push("/login");
      }, 2000);
    }
  };

  return (
    <form className="form1" onSubmit={registerMe}>
      <h2>Register Form</h2>
      <br />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="d-flex flex-column">
        <div className="form-group">
          <div className="form-group">
            <label htmlFor="email" className="form-label m-2 h5">
              NAME
            </label>
            <input
              type="text"
              name="name"
              placeholder="name"
              className="form-control"
              onChange={changeMe}
              required
            />
            <label htmlFor="email" className="form-label m-2 h5">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="form-control"
              onChange={changeMe}
              required
            />
            <label htmlFor="email" className="form-label m-2 h5">
              Phone number
            </label>
            <input
              type="integer"
              name="phoneNo"
              placeholder="PHONE NUMBER"
              className="form-control"
              onChange={changeMe}
              required
            />
          </div>
        </div>
        <button className="btn btn-primary my-3 h4">OTP SEND</button>

        <hr />
        <span>
          Already have an account? | <Link to="/login">Sign in</Link>
        </span>
      </div>
    </form>
  );
}

export default React.memo(Register);
