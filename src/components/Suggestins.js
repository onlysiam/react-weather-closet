import { React, useEffect, useState } from "react";

//styled
import styled from "styled-components";
//Animations
import { motion } from "framer-motion";
import ClipLoader from "react-spinners/ClipLoader";
import { Navbardesktop } from "./Navbardesktop";
import { Navbar } from "./Navbar";

const Suggestions = ({
  top,
  bottom,
  accessories,
  footwear,
  date,
  fetched,
  setfetched,
}) => {
  const [topName, setTopName] = useState("");
  const [bottomName, setBottomName] = useState("");
  const [accessoriesName, setAccessoriesName] = useState("");
  const [footwearName, setFootwearName] = useState("");
  const [saveddate, setsaveddate] = useState("");
  useEffect(() => {
    setTopName(top.split(","));
    setBottomName(bottom.split(","));
    setAccessoriesName(accessories.split(","));
    setFootwearName(footwear.split(","));
    setsaveddate(date.split("T"));
  }, []);
  return (
    <Body>
      <h1>Date: {saveddate[0]} </h1>
      <div className="suggestions">
        <div className="accessories block">
          <h1>ACCESSORIES</h1>
          <div className="imgDes">
            <img src={accessoriesName[0]} alt="Not Available" />{" "}
            <h2>{accessoriesName[2]}</h2>
          </div>
          <p>{accessoriesName[1]}</p>
        </div>
        <div className="top block">
          <h1>TOP</h1>
          <div className="imgDes">
            <img src={topName[0]} alt="Not Available" /> <h2>{topName[2]}</h2>
          </div>
          <p>{topName[1]}</p>
        </div>
        <div className="bottom block">
          <h1>BOTTOM</h1>
          <div className="imgDes">
            <img src={bottomName[0]} alt="Not Available" />{" "}
            <h2>{bottomName[2]}</h2>
          </div>
          <p>{bottomName[1]}</p>
        </div>
        <div className="foot block">
          <h1>FOOTWWEAR</h1>
          <div className="imgDes">
            <img src={footwearName[0]} alt="Not Available" />{" "}
            <h2>{footwearName[2]}</h2>
          </div>
          <p>{footwearName[1]}</p>
        </div>
      </div>
    </Body>
  );
};

//styled Components
const Body = styled(motion.div)`
  h1 {
    color: white;
    font-size: 1.8vw;
    top: 0;
    left: 0;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .suggestions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    height: 50vh;
    width: 55vw;
    h1 {
      color: white;
      font-size: 1.8vw;
      top: 0;
      left: 0;
    }

    .block {
      width: 20vw;
      height: 22vh;
      margin: 0 0 0vh 2vw;
      border-radius: 10px;
      color: white;
      padding: 0px 10px;
      font-size: 1vw;
      cursor: default;
      button {
        height: 5vh;
        width: 4rem;
        float: right;
        background-color: #0abdc78b;
        color: white;
        font-size: 0.8vw;
        font-weight: 600;
        outline: none;
        border: none;
        border-radius: 3px;
        cursor: pointer;
        transition: 1s;
      }
      button:hover {
        background-color: #0f585c8a;
      }
      h1 {
        font-size: 30px;
      }
      .imgDes {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        img {
          height: 120px;
        }
        h2 {
          width: 50%;
          font-size: 15px;
        }
      }
      p {
        font-size: 30px;
      }
    }
    .bottom {
      background-color: #4988b1;
      border: 2px solid transparent;
      transition: 1s ease;
      margin-bottom: 5vh;
      background-image: ${(props) => props.bg1};
      z-index: 2;
    }
    .bottom:hover {
      transform: scale(1.02);
    }
    .top {
      background-color: #6279a3;
      border: 2px solid transparent;
      transition: 1s ease;
      z-index: 2;
    }
    .top:hover {
      transform: scale(1.02);
    }
    .accessories {
      background-color: #42a5d6;
      border: 2px solid transparent;
      transition: 1s ease;
      z-index: 2;
      button {
        margin-top: -40px;
      }
    }
    .accessories:hover {
      transform: scale(1.02);
    }
    .foot {
      background-color: #5c6db9;
      border: 2px solid transparent;
      transition: 1s ease;
      margin-bottom: 5vh;
      z-index: 2;
      .foothour {
        display: flex;
        width: 90%;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
      }
      h2 {
        color: white;
        font-size: 1vw;
      }
    }
    .foot:hover {
      transform: scale(1.02);
    }
  }
`;

export default Suggestions;
