import { React, useEffect, useState } from "react";

import "react-toastify/dist/ReactToastify.css";

//image
import logo from "../img/logo.svg";

//styled
import styled from "styled-components";
//Animations
import { motion } from "framer-motion";
import { pageAnimation } from "./Animation";

const Startpage = ({ windowheight }) => {
  const [bottom, setbottom] = useState("0");
  useEffect(() => {
    setTimeout(function () {
      setbottom("110");
    }, 1300);
  });

  return (
    <Body
      height={windowheight}
      bottom={bottom}
      variants={pageAnimation}
      exit="exit"
    >
      <img className="logoImg" src={logo} alt="hey" />
      <h1>Weather Closet</h1>
    </Body>
  );
};

//styled Components
const Body = styled(motion.div)`
  width: 100vw;
  height: ${(props) => props.height}px;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background-color: #237e83;
  color: white;
  left: 0;
  bottom: ${(props) => props.bottom}vh;
  transition: 0.5s;
  .logoImg {
    height: 25vh;
    margin-bottom: 10px;
  }
`;

export default Startpage;
