import { React, useEffect, useState } from "react";

import Axios from "axios";
//styled
import styled from "styled-components";
//Animations
import { motion } from "framer-motion";
import ClipLoader from "react-spinners/ClipLoader";
import { Navbardesktop } from "./Navbardesktop";
import { Navbar } from "./Navbar";

const Settings = ({
  setpreloader,
  setAuthenticated,
  navclrsettings,
  setnavclrsettings,
  setnavclrhome,
  navclrprofile,
  setnavclrprofile,
}) => {
  const [isOpenName, setisOpenName] = useState(false);
  const [namebg, setnamebg] = useState("white");
  const [isOpenPass, setisOpenPass] = useState(false);
  const [passbg, setpassbg] = useState("white");
  const [isOpenMail, setisOpenMail] = useState(false);
  const [mailbg, setmailbg] = useState("white");
  const [userData, setUserData] = useState([]);

  const [fname, setFname] = useState("");
  const [mname, setMname] = useState("");
  const [lname, setLname] = useState("");

  const [mail, setMail] = useState("");
  const [newmail, setnewmail] = useState("");

  const [mailMatch, setMailMatch] = useState(false);
  useEffect(() => {
    setnavclrhome("white");
    setnavclrprofile("white");

    Axios.post("https://weathercloset.onlysiam.com/api/fetchuser", {
      username: localStorage.getItem("userID"),
    }).then((response) => {
      if (response.data.length > 0) {
        setUserData(response.data[0]);
      }
    });
  });
  useEffect(() => {});
  const nameHandler = () => {
    setisOpenPass(false);
    setisOpenMail(false);
    setisOpenName(!isOpenName);
    if (isOpenName) setnamebg("white");
    if (!isOpenName) {
      setnamebg("#f2f2f2");
      setmailbg("white");
      setpassbg("white");
    }
  };
  const passHandler = () => {
    setisOpenName(false);
    setisOpenMail(false);
    setisOpenPass(!isOpenPass);
    if (isOpenPass) setpassbg("white");
    if (!isOpenPass) {
      setpassbg("#f2f2f2");
      setnamebg("white");
      setmailbg("white");
    }
  };
  const mailHandler = () => {
    setisOpenName(false);
    setisOpenPass(false);
    setisOpenMail(!isOpenMail);
    if (isOpenMail) {
      setmailbg("white");
    }
    if (!isOpenMail) {
      setmailbg("#f2f2f2");
      setpassbg("white");
      setnamebg("white");
    }
  };

  const fnameHandler = (e) => {
    setFname(e.target.value);
  };
  const mnameHandler = (e) => {
    setMname(e.target.value);
  };
  const lnameHandler = (e) => {
    setLname(e.target.value);
  };
  const mailinputHandler = (e) => {
    setMail(e.target.value);
    if (mail === userData.email) {
      setMailMatch(true);
    }
  };

  const newmailHandler = (e) => {
    setnewmail(e.target.value);
  };
  const nameChange = (e) => {
    e.preventDefault();
    Axios.post("https://weathercloset.onlysiam.com/api/namechange", {
      username: localStorage.getItem("userID"),
      name: fname + " " + mname + " " + lname,
    }).then((response) => {
      console.log(response);
      setisOpenName(!isOpenName);
      setFname("");
      setMname("");
      setLname("");
      setnamebg("white");
      if (response.data.length > 0) {
        console.log("s");
      }
    });
  };
  const passChange = (e) => {
    e.preventDefault();
  };
  const emailChange = (e) => {
    e.preventDefault();
    if (mailMatch) {
      Axios.post("https://weathercloset.onlysiam.com/api/mailchange", {
        username: localStorage.getItem("userID"),
        mail: newmail,
      }).then((response) => {
        console.log(response);
        setisOpenMail(!isOpenMail);
        setMail("");
        setnewmail("");
        setmailbg("white");
        if (response.data.length > 0) {
          console.log("s");
        }
      });
    }
  };
  return (
    <Body nameBg={namebg} passBg={passbg} mailBg={mailbg}>
      <div className="nav">
        <Navbardesktop
          setAuthenticated={setAuthenticated}
          setnavclrhome={setnavclrhome}
          navclrprofile={navclrprofile}
          setnavclrprofile={setnavclrprofile}
          navclrsettings={navclrsettings}
          setnavclrsettings={setnavclrsettings}
        />
      </div>

      <div className="settings">
        <div className="mainheader">
          <h1>General Account Settings</h1>
        </div>
        <div className="name">
          <div className="header fullname">
            <h1>Name</h1>
            <p>{userData.name}</p>
            <button onClick={nameHandler}>Edit</button>
          </div>
          {isOpenName ? (
            <form onSubmit={nameChange}>
              <div className="inputs">
                <div className="label">
                  <label htmlFor="">First Name</label>
                  <label htmlFor="">Middle Name</label>
                  <label htmlFor="">Last Name</label>
                </div>
                <div className="input">
                  <input value={fname} onChange={fnameHandler} type="text" />
                  <input value={mname} onChange={mnameHandler} type="text" />
                  <input value={lname} onChange={lnameHandler} type="text" />
                </div>
              </div>

              <div className="buttons">
                <button type="submit">Confirm</button>
                <button type="reset">Cancel</button>
              </div>
            </form>
          ) : (
            ""
          )}
        </div>
        <div className="password">
          <div className="header pass">
            <h1>Password</h1>
            {isOpenPass ? <p></p> : <p>************</p>}

            <button onClick={passHandler}>Change</button>
          </div>
          {isOpenPass ? (
            <form onSubmit={passChange}>
              <div className="inputs">
                <div className="label">
                  <label htmlFor="">Previous Password</label>
                  <label htmlFor="">New Password</label>
                  <label htmlFor="">Verify Password</label>
                </div>
                <div className="input">
                  <input type="text" />
                  <input type="text" />
                  <input type="text" />
                </div>
              </div>
              <div className="buttons">
                <button type="submit">Confirm</button>
                <button type="reset">Cancel</button>
              </div>
            </form>
          ) : (
            ""
          )}
        </div>
        <div className="mail">
          <div className="header email">
            <h1>Email</h1>
            <p>{userData.email}</p>
            <button onClick={mailHandler}>Edit</button>
          </div>
          {isOpenMail ? (
            <form onSubmit={emailChange}>
              <div className="inputs">
                <div className="label">
                  <label htmlFor="">Previous Email</label>
                  <label htmlFor="">New Email</label>
                </div>
                <div className="input">
                  <input value={mail} onChange={mailinputHandler} type="text" />
                  <input
                    value={newmail}
                    onChange={newmailHandler}
                    type="text"
                  />
                </div>
              </div>
              <div className="buttons">
                <button type="submit">Change</button>
                <button type="reset">Cancel</button>
              </div>
            </form>
          ) : (
            ""
          )}
        </div>
      </div>
    </Body>
  );
};

