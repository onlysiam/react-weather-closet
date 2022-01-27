import * as React from "react";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
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
export const Navigation = ({ setAuthenticated }) => {
  const history = useHistory();
  const logoutHandler = () => {
    localStorage.removeItem("userID");
    localStorage.removeItem("name");
    localStorage.removeItem("dp");
    setAuthenticated(false);
    history.push("/");
  };
  return (
    <Body variants={variants}>
      <motion.li
        variants={variantli}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <h1>Home</h1>
      </motion.li>
      <motion.li
        variants={variantli}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <h1>Profile</h1>
      </motion.li>
      <motion.li
        variants={variantli}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <h1>About</h1>
      </motion.li>
      <motion.li
        variants={variantli}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <h1>Contact</h1>
      </motion.li>{" "}
      <motion.li
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
    </Body>
  );
};

const Body = styled(motion.ul)`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  position: absolute;
  height: 90vh;
  width: 300px;
  z-index: 10;
  li {
    width: 250px;
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.8vh;
    cursor: pointer;
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
`;
