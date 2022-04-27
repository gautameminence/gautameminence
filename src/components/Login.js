import axios from "axios";
import React from "react";
// import { itemContext } from "../App";
// import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react/cjs/react.development";
// var store = require("store");

function Login() {
  const history = useHistory();

  const [name, setTime] = useState();
  const change = (e) => {
    setTime({ ...name, [e.target.name]: e.target.value });
  };

  const checkCred = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post("http://localhost:5000/user/login", name);
      localStorage.setItem("phone_number", data.data.phone_number);
      history.push("/verification");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className="form1" onSubmit={checkCred}>
        <h2>Login</h2>
        <br />
        <div className="form-group d-flex flex-column g-2">
          <label htmlFor="email" className="form-label m-2 h5">
            Phone Number
          </label>
          <input
            type="number"
            name="phoneNo"
            onChange={change}
            className="form-control-lg"
            placeholder="phone number"
            required
          />
        </div>

        <button className="btn btn-primary btn-lg m-3 ms-0">Sign in</button>
        {/* {msg  && <span style={{color:'red',padding:'5px'}}>{msg}</span> } */}
        <hr />
        <span>
          Don't have an account? | <Link to="/register">Register Here</Link>
        </span>
      </form>
    </>
  );
}

export default React.memo(Login);
