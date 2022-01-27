import { React, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Navbar } from "./Navbar";
import { Navbardesktop } from "./Navbardesktop";

import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";

import Startpage from "./Startpage";
import Authentication from "./Authentication";
import Emailvarification from "./Emailvarification";
//image
import logo from "../img/logo.svg";
import bg from "../img/bg.jpg";

//styled
import styled from "styled-components";
//Animations
import { motion } from "framer-motion";
import { pageAnimation } from "./Animation";

const Getstarted = ({
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
  email,
  setemail,
  dp,
  setDp,
  authenticated,
  authenticationType,
  setAuthenticationType,
  startpage,
  setStartpage,
  loginOP,
  setloginOP,
  signupOP,
  setsignupOP,
  validMail,
  setvalidMail,
  passMatched,
  setpassMatched,
  setnavclrhome,
  navclrprofile,
  setnavclrprofile,
  navclrsettings,
  setnavclrsettings,
  resetPassword,
  setresetPassword,
}) => {
  const history = useHistory();
  useEffect(() => {
    setnavclrsettings("white");
    setnavclrprofile("white");
  });
  const loginHandler = () => {
    history.push("/login");
  };
  const startHandler = () => {
    history.push("/dashboard");
  };
  return (
    <Body bg={bg} height={windowheight} variants={pageAnimation} exit="exit">
      {startpage ? (
        <div className="startpage">
          <Startpage windowheight={windowheight} />
        </div>
      ) : (
        ""
      )}
      <div className="nav">
        {windowwidth > 799 ? (
          <Navbardesktop
            setAuthenticated={setAuthenticated}
            setnavclrhome={setnavclrhome}
            navclrprofile={navclrprofile}
            setnavclrprofile={setnavclrprofile}
            navclrsettings={navclrsettings}
            setnavclrsettings={setnavclrsettings}
          />
        ) : (
          ""
        )}
        {windowwidth < 799 ? (
          <Navbar setAuthenticated={setAuthenticated} />
        ) : (
          ""
        )}
      </div>
      <div className="content">
        <div className="camImg">
          <img className="logoImg" src={logo} alt="hey" />
          <h2>Never let the weather tether you down!</h2>
          <button onClick={startHandler}>Get Started</button>
        </div>
        {windowwidth < 799 ? (
          <button onClick={loginHandler} className="loginbtn">
            Login
          </button>
        ) : (
          ""
        )}
        {windowwidth > 799 ? <p className="orBreak"></p> : ""}
        {windowwidth > 799 ? (
          <div className="authentication">
            {authenticated ? (
              <div className="greetings">
                <h1>Welcome Back, {name}</h1>
              </div>
            ) : (
              <Authentication
                authenticationType={authenticationType}
                setAuthenticationType={setAuthenticationType}
                authenticated={authenticated}
                setAuthenticated={setAuthenticated}
                windowheight={windowheight}
                windowwidth={windowwidth}
                preloader={preloader}
                setpreloader={setpreloader}
                dp={dp}
                setDp={setDp}
                name={name}
                setName={setName}
                userName={userName}
                setUserName={setUserName}
                password={password}
                setPassword={setPassword}
                loginOP={loginOP}
                setloginOP={setloginOP}
                signupOP={signupOP}
                setsignupOP={setsignupOP}
                email={email}
                setemail={setemail}
                validMail={validMail}
                setvalidMail={setvalidMail}
                passMatched={passMatched}
                setpassMatched={setpassMatched}
                resetPassword={resetPassword}
                setresetPassword={setresetPassword}
              />
            )}
          </div>
        ) : (
          ""
        )}
      </div>
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
  background-image: url(${bg});
  background-size: cover;
  .startpage {
    z-index: 100;
  }

  .preloader {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    left: 0;
    background-color: #ffffff94;
    z-index: 100;
  }
  .orBreak {
    font-size: 3vh;
    margin: 1.2vh 0;
    font-weight: 600;
  }
  .authentication {
  }
  .loginbtn {
    position: absolute;
    top: 15px;
    left: 15px;
    padding: 10px;
    background: rgb(60, 175, 221);
    border: 0.5px solid #e9ecef;
    border-radius: 5px;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
  }
  .loginbtn:hover {
    background: #188bd8;
    transform: scale(1.1);
    transition: 0.5s;
  }
  .camImg {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width: 100vw;
    height: 60vh;
    transition: 1s;
    padding-bottom: 20px;

    h1 {
      color: white;
      font-size: 3rem;
      font-weight: 400;
      padding-bottom: 3rem;
      cursor: default;
    }
    h2 {
      color: white;
      font-size: 2rem;
      width: 80vw;
      text-align: center;
      padding-bottom: 2rem;
      font-weight: 200;
      cursor: default;
    }
    img {
      height: 20vh;
      margin-bottom: 3rem;
    }
    button {
      border-radius: 10px;
      color: #fff;
      height: 10vh;
      width: 50vw;
      font-weight: 400;
      text-align: center;
      font-size: 2rem;
      background: rgba(27, 224, 162, 0.2);
      padding: 5px;
      border: none;
      cursor: pointer;
      overflow: hidden;
      box-shadow: 5px 5px 10px #3a514e;
      transition: 1s;
    }
    button:hover {
      background: #056967;
      box-shadow: 0px 0px 10px #bedbd7;
      transition: 1s;
    }
    .desktopHoverScape {
      height: 10vh;
      transition: 1s;
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
    width: 100vw;
    flex-direction: row;
    justify-content: space-evenly;
    .startpage {
      z-index: 10;
    }
    .nav {
      position: fixed;
      width: 100vw;
      background-color: #0000003b;
      left: 0;
      top: 0;
    }

    .content {
      display: flex;
      flex-direction: row;
      margin-top: 10vh;
      width: 100vw;
      height: 70vh;
      .camImg {
        width: 50vw;
      }
      .orBreak {
        background-color: #237e83;
        height: 80vh;
        width: 4px;
        border-radius: 100px;
        color: #f6f6f6;
        transform: translateX(-50%);
      }
      .authentication {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50vw;
        .greetings {
          display: flex;
          justify-content: center;
          align-items: center;
          h1 {
            color: white;
            font-size: 2.5vw;
            font-weight: 600;
          }
        }
      }
      .camImg {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        width: 50vw;
        height: 60vh;
        transition: 1s;
        padding-bottom: 20px;

        h1 {
          color: white;
          font-size: 3.4vw;
          font-weight: 200;
          padding-bottom: 3rem;
          cursor: default;
        }
        h2 {
          color: white;
          font-size: 2vw;
          padding-bottom: 2rem;
          font-weight: 200;
          cursor: default;
        }
        img {
          height: 30vh;
          margin-bottom: 3rem;
        }
        button {
          border-radius: 10px;
          color: #fff;
          height: 15vh;
          width: 20vw;
          font-weight: 400;
          text-align: center;
          font-size: 3vw;
          background-color: #32919eac;
          padding: 5px;
          border: none;
          cursor: pointer;
          overflow: hidden;
          box-shadow: 5px 5px 10px #3a514e;
          transition: 1s;
        }
        button:hover {
          background: #056967;
          box-shadow: 0px 0px 10px #bedbd7;
          transition: 1s;
        }
        .desktopHoverScape {
          height: 10vh;
          transition: 1s;
        }
      }
    }
  }
`;

export default Getstarted;