//styled Components
const Body = styled(motion.div)`
  @media (min-width: 800px) {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: 100vh;
    width: 100vw;
    margin-top: 100px;

    .nav {
      position: fixed;
      width: 100vw;
      left: 0;
      top: 0;
      height: 7vh;
      background-color: #363636;
      z-index: 10;
    }
    .settings {
      .mainheader {
        width: 35vw;
        border-bottom: 1px solid #018a8f;

        h1 {
          font-size: 30px;
          margin-bottom: 10px;
        }
      }
      .name {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: ${(props) => props.nameBg};
        border-bottom: 1px solid #018a8f;
        h1 {
          font-size: 20px;
        }
        form {
          width: 35vw;
          height: 25vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .inputs {
            width: 35vw;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            .label {
              display: flex;
              flex-direction: column;
              label {
                font-size: 20px;
                color: #000000;
                font-weight: 400;
                padding: 10px;
                border-radius: 10px;
              }
            }
            .input {
              display: flex;
              flex-direction: column;
              input {
                height: 4vh;
                margin-top: 10px;
                background-color: #dfdfdf;
                border: none;
                padding: 5px;
                font-size: 15px;
                border-radius: 10px;
              }
              input:focus {
                outline: none;
                border-bottom: 2px solid #2b8e94;
              }
            }
          }
          .buttons {
            margin-top: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 30%;
            button {
              height: 5vh;
              width: 5vw;
              background-color: #3a9ca1;
              color: white;
              margin-top: 10px;
              font-size: 1vw;
              font-weight: 600;
              outline: none;
              border: none;
              border-radius: 3px;
              transition: 1s;
              cursor: pointer;
            }
            button:hover {
              background-color: #018a8f;
              border: 1px solid #3a9ca1;
            }
          }
        }
      }
      .password {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: ${(props) => props.passBg};
        border-bottom: 1px solid #018a8f;
        h1 {
          font-size: 20px;
        }
        form {
          width: 35vw;
          height: 25vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .inputs {
            width: 35vw;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            .label {
              display: flex;
              flex-direction: column;
              label {
                font-size: 20px;
                color: #000000;
                font-weight: 400;
                padding: 10px;
                border-radius: 10px;
              }
            }
            .input {
              display: flex;
              flex-direction: column;
              input {
                height: 4vh;
                margin-top: 10px;
                background-color: #dfdfdf;
                border: none;
                padding: 5px;
                font-size: 15px;
                border-radius: 10px;
              }
              input:focus {
                outline: none;
                border-bottom: 2px solid #2b8e94;
              }
            }
          }
          .buttons {
            margin-top: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 30%;
            button {
              height: 5vh;
              width: 5vw;
              background-color: #3a9ca1;
              color: white;
              margin-top: 10px;
              font-size: 1vw;
              font-weight: 600;
              outline: none;
              border: none;
              border-radius: 3px;
              transition: 1s;
              cursor: pointer;
            }
            button:hover {
              background-color: #018a8f;
              border: 1px solid #3a9ca1;
            }
          }
        }
      }
      .mail {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: ${(props) => props.mailBg};
        border-bottom: 1px solid #018a8f;
        h1 {
          font-size: 20px;
        }
        form {
          width: 35vw;
          height: 20vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .inputs {
            width: 35vw;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            .label {
              display: flex;
              flex-direction: column;
              label {
                font-size: 20px;
                color: #000000;
                font-weight: 400;
                padding: 10px;
                border-radius: 10px;
              }
            }
            .input {
              display: flex;
              flex-direction: column;
              input {
                height: 4vh;
                margin-top: 10px;
                background-color: #dfdfdf;
                border: none;
                padding: 5px;
                font-size: 15px;
                border-radius: 10px;
              }
              input:focus {
                outline: none;
                border-bottom: 2px solid #2b8e94;
              }
            }
          }
          .buttons {
            margin-top: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 30%;
            button {
              height: 5vh;
              width: 5vw;
              background-color: #3a9ca1;
              color: white;
              margin-top: 10px;
              font-size: 1vw;
              font-weight: 600;
              outline: none;
              border: none;
              border-radius: 3px;
              transition: 1s;
              cursor: pointer;
            }
            button:hover {
              background-color: #018a8f;
              border: 1px solid #3a9ca1;
            }
          }
        }
      }
      .header {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 35vw;
        height: 10vh;
        margin-bottom: 10px;
        h1 {
          width: 15vw;
        }
        p {
          width: 15vw;
        }
        button {
          height: 3vh;
          width: 3vw;
          background-color: #3a9ca1;
          color: white;
          margin-top: 10px;
          font-size: 10px;
          font-weight: 600;
          outline: none;
          border: none;
          border-radius: 3px;
          transition: 1s;
          cursor: pointer;
        }
        button:hover {
          background-color: #018a8f;
          border: 1px solid #3a9ca1;
        }
      }
    }
  }
`;

export default Settings;
