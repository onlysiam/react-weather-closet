import { React, useEffect } from "react";

import Axios from "axios";
import { useHistory } from "react-router-dom";

import { Navbar } from "./Navbar";
import { Navbardesktop } from "./Navbardesktop";

import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";

import Alert from "./Alert";

//image
import logo from "../img/logo.svg";
import cam from "../img/cam.svg";
import phone from "../img/phone.svg";
// import { Link } from "react-router-dom";

//styled
import styled from "styled-components";
//Animations
import { motion } from "framer-motion";
import { pageAnimation } from "./Animation";

const Signup = ({
  preloader,
  setpreloader,
  setAuthenticated,
  windowwidth,
  windowheight,
  name,
  setName,
  userName,
  setUserName,
  password,
  setPassword,
  dp,
  setDp,
  authenticationType,
  setAuthenticationType,
}) => {
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("userID")) {
      history.push("/");
    }
  });

  const nameInputHandler = (e) => {
    setName(e.target.value);
  };
  const usernameInputHandler = (e) => {
    setUserName(e.target.value);
  };
  const passwordInputHandler = (e) => {
    setPassword(e.target.value);
  };
  const authenticationTypeHandler = (e) => {
    setAuthenticationType(true);
  };

  const login = (e) => {
    setpreloader(true);
    e.preventDefault();

    Axios.post("http://localhost:3001/api/signup", {
      // Axios.post("https://weathercloset.onlysiam.com/api/register", {
      naem: name,
      username: userName,
      password: password,
    }).then((response) => {
      console.log(response);
      setAuthenticated(true);
      localStorage.setItem("userID", userName);
      localStorage.setItem("userPASS", password);
      // sessionStorage.setItem("userID", userName);
      // sessionStorage.setItem("userPASS", password);
      // history.push("/");

      alert("SUCCESSFUL");
      setpreloader(false);
    });
  };

  return (
    <Body height={windowheight} variants={pageAnimation} exit="exit">
      <ToastContainer newestOnTop={false} rtl={false} transition={Zoom} />

      <Form className="formStyle" onSubmit={login}>
        <h1>Hello!</h1>
        <h2>Enter Your Personal Details</h2>
        <div className="idInput">
          <input
            placeholder="Name"
            value={name}
            onChange={nameInputHandler}
            required
          />
        </div>
        <div className="idInput">
          <input
            placeholder="Username"
            value={userName}
            onChange={usernameInputHandler}
            required
          />
        </div>
        <div className="passwordInput">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={passwordInputHandler}
            required
          />
        </div>
        <button className="loginBtn">Signup</button>
        <p to="">
          Already Have An Account?{" "}
          <button onClick={authenticationTypeHandler}>Login</button>
        </p>
      </Form>

      {preloader ? (
        <div className="preloader">
          <ClipLoader color="#50c2c9" loading={preloader} size={150} />
        </div>
      ) : (
        ""
      )}
    </Body>
  );
};

//styled Components
const Body = styled(motion.div)`
  width: 100vw;
  height: ${(props) => props.height}px;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #59a1b7;
  .preloader {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background-color: #ffffff94;
    z-index: 100;
  }
  .orBreak {
    font-size: 3vh;
    margin: 1.2vh 0;
    font-weight: 600;
  }

  .incorrectPass {
    text-align: center;
    width: 100vw;
    height: 100vh;
    background-color: transparent;
    box-shadow: none;
    cursor: pointer;
  }
  .Toastify__close-button {
    display: none;
  }

  @media (min-width: 800px) {
    display: flex;
    width: 55vw;
    height: 75vh;

    flex-direction: row;
    justify-content: space-evenly;
    padding-right: 10vw;

    .nav {
      position: fixed;
      width: 100vw;
      left: 0;
      top: 0;
    }
    .orBreak {
      background-color: #237e83;
      height: 80vh;
      width: 4px;
      border-radius: 100px;
      color: #f6f6f6;
      transform: translateX(-50%);
    }

    .formStyle {
      width: 35vw;
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      h1 {
        text-align: center;
        width: 35vw;
        font-size: 2.5vw;
        margin-bottom: 30px;
        font-weight: 200;
        color: white;
      }
      h2 {
        color: white;
        font-size: 2.5vh;
        text-align: center;
        width: 20vw;
        padding-bottom: 20px;
        font-weight: 100;
        cursor: default;
      }
      p {
        color: white;
        font-size: 3vh;
        width: 30vw;
        text-align: center;
        padding-top: 20px;
        font-weight: 100;
        cursor: default;
        button {
          width: 5vw;
          height: 5vh;
          background-color: #50c2c9;
          color: white;
          font-size: 2.2vh;
          font-weight: 600;
          border: none;
          border-radius: 5px;
          transition: 1s ease;
          cursor: pointer;
        }
        button:hover {
          transform: scale(1.1);
        }
      }
      .logoImg {
        margin-top: 3vh;
        height: 27vh;
        margin-bottom: 10px;
      }
      input {
        height: 6vh;
        width: 30vw;
        padding: 10px;
        background-color: white;
        color: black;
        padding-left: 30px;
        font-size: 2vh;
        border-radius: 10rem;
        margin-top: 25px;
        border: 0.5px solid #d1d1d1;
        border-top: none;
      }
      input::placeholder {
        color: rgba(0, 0, 0, 0.452);
      }

      .loginBtn {
        width: 30vw;
        height: 7.5vh;
        background-color: #50c2c9;
        color: white;
        font-size: 2.2vh;
        margin-top: 20px;
        font-weight: 600;
        border: none;
        border-radius: 5px;
        transition: 1s ease;
      }
      .loginBtn:hover {
        transform: scale(1.1);
      }
    }
  }
`;

const Circle1 = styled.div`
  position: absolute;
  right: 1rem;
  bottom: -7rem;
  width: 25vh;
  height: 25vh;
  border-radius: 50%;
  background-color: rgba(106, 224, 217, 0.5);
`;
const Circle2 = styled.div`
  position: absolute;
  bottom: -3.5rem;
  right: -5rem;
  width: 25vh;
  height: 25vh;
  border-radius: 50%;
  background-color: rgba(106, 224, 217, 0.5);
`;
const Form = styled.form`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .logoImg {
    margin-top: 10vh;
    height: 25vh;
    margin-bottom: 10px;
  }
  input {
    height: 6vh;
    width: 80vw;
    padding: 10px;
    background-color: white;
    color: black;
    padding-left: 30px;
    font-size: 2vh;
    border-radius: 10rem;
    margin-top: 25px;
    border: 0.5px solid #d1d1d1;
    border-top: none;
  }
  input::placeholder {
    color: rgba(0, 0, 0, 0.452);
  }
  input:focus,
  textarea:focus,
  select:focus {
    outline: none;
    border-bottom: 3px solid #29abe2;
  }
  .atags {
    font-weight: 400;
    font-size: 2vh;
    margin: 2vh 20px;
    color: #ffffff;
  }

  .loginBtn {
    width: 78vw;
    height: 7.5vh;
    background-color: #50c2c9;
    color: white;
    font-size: 2.2vh;
    font-weight: 600;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;

export default Signup;
