import { React, useEffect, useState, useRef } from "react";

import Axios from "axios";
import { useHistory } from "react-router-dom";

import { Navbar } from "./Navbar";
import { Navbardesktop } from "./Navbardesktop";

import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";

import Alertemailexist from "./Alertemailexist";
import Alertpassword from "./Alertpassword";

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
  validMail,
  setvalidMail,
  email,
  setemail,
  dp,
  setDp,
  authenticationType,
  setAuthenticationType,
  passMatched,
  setpassMatched,
}) => {
  const [border, setborder] = useState("");
  const [usernameFocus, setusernameFocus] = useState(false);
  const [usernameExist, setusernameExist] = useState(false);
  const [usernameNotExist, setusernameNotExist] = useState(false);
  const [retypePassword, setretypePassword] = useState("");
  const [passConditions, setpassConditions] = useState(false);
  const [upperCase, setUppercase] = useState(false);
  const [lowerCase, setLowercase] = useState(false);
  const [number, setNumber] = useState(false);
  useEffect(() => {
    setUserName("");
    setPassword("");
  }, []);

  const onFocus = () => {
    setpassConditions(true);
  };
  const onBlur = () => {
    setpassConditions(false);
  };
  const onFocusUsername = () => {
    setusernameFocus(true);
  };
  const onBlurUsername = () => {
    setusernameFocus(false);
    if (userName) {
      Axios.post("https://weathercloset.onlysiam.com/api/validateUsername", {
        username: userName,
      }).then((response) => {
        if (response.data.length === 1) {
          setusernameExist(true);
          setusernameNotExist(false);
          console.log("exist");
        }
        if (response.data.length === 0) {
          setusernameNotExist(true);
          setusernameExist(false);
          console.log("not");
        }
      });
    }
  };
  const nameInputHandler = (e) => {
    setName(e.target.value);
  };
  const usernameInputHandler = (e) => {
    setUserName(e.target.value);
  };
  const emailInputHandler = (e) => {
    var tmp;
    setemail(e.target.value);
    if (e.target.value.includes("@")) {
      tmp = e.target.value.split("@");
      if (tmp.length === 2 && tmp[tmp.length - 1].includes(".")) {
        setvalidMail(true);
      } else {
        setvalidMail(false);
      }
    } else {
      setvalidMail(false);
    }
  };
  const passwordInputHandler = (e) => {
    var num = /\d/;
    var textu = /[A-Z]/;
    var textl = /[a-z]/;
    setPassword(e.target.value);
    if (num.test(e.target.value)) {
      setNumber(true);
    } else {
      setNumber(false);
    }
    if (textu.test(e.target.value)) {
      setUppercase(true);
    } else {
      setUppercase(false);
    }
    if (textl.test(e.target.value)) {
      setLowercase(true);
    } else {
      setLowercase(false);
    }
    setpassMatched(false);
  };
  const retypePasswordInputHandler = (e) => {
    setretypePassword(e.target.value);
    if (password === e.target.value) {
      setpassMatched(true);
    } else {
      setpassMatched(false);
    }
  };
  const authenticationTypeHandler = () => {
    setAuthenticationType(true);
  };

  const signup = (e) => {
    setpreloader(true);
    e.preventDefault();
    Axios.post("https://weathercloset.onlysiam.com/api/validateEmail", {
      name: "name",
      username: "userName",
      password: "password",
      email: "email",
    }).then((response) => {
      console.log(response);
      if (response.data.length === 1) {
        console.log("working");
        setpreloader(false);
        toast(<Alertemailexist />, {
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
      if (response.data.length === 0) {
        Axios.post("https://weathercloset.onlysiam.com/api/signup", {
          name: name,
          username: userName,
          password: password,
          email: email,
        }).then((response) => {
          console.log(response);
          localStorage.setItem("name", name);
          localStorage.setItem("userID", userName);
          setAuthenticated(true);
          setpreloader(false);
        });
      }
    });
  };

  return (
    <Body height={windowheight} variants={pageAnimation} exit="exit">
      <ToastContainer newestOnTop={false} rtl={false} transition={Zoom} />

      <form className="formStyle" onSubmit={signup}>
        <h1>Hello!</h1>
        <h2>Enter Your Personal Details</h2>
        <div className="nameInput">
          <input
            placeholder="Full Name"
            value={name}
            onChange={nameInputHandler}
            required
          />
        </div>
        <div className="emailInput">
          <input
            placeholder="Email"
            value={email}
            onChange={emailInputHandler}
            required
          />
          {validMail ? (
            <p
              style={{
                color: "#33c73a",
              }}
            >
              Valid
            </p>
          ) : (
            <p
              style={{
                color: "red",
              }}
            >
              Not Valid
            </p>
          )}
        </div>
        <div className="useridInput">
          <input
            placeholder="Username"
            value={userName}
            onChange={usernameInputHandler}
            onFocus={onFocusUsername}
            onBlur={onBlurUsername}
            required
          />
          {!usernameExist && !usernameNotExist ? (
            <h2
              style={{
                color: "transparent",
              }}
            >
              Not available
            </h2>
          ) : (
            ""
          )}
          {usernameExist ? (
            <h2
              style={{
                color: "#33c73a",
              }}
              id="tickuser"
            >
              &#10060;
              <h3
                style={{
                  color: "red",
                }}
              >
                Not Available
              </h3>
            </h2>
          ) : (
            ""
          )}
          {usernameNotExist ? (
            <h2
              style={{
                color: "#33c73a",
              }}
              id="tickuser"
            >
              &#10003;
              <h3
                style={{
                  color: "#33c73a",
                }}
              >
                Available
              </h3>
            </h2>
          ) : (
            ""
          )}
        </div>
        <div className="passwordInput">
          {passConditions ? (
            <div className="passConditions">
              <h1>Your Password Must Have</h1>
              {upperCase ? (
                <h1
                  style={{
                    color: "#33c73a",
                  }}
                  id="tick"
                >
                  &#10003;
                  <h1
                    style={{
                      color: "#33c73a",
                    }}
                  >
                    An Upercase Letter
                  </h1>
                </h1>
              ) : (
                <h1>An Upercase Letter</h1>
              )}
              {lowerCase ? (
                <h1
                  style={{
                    color: "#33c73a",
                  }}
                  id="tick"
                >
                  &#10003;
                  <h1
                    style={{
                      color: "#33c73a",
                    }}
                  >
                    A Lower Letter
                  </h1>
                </h1>
              ) : (
                <h1>A Lower Letter</h1>
              )}
              {number ? (
                <h1
                  style={{
                    color: "#33c73a",
                  }}
                  id="tick"
                >
                  &#10003;
                  <h1
                    style={{
                      color: "#33c73a",
                    }}
                  >
                    A Number
                  </h1>
                </h1>
              ) : (
                <h1>A Number</h1>
              )}
            </div>
          ) : (
            ""
          )}
          <div className="passinputs">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={passwordInputHandler}
              onFocus={onFocus}
              onBlur={onBlur}
              required
            />
            <input
              type="password"
              placeholder="Re-type Password"
              value={retypePassword}
              onChange={retypePasswordInputHandler}
              onFocus={onFocus}
              onBlur={onBlur}
              required
            />
          </div>
          {passMatched ? (
            <p
              style={{
                color: "#007a06",
              }}
            >
              Matched
            </p>
          ) : (
            <p
              style={{
                color: "red",
              }}
            >
              Not Matched
            </p>
          )}
        </div>

        {upperCase && lowerCase && number && passMatched ? (
          <button
            disabled={!upperCase || !lowerCase || !number || !passMatched}
            type="submit"
            className="loginBtn"
          >
            Signup
          </button>
        ) : (
          <button
            style={{
              backgroundColor: "#6e6e6e",
              cursor: "default",
            }}
            disabled={upperCase || lowerCase || number || passMatched}
            type="submit"
            className="loginBtn"
          >
            Signup
          </button>
        )}

        <p to="">
          Already Have An Account?{" "}
          <button type="reset" onClick={authenticationTypeHandler}>
            Login
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
  /* background-color: #59a1b7; */
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
      font-size: 1vh;
      border-radius: 10rem;
      margin-top: 25px;
      border: 0.5px solid #d1d1d1;
      border-top: none;
    }
    input::placeholder {
      color: rgba(0, 0, 0, 0.452);
    }
    .emailInput {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 7.1vw;
      margin-top: 25px;
      input {
        margin-top: 0px;
      }
      p {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0px;
        font-size: 20px;
        width: 100px;
        height: 4vh;
      }
    }
    .emailInput {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 7.1vw;
      margin-top: 25px;
      input {
        margin-top: 0px;
      }
      p {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0px;
        font-size: 20px;
        width: 100px;
        height: 4vh;
      }
    }
    .passwordInput {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      p {
        font-size: 20px;
        background-color: #00000061;
        width: 150px;
        padding: 10px;
        margin-top: 5px;
        border-radius: 10px;
      }
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
    }
    .loginBtn:hover {
      background-color: #018a8f;
      border: 1px solid #3a9ca1;
    }
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
    width: 35vw;
    height: 70vh;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: transparent;

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
      width: 40vw;
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      h1 {
        text-align: center;
        width: 35vw;
        font-size: 2.5vw;
        margin-bottom: 10px;
        font-weight: 200;
        color: white;
      }
      h2 {
        color: white;
        font-size: 2.5vh;
        text-align: center;
        width: 20vw;
        padding-bottom: 0px;
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
          font-size: 1.5vw;
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
      .useridInput {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 7vw;
        margin-top: 25px;
        input {
          margin-top: 0px;
        }
        #tickuser {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: row;
        }
        h2 {
          display: flex;
          margin-left: 5px;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          width: 7vw;
        }
        h3 {
          display: flex;
          margin-left: -10px;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          width: 6vw;
        }
      }
      .emailInput {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
        width: 40vw;
        input {
          margin-top: 0px;
          width: 20vw;
        }
        p {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0px;
          font-size: 20px;
          width: 7vw;
          height: 4vh;
        }
      }
      .passwordInput {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        p {
          font-size: 20px;
          background-color: #00000061;
          width: 150px;
          padding: 10px;
          margin-top: 5px;
          border-radius: 10px;
        }
        .passConditions {
          position: absolute;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-end;
          height: 20vh;
          width: 12vw;
          background-color: #000000b7;
          border-radius: 10px;
          z-index: 6;
          margin-left: 33vw;
          margin-bottom: 18vh;
          #tick {
            display: flex;

            align-items: flex-start;
            justify-content: flex-start;
            flex-direction: row;
          }
          h1 {
            position: relative;
            display: flex;
            margin-left: 5px;
            align-items: flex-start;
            justify-content: flex-start;
            font-size: 15px;
            width: 10vw;
          }
        }
      }
      input {
        height: 5vh;
        width: 20vw;
        padding: 10px;
        background-color: white;
        color: black;
        font-size: 1.8vh;
        border-radius: 10rem;
        margin-top: 20px;
        border: 0.5px solid #d1d1d1;
        border-top: none;
        z-index: 5;
      }
      input::placeholder {
        color: rgba(0, 0, 0, 0.452);
      }
      .passwordInput {
        input {
          width: 10vw;
        }
      }

      .loginBtn {
        width: 20vw;
        height: 7.5vh;
        background-color: #50c2c9;
        color: white;
        font-size: 2.2vh;
        margin-top: 20px;
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
      p {
        font-size: 20px;
      }
    }
  }
`;

export default Signup;
