import { React, useEffect, useState } from "react";
import { ReactSkycon, SkyconType } from "react-skycons-extended";
import Axios from "axios";

import { useHistory } from "react-router-dom";
//components
import ClipLoader from "react-spinners/ClipLoader";
import citysrcBG from "../img/citysrcBG.jpg";
import larrow from "../img/larrow.svg";
import sunny from "../img/sunny.jpg";

import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Alertoffline from "./Alertoffline";

//images
import currentlocation from "../img/currentlocation.svg";
import searchIcon from "../img/searchIcon.svg";

//styled
import styled from "styled-components";
//Animations
import { motion } from "framer-motion";
import { pageAnimation } from "./Animation";

const Dashboard = ({
  setAuthenticated,
  windowheight,
  windowwidth,
  preloader,
  setpreloader,
  name,
  setName,
  long,
  setLong,
  lat,
  setLat,
  currentTime,
  setcurrentTime,
  searchedCity,
  setsearchedCity,
  searchedCountry,
  setsearchedCountry,
  isSearched,
  setisSearched,
  apiData,
  setapiData,
  icons,
  setIcons,
  greetings,
  setGreetings,
  dresses,
  setDresses,
  weekDays,
  setweekDays,
  dressesMale,
  setDressesMale,
  dressesFemale,
  setDressesFemale,
  dressesFormalMale,
  setDressesFormalMale,
  dressesFormalFemale,
  setDressesFormalFemale,
  generateSuggestion,
  setgenerateSuggestion,
  male,
  setMale,
  female,
  setFemale,
  formal,
  setFormal,
  setbottom,
}) => {
  const history = useHistory();
  //useEffect
  const [currentIcon, setcurrentIcon] = useState();
  const [weatherDescription, setweatherDescription] = useState("");
  const [currentTemp, setcurrentTemp] = useState("");
  const [currentDay, setcurrentDay] = useState("");
  const [currentWeather, setcurrentWeather] = useState([]);

  const [marginBottom, setmarginBottom] = useState(100);

  const [bgM, setbgM] = useState("#07b65e");
  const [formalBg, setformalBg] = useState("");
  const [bgF, setbgF] = useState("");

  const [top, setTop] = useState("");
  const [bottom, setBottom] = useState("");
  const [accessories, setAccessories] = useState("");
  const [footwear, setFootwear] = useState("");
  const [saved, setSaved] = useState(false);

  const [topName, setTopName] = useState("");
  const [bottomName, setBottomName] = useState("");
  const [accessoriesName, setAccessoriesName] = useState("");
  const [footwearName, setFootwearName] = useState("");

  const [accDescription, setaccDescription] = useState("");
  const [topDescription, settopDescription] = useState("");
  const [bottomDescription, setbottomDescription] = useState("");
  const [footwearDescription, setfootwearDescription] = useState("");
  useEffect(() => {
    if (apiData.current) {
      let celsius = parseInt(apiData.current.temp) - 273.15;
      celsius = Math.floor(celsius);
      setcurrentTemp(celsius);
      setweatherDescription(apiData.current.weather[0].description);
      let i;
      for (i = 0; i < 9; i++) {
        if (icons[i].main === apiData.current.weather[0].main) {
          let ic = SkyconType + "." + icons[i].iconD;
          setcurrentIcon(icons[i].iconD);
        }
      }

      if (generateSuggestion) {
        dressSuggestion();
      }
    }
    let todayday = new Date();
    let i;
    let weekdayNumber = todayday.getDay();
    for (i = 0; i < 7; i++) {
      if (parseInt(weekDays[i].day) === weekdayNumber) {
        setcurrentDay(weekDays[i].name);
        break;
      }
    }
  });
  useEffect(() => {
    if (searchedCountry === "bd") {
      setsearchedCountry("Bangladesh");
    }
    if (searchedCountry === "us") {
      setsearchedCountry("United States");
    }
    if (searchedCountry === "uk") {
      setsearchedCountry("United Kingdom");
    }
    if (searchedCountry === "np") {
      setsearchedCountry("Nepal");
    }
    if (lat && long) {
      console.log("fetching");
      fetchData();
    }
  }, []);
  const fetchData = async () => {
    const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude={part}&APPID=22d0e65e7e7b1518e96f61cbefe11d65`;
    try {
      await fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setapiData(data);
        });
    } catch (error) {
      console.log("error", error);
    }
    setgenerateSuggestion(true);
  };
  const icon = {
    icon: currentIcon,
    size: 128,
    animate: true,
    color: "white",
  };
  const maleHandler = () => {
    if (!male) {
      setFemale(false);
      setMale(true);
      setbgF("");
      setbgM("#07b65e");
      setgenerateSuggestion(true);
    }
  };
  const femaleHandler = () => {
    if (!female) {
      setFemale(true);
      setMale(false);
      setbgM("");
      setbgF("#07b65e");
      setgenerateSuggestion(true);
    }
  };
  const formalHandler = () => {
    if (formal) {
      setFormal(false);
      setformalBg("");
      setgenerateSuggestion(false);
    }
    if (!formal) {
      setFormal(true);
      setformalBg("#07b65e");
      setgenerateSuggestion(true);
    }
  };
  const accessoriesSuggestion = (min, max) => {
    if (male) {
      if (!formal) {
        let random;
        if (apiData.current.weather[0].main === "Rain") {
          random = 2;
        } else {
          random = Math.floor(Math.random() * max) + min;
        }
        setAccessories(dressesMale[0][random].code);
        setaccDescription(dressesMale[0][random].description);
        setAccessoriesName(dressesMale[0][random].name);
        setgenerateSuggestion(false);
      }
    }
    if (female) {
      if (!formal) {
        let random;
        if (apiData.current.weather[0].main === "Rain") {
          random = 2;
        } else {
          random = Math.floor(Math.random() * max) + min;
        }
        setAccessories(dressesFemale[0][random].code);
        setaccDescription(dressesFemale[0][random].description);
        setAccessoriesName(dressesFemale[0][random].name);
        setgenerateSuggestion(false);
      }
    }
  };
  const topSuggestion = (min, max) => {
    if (male) {
      if (!formal) {
        let random = Math.floor(Math.random() * (max - min + 1) + min);
        console.log(random);
        setTop(dressesMale[2][random].code);
        settopDescription(dressesMale[2][random].description);
        setTopName(dressesMale[2][random].name);
        setgenerateSuggestion(false);
      }
      if (formal) {
        let random = Math.floor(Math.random() * 5);
        console.log(random);
        setTop(dressesFormalMale[1][random].code);
        settopDescription(dressesFormalMale[1][random].description);
        setTopName(dressesFormalMale[1][random].name);
        setgenerateSuggestion(false);
      }
    }
    if (female) {
      if (!formal) {
        let random = Math.floor(Math.random() * (max - min + 1) + min);
        console.log(random);
        setTop(dressesFemale[2][random].code);
        settopDescription(dressesFemale[2][random].description);
        setTopName(dressesFemale[2][random].name);
        setgenerateSuggestion(false);
      }
      if (formal) {
        let random = Math.floor(Math.random() * 5);
        console.log(random);
        setTop(dressesFormalFemale[1][random].code);
        settopDescription(dressesFormalFemale[1][random].description);
        setTopName(dressesFormalFemale[1][random].name);
        setgenerateSuggestion(false);
      }
    }
  };
  const bottomSuggestion = (min, max) => {
    if (male) {
      if (!formal) {
        let random = Math.floor(Math.random() * max) + min;
        setBottom(dressesMale[1][random].code);
        setbottomDescription(dressesMale[1][random].description);
        setBottomName(dressesMale[1][random].name);
        setgenerateSuggestion(false);
      }
      if (formal) {
        let random = Math.floor(Math.random() * 5);
        setBottom(dressesFormalMale[0][random].code);
        setbottomDescription(dressesFormalMale[0][random].description);
        setBottomName(dressesFormalMale[0][random].name);
        setgenerateSuggestion(false);
      }
    }
    if (female) {
      if (!formal) {
        let random = Math.floor(Math.random() * max) + min;
        setBottom(dressesFemale[1][random].code);
        setbottomDescription(dressesFemale[1][random].description);
        setBottomName(dressesFemale[1][random].name);
      }
      if (formal) {
        let random = Math.floor(Math.random() * 5);
        setBottom(dressesFormalFemale[0][random].code);
        setbottomDescription(dressesFormalFemale[0][random].description);
        setBottomName(dressesFormalFemale[0][random].name);
      }
    }
  };
  const myOutfitHandler = () => {
    history.push("/profile");
  };
  const footwearSuggestion = (min, max) => {
    if (male) {
      if (!formal) {
        let random = Math.floor(Math.random() * max) + min;
        setFootwear(dressesMale[3][random].code);
        setfootwearDescription(dressesMale[3][random].description);
        setFootwearName(dressesMale[3][random].name);
        setgenerateSuggestion(false);
      }
      if (formal) {
        let random = Math.floor(Math.random() * 5);
        setFootwear(dressesFormalMale[2][random].code);
        setfootwearDescription(dressesFormalMale[2][random].description);
        setFootwearName(dressesFormalMale[2][random].name);
        setgenerateSuggestion(false);
      }
    }
    if (female) {
      if (!formal) {
        let random = Math.floor(Math.random() * max) + min;
        setFootwear(dressesFemale[3][random].code);
        setfootwearDescription(dressesFemale[3][random].description);
        setFootwearName(dressesFemale[3][random].name);
        setgenerateSuggestion(false);
      }
      if (formal) {
        let random = Math.floor(Math.random() * 5);
        setFootwear(dressesFormalFemale[2][random].code);
        setfootwearDescription(dressesFormalFemale[2][random].description);
        setFootwearName(dressesFormalFemale[2][random].name);
        setgenerateSuggestion(false);
      }
    }
  };
  const newSuggestions = () => {
    setgenerateSuggestion(true);
  };
  const dressSuggestion = () => {
    if (currentTemp) {
      if (currentTemp <= 10) {
        accessoriesSuggestion(0, 2);
        topSuggestion(0, 5);
        bottomSuggestion(0, 9);
        footwearSuggestion(0, 9);
        setmarginBottom(0);
      }
      if (currentTemp > 10 && currentTemp <= 15) {
        accessoriesSuggestion(0, 2);
        topSuggestion(0, 5);
        bottomSuggestion(0, 9);
        footwearSuggestion(0, 9);
        setmarginBottom(0);
      }
      if (currentTemp > 15 && currentTemp <= 20) {
        accessoriesSuggestion(0, 2);
        topSuggestion(0, 5);
        bottomSuggestion(0, 9);
        footwearSuggestion(0, 9);
        setmarginBottom(0);
      }
      if (currentTemp > 20 && currentTemp <= 26) {
        accessoriesSuggestion(0, 2);
        topSuggestion(0, 5);
        bottomSuggestion(0, 9);
        footwearSuggestion(0, 9);
        setmarginBottom(0);
      }
      if (currentTemp > 26) {
        accessoriesSuggestion(0, 2);
        topSuggestion(6, 9);
        bottomSuggestion(0, 9);
        footwearSuggestion(0, 9);
        setmarginBottom(0);
      }
    }
  };

  const saveOutfitsHandler = () => {
    Axios.post("https://weathercloset.onlysiam.com/api/saveoutfit", {
      username: localStorage.getItem("userID"),
      accessories: accessories + "," + accessoriesName + "," + accDescription,
      top: top + "," + topName + "," + topDescription,
      bottom: bottom + "," + bottomName + "," + bottomDescription,
      foot: footwear + "," + footwearName + "," + footwearDescription,
    }).then((response) => {
      setSaved(true);

      setTimeout(function () {
        setSaved(false);
      }, 3000);
    });
  };

  const changeCityHandler = () => {
    setmarginBottom(100);
    setTimeout(function () {
      setFemale(false);
      setMale(true);
      setbottom(30);
      setisSearched(false);
    }, 750);
  };
  const updateTime = () => {
    let time = new Date().toLocaleTimeString();
    setcurrentTime(time);
  };

  setInterval(updateTime, 1000);
  return (
    <Body bgM={bgM} bgF={bgF} marginB={marginBottom} formalbg={formalBg}>
      <div className="topSection">
        <div className="left">
          {searchedCity ? (
            <h1>
              {searchedCity}, {searchedCountry}
            </h1>
          ) : (
            <h1>Bashundhara, Bangladesh</h1>
          )}
          <button onClick={changeCityHandler}>
            <img src={larrow} alt="" />
            Change City
          </button>
          <ReactSkycon
            icon={currentIcon}
            color={icon.color}
            size={icon.size}
            animate={icon.animate}
          />
          <h2>
            {currentTemp} <p>&#8451;</p>
          </h2>
        </div>
        <div className="right">
          <h1>{weatherDescription.toUpperCase()}</h1>
          <h2>{currentDay}</h2>
          <p>{currentTime}</p>
        </div>
      </div>
      <div className="lowerSection">
        <div className="buttons">
          <button onClick={myOutfitHandler}>My Outfits</button>
          <div className="saveOutfits">
            <div className="morf">
              <button>
                <h3 onClick={formalHandler}>Formal Dress</h3>
              </button>
              <button>
                <h1 onClick={maleHandler}>Male</h1>
                <h2 onClick={femaleHandler}>Female</h2>
              </button>
            </div>
            <button onClick={newSuggestions}>New Suggestions</button>
            {saved ? (
              <button
                style={{
                  backgroundColor: "#33c73a",
                }}
              >
                Saved
              </button>
            ) : (
              <button onClick={saveOutfitsHandler}>Save Outfit</button>
            )}
          </div>
        </div>
        <div className="suggestions">
          <div className="accessories block">
            <h1>ACCESSORIES</h1>
            <div className="imgDes">
              <img src={accessories} alt="Not Available" />{" "}
              <h2>{accDescription}</h2>
            </div>
            <p>{accessoriesName}</p>
          </div>
          <div className="top block">
            <h1>TOP</h1>
            <div className="imgDes">
              <img src={top} alt="Not Available" /> <h2>{topDescription}</h2>
            </div>
            <p>{topName}</p>
          </div>
          <div className="bottom block">
            <h1>BOTTOM</h1>
            <div className="imgDes">
              <img src={bottom} alt="Not Available" />{" "}
              <h2>{bottomDescription}</h2>
            </div>
            <p>{bottomName}</p>
          </div>
          <div className="foot block">
            <h1>FOOTWWEAR</h1>
            <div className="imgDes">
              <img src={footwear} alt="Not Available" />{" "}
              <h2>{footwearDescription}</h2>
            </div>
            <p>{footwearName}</p>
          </div>
        </div>
      </div>
    </Body>
  );
};

//styled Components
const Body = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  .topSection {
    width: 100vw;
    height: 50vh;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-image: url(${sunny});
    transition: 1s;
    margin-bottom: ${(props) => props.marginB}vh;
    .left {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      width: 50vw;
      padding: 0vh 5vw;
      button {
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-size: 15px;
        background-color: #4d278650;
        border: 1px solid #29abe2;
        border-radius: 10px;
        margin-bottom: 15px;
        padding: 10px;
        cursor: pointer;
        overflow: hidden;
        transition: 0.5s;
        img {
          height: 15px;
          padding-right: 5px;
        }
      }
      button:hover {
        background-color: #32739e8b;
        border: 1px solid #29abe2;
      }
      h1 {
        color: white;
        font-size: 2.5vw;
        height: 7vh;
        text-shadow: 0px 5px 5px #00000049;
      }
      h2 {
        display: flex;
        color: white;
        margin-top: 15px;
        font-size: 2.5vw;
        margin-left: 30px;
        margin-bottom: 15px;
        text-shadow: 0px 5px 5px #00000049;
        p {
          font-size: 25px;
        }
      }
    }
    .right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 50vw;
      h1 {
        color: white;
        font-size: 2.5vw;
        height: 7vh;
        text-shadow: 0px 5px 5px #00000049;
        transition: 1s;
      }
      h2 {
        display: flex;
        color: white;
        margin-top: 15px;
        font-size: 2.5vw;
        margin-bottom: 15px;
        text-shadow: 0px 5px 5px #00000049;
        transition: 1s;
      }
      p {
        font-size: 25px;
        color: white;

        transition: 1s;
      }
    }
  }
  .lowerSection {
    display: flex;
    height: 50vh;
    width: 70vw;
    justify-content: center;
    align-items: center;
    .buttons {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      width: 24vw;
      height: 40vh;
      button {
        font-size: 25px;
        font-family: century-gothic, sans-serif;
        color: white;
        background: #c71717;
        width: 10vw;
        height: 10vh;
        border: none;
        border-radius: 7px;
        cursor: pointer;
        overflow: hidden;
        transition: 0.5s;
      }
      button:hover {
        background-color: #32729e;
        border: 2px solid #29abe2;
      }
      .saveOutfits {
        display: flex;
        flex-direction: column;
        .morf {
          button {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-family: century-gothic, sans-serif;
            color: white;
            width: 8vw;
            padding: 5px;
            height: 5vh;
            border: none;
            border-radius: 7px;
            margin-left: 25px;
            border: 2px solid transparent;
            background-color: #32739e84;
            cursor: pointer;
            overflow: hidden;
            transition: 0.5s;
            h1 {
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 20px;
              border-radius: 10px;
              background-color: ${(props) => props.bgM};
              width: 50%;
              height: 100%;
              transition: 0.5s;
            }
            h2 {
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 20px;
              border-radius: 10px;
              width: 50%;
              height: 100%;
              background-color: ${(props) => props.bgF};
              transition: 0.5s;
            }
            h3 {
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 20px;
              border-radius: 10px;
              width: 100%;
              height: 100%;
              background-color: ${(props) => props.formalbg};
              transition: 0.5s;
            }
          }
          button:hover {
            background-color: #32729e;
            border: 2px solid #29abe2;
          }
        }
        button {
          margin-bottom: 2vh;
        }
      }
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
        height: 20vh;
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
  }
`;

export default Dashboard;
