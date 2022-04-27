import axios from "axios";
import React from "react";
// import { itemContext } from "../App";
// import axios from "axios";
import { useHistory } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// var store = require("store");

function Verification() {
  const [name, setName] = useState();
  const number = localStorage.getItem("phone_number");

  const history = useHistory();
  //console.log("login rendered");

  const change = (e) => {
    setName({
      ...name,
      [e.target.name]: e.target.value,
      phoneNo: number,
    });
  };
  const submit = async (e) => {
    e.preventDefault();

    try {
      const data = await axios.post(
        "http://localhost:5000/user/checkOtp",
        name
      );

      localStorage.setItem("token", data.data.token);
      toast.success("Login Sucessfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        history.push("/menu");
      }, 2000);
    } catch (error) {
      toast.warn("Please Check OTP!!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(error);
    }
  };

  return (
    <>
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
      <form className="form1">
        <h2>verification</h2>
        <br />

        <div className="form-group d-flex flex-column g-2">
          <label htmlFor="otp" className="form-label m-2 h5">
            Please Fill The Otp Send To Your phonenumber
          </label>
          <input
            type="number"
            name="otp"
            onChange={change}
            className="form-control-lg"
            placeholder="OTP"
          />
        </div>

        <button onClick={submit} className="btn btn-primary btn-lg m-3 ms-0">
          Sign in
        </button>
        {/* {msg  && <span style={{color:'red',padding:'5px'}}>{msg}</span> } */}
        {/* <hr /> */}
      </form>
    </>
  );
}

export default React.memo(Verification);
