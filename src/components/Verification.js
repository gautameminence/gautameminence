import axios from "axios";
import React, { useEffect } from "react";
import Geocode from "react-geocode";
// import { itemContext } from "../App";
// import axios from "axios";
import { useHistory } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { geolocated } from "react-geolocated";

// var store = require("store");

function Verification() {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const [name, setName] = useState();
  const number = localStorage.getItem("phone_number");
  useEffect(() => {
    // Update the document title using the browser API
    getLocation();
    // data();
  }, []);
  const history = useHistory();
  //console.log("login rendered");
  const getLocation = async () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };
  console.log(lat);
  console.log(lng);
  console.log(status);
  // const data = () => {
  //   Geocode.fromLatLng("48.8583701", "2.2922926").then(
  //     (response) => {
  //       const address = response.results[0].formatted_address;
  //       let city, state, country;
  //       for (
  //         let i = 0;
  //         i < response.results[0].address_components.length;
  //         i++
  //       ) {
  //         for (
  //           let j = 0;
  //           j < response.results[0].address_components[i].types.length;
  //           j++
  //         ) {
  //           switch (response.results[0].address_components[i].types[j]) {
  //             case "locality":
  //               city = response.results[0].address_components[i].long_name;
  //               break;
  //             case "administrative_area_level_1":
  //               state = response.results[0].address_components[i].long_name;
  //               break;
  //             case "country":
  //               country = response.results[0].address_components[i].long_name;
  //               break;
  //           }
  //         }
  //       }
  //       console.log(city, state, country);
  //       console.log(address);
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // };
  const change = (e) => {
    setName({
      ...name,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      const data = await axios.post("http://localhost:5000/user/checkOtp", {
        otp: Number(name.otp),
        phoneNo: Number(number),
        lat: lat,
        long: lng,
      });

      localStorage.setItem("token", data.data.Token);
      toast.success("Login Sucessfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
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

export default geolocated()(Verification);
