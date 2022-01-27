import * as React from "react";
import { motion, useCycle } from "framer-motion";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
//image
import logo from "../img/logo.svg";
//styled
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
const variants = {
  open: {
    x: 0,
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
    x: 500,
  },
};
const variantli = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};
export const Navbardesktop = ({
  setAuthenticated,
  setnavclrhome,
  navclrprofile,
  navclrhome,
  setnavclrprofile,
  navclrsettings,
  setnavclrsettings,
}) => {
  const { pathname } = useLocation();
  const history = useHistory();
  const logoutHandler = () => {
    localStorage.removeItem("userID");
    localStorage.removeItem("name");
    localStorage.removeItem("dp");
    setAuthenticated(false);
    history.push("/");
  };

  const homehandler = () => {
    setnavclrhome("#adadad");
    history.push("/");
  };
  const profilehandler = () => {
    setnavclrprofile("#adadad");
    history.push("/profile");
  };
  const settingshandler = () => {
    setnavclrsettings("#adadad");
    history.push("/settings");
  };
  return (
    <Body home={navclrhome} profile={navclrprofile} setting={navclrsettings}>
      <div className="navlogo">
        <img src={logo} alt="hey" />
      </div>
      <div className="elements">
        <motion.li
          onClick={homehandler}
          className="home"
          variants={variantli}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <h1>Home</h1>
        </motion.li>
        <motion.li
          className="profile"
          onClick={profilehandler}
          variants={variantli}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <h1>Outfits</h1>
        </motion.li>
        <motion.li
          className="setting"
          onClick={settingshandler}
          variants={variantli}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <h1>Settings</h1>
        </motion.li>
        {localStorage.getItem("userID") ? (
          <motion.li
            className="logout"
            variants={variantli}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FontAwesomeIcon
              className="skip-back"
              size="2x"
              icon={faSignOutAlt}
            />{" "}
            <h1 onClick={logoutHandler}>Log Out</h1>
          </motion.li>
        ) : (
          ""
        )}
      </div>
    </Body>
  );
};

const Body = styled(motion.nav)`
  display: flex;
  flex-direction: row;
  top: 0;
  height: 7vh;
  width: 100vw;
  background-color: transparent;

  .navlogo {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    margin-left: 20px;
    img {
      height: 45px;
      cursor: pointer;
      transition: 1s;
    }
    img:hover {
      transform: scale(1.1);
      transition: 1s;
    }
  }
  .elements {
    position: absolute;
    display: flex;
    right: 1vw;
    align-items: center;
    height: 7vh;
    z-index: 10;

    .home {
      color: white;
    }
    .profile {
      color: ${(props) => props.profile};
    }
    .setting {
      color: ${(props) => props.setting};
    }
    .logout {
      color: white;
    }
    li {
      list-style: none;
      display: flex;
      margin-right: 20px;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    h1 {
      font-size: 1.2vw;
      font-weight: 600;
    }

    .icon-placeholder {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      flex: 40px 0;
      margin-right: 20px;
    }

    .text-placeholder {
      border-radius: 5px;
      width: 200px;
      height: 20px;
      flex: 1;
    }
    .skip-back {
      margin-right: 10px;
    }
  }
`;
const Line = styled(motion.div)`
  height: 0.3rem;
  margin: 0;
  padding: 0;
  background: #f3bb8d;
  width: 0%;
  position: absolute;
`;
