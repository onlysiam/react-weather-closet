import { React, useEffect, useState } from "react";

import { useHistory } from "react-router-dom";
import { useAnimatedState, animated, useTransition } from "react-spring";

import { Navbar } from "./Navbar";
import { Navbardesktop } from "./Navbardesktop";

import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";

import Login from "./Login";
import Signup from "./Signup";
//image

//styled
import styled from "styled-components";
//Animations
import { motion, AnimatePresence } from "framer-motion";
import { pageAnimation } from "./Animation";

const Authentication = ({
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
  validMail,
  setvalidMail,
  dp,
  setDp,
  authenticated,
  authenticationType,
  setAuthenticationType,
  incorrectUsername,
  setincorrectUsername,
  incorrectPassword,
  setincorrectPassword,
  passMatched,
  setpassMatched,
  resetPassword,
  setresetPassword,
}) => {
  const history = useHistory();
  const [loginOP, setloginOP] = useState("1");
  const [signupOP, setsignupOP] = useState("0");
  useEffect(() => {
    if (authenticationType) {
      setloginOP("1");
      setsignupOP("0");
    }
    if (!authenticationType) {
      setloginOP("0");
      setsignupOP("1");
    }
  });
  return (
    <Body
      height={windowheight}
      variants={pageAnimation}
      exit="exit"
      lgOp={loginOP}
      suOp={signupOP}
    >
      <div className="authentication">
        {authenticationType ? (
          <div className="login">
            <Login
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
              authenticationType={authenticationType}
              setAuthenticationType={setAuthenticationType}
              incorrectUsername={incorrectUsername}
              setincorrectUsername={setincorrectUsername}
              incorrectPassword={incorrectPassword}
              setincorrectPassword={setincorrectPassword}
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
          </div>
        ) : (
          ""
        )}
        {authenticationType ? (
          ""
        ) : (
          <div className="signup">
            <Signup
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
              authenticationType={authenticationType}
              setAuthenticationType={setAuthenticationType}
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
            />
          </div>
        )}
      </div>
      {preloader ? (
        <div className="preloader">
          <ClipLoader color="#50c2c9" loading={preloader} size={150} />
        </div>
      ) : (
        ""
      )}
      <div className="nav">
        {windowwidth < 799 ? (
          <Navbar setAuthenticated={setAuthenticated} />
        ) : (
          ""
        )}
      </div>
    </Body>
  );
};

//styled Components
const Body = styled(motion.div)`
  .nav {
    z-index: 5;
  }
  .authentication {
    z-index: 5;
    width: 100vw;
    .login {
      opacity: ${(props) => props.lgOp};
      transition: 1s;
    }
    .signup {
      opacity: ${(props) => props.suOp};
      transition: 1s;
    }
  }
  .preloader {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    margin-bottom: 10vh;
    left: 0;
    background-color: #ffffff94;
    z-index: 100;
  }

  @media (min-width: 800px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35vw;
    border-radius: 10px;
    background-color: #0000004e;
    .authentication {
      .login {
        opacity: ${(props) => props.lgOp};
        transition: 1s;
      }
      .signup {
        opacity: ${(props) => props.suOp};
        transition: 1s;
      }
    }
    .nav {
      position: fixed;
      width: 100vw;
      left: 0;
      top: 0;
    }
  }
`;

export default Authentication;
