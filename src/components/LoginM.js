import { React, useEffect } from "react";

import Axios from "axios";
import { useHistory } from "react-router-dom";

import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAnimatedState, animated, useTransition } from "react-spring";
import ClipLoader from "react-spinners/ClipLoader";

import Alertusername from "./Alertusername";
import Alertpassword from "./Alertpassword";

//image

import bg from "../img/bg.jpg";
// import { Link } from "react-router-dom";

//styled
import styled from "styled-components";
//Animations
import { motion } from "framer-motion";
import { pageAnimation } from "./Animation";

const LoginM = ({
  preloader,
  setpreloader,
  setAuthenticated,
  windowwidth,
  windowheight,
  setName,
  userName,
  setUserName,
  password,
  setPassword,
  dp,
  name,
  setDp,
  authenticationType,
  setAuthenticationType,
  validMail,
  setvalidMail,
  passMatched,
  setpassMatched,
}) => {
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("userID")) {
      // history.push("/");
    }
  });

  const usernameInputHandler = (e) => {
    setUserName(e.target.value);
  };
  const passwordInputHandler = (e) => {
    setPassword(e.target.value);
  };
  const authenticationTypeHandler = (e) => {
    setAuthenticationType(false);
  };

  const login = (e) => {
    setpreloader(true);
    e.preventDefault();

    Axios.post("https://weathercloset.onlysiam.com/api/validateUsername", {
      username: userName,
    }).then((response) => {
      if (response.data.length === 0) {
        setpreloader(false);
        toast(<Alertusername />, {
          className: "incorrectPass",
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
      if (response.data.length === 1) {
        Axios.post("https://weathercloset.onlysiam.com/api/login", {
          username: userName,
          password: password,
        }).then((response) => {
          if (response.data.length === 0) {
            setpreloader(false);
            toast(<Alertpassword />, {
              className: "incorrectPass",
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
          }
          if (response.data.length === 1) {
            setName(response.data[0].name);
            setDp(response.data[0].profilepic);
            localStorage.setItem("name", response.data[0].name);
            Axios.post(
              "https://weathercloset.onlysiam.com/api/registersession",
              {
                username: userName,
              }
            ).then((response) => {
              setAuthenticated(true);
              localStorage.setItem("userID", userName);
              setpreloader(false);
              history.push("/dashboard");
            });
          }
        });
      }
    });
  };

  const transition = useTransition(authenticationType, {
    from: {},
    enter: {},
    leave: {},
  });
  return (
    // {transition((style,item)=>
    //   item ? (
    <Body height={windowheight} variants={pageAnimation} exit="exit">
      <ToastContainer newestOnTop={false} rtl={false} transition={Zoom} />

      <form className="formStyle" onSubmit={login}>
        <h1>Welcome Back!</h1>
        <h2>
          To Access Your Informations Please Login With Your Personal Info
        </h2>
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
        <div className="atags">
          <p to="">Forgot Password?</p>
        </div>
        <button className="loginBtn">Login</button>
        <p className="signupp">
          Don't Have An Account?{" "}
          <button type="button" onClick={authenticationTypeHandler}>
            SignUp
          </button>
        </p>
      </form>
    </Body>
  );
};

//styled Components
const Body = styled(motion.div)`
  width: 100vw;
  height: ${(props) => props.height}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(${bg});
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
  .formStyle {
    width: 95vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 5;

    h1 {
      text-align: center;
      width: 95vw;
      font-size: 30px;
      margin-bottom: 10px;
      font-weight: 200;
      color: white;
    }
    h2 {
      color: white;
      font-size: 20px;
      text-align: center;
      width: 95vw;
      padding-bottom: 20px;
      font-weight: 100;
      cursor: default;
    }

    input {
      height: 6vh;
      width: 85vw;
      padding: 10px;
      background-color: white;
      text-align: center;
      color: black;
      font-size: 2vh;
      border-radius: 10rem;
      margin-top: 25px;
      border: 0.5px solid #d1d1d1;
      border-top: none;
    }
    input::placeholder {
      color: rgba(0, 0, 0, 0.452);
    }
    .atags {
      font-weight: 400;
      font-size: 2vh;
      margin: 2vh 20px;
      color: #ffffff;
      cursor: pointer;
    }
    input:focus,
    textarea:focus,
    select:focus {
      outline: none;
      border-bottom: 2px solid #29abe2;
    }

    .loginBtn {
      width: 85vw;
      height: 7.5vh;
      background-color: #50c2c9;
      color: white;
      font-size: 2.2vh;
      font-weight: 600;
      border: none;
      border-radius: 5px;
      transition: 1s ease;
      cursor: pointer;
    }
    .loginBtn:hover {
      background-color: #018a8f;
      border: 1px solid #3a9ca1;
    }
  }
  .signupp {
    color: white;
    font-size: 3vh;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 95vw;
    margin-top: 20px;
    text-align: center;
    font-weight: 100;
    cursor: default;
    button {
      width: 20vw;
      height: 5vh;
      background-color: #50c2c9;
      color: white;
      font-size: 20px;
      margin-left: 5px;
      font-weight: 600;
      border: none;
      border-radius: 5px;
      transition: 1s ease;
      cursor: pointer;
    }
    button:hover {
      background-color: #018a8f;
      border: 1px solid #3a9ca1;
    }
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
    width: 35vw;
    height: 70vh;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    background-image: none;

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
      height: 70vh;
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
        font-size: 1.5vw;
        text-align: center;
        width: 20vw;
        padding-bottom: 20px;
        font-weight: 100;
        cursor: default;
      }

      input {
        height: 6vh;
        width: 20vw;
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
        width: 20vw;
        height: 7.5vh;
        background-color: #50c2c9;
        color: white;
        font-size: 2.2vh;
        font-weight: 600;
        border: none;
        border-radius: 5px;
        transition: 1s ease;
      }
      .loginBtn:hover {
        background-color: #018a8f;
        border: 1px solid #3a9ca1;
      }
    }
    .signupp {
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-size: 2vh;
      width: 20vw;
      text-align: center;
      font-weight: 100;
      cursor: default;
      button {
        width: 4vw;
        height: 4vh;
        background-color: #50c2c9;
        color: white;
        font-size: 1vw;
        font-weight: 600;
        border: none;
        border-radius: 5px;
        transition: 1s ease;
        cursor: pointer;
      }
      button:hover {
        background-color: #018a8f;
        border: 1px solid #3a9ca1;
      }
    }
  }
`;

export default LoginM;
