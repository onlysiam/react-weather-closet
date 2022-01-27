import { React, useEffect, useState } from "react";
import Axios from "axios";

import { Navbar } from "./Navbar";
import { Navbardesktop } from "./Navbardesktop";
import { useHistory } from "react-router-dom";

//components
import ClipLoader from "react-spinners/ClipLoader";
import Dashboard from "./Dashboard";

import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Alertoffline from "./Alertoffline";

//images
import currentlocation from "../img/currentlocation.svg";
import searchIcon from "../img/searchIcon.svg";
import citysrcBG from "../img/citysrcBG.jpg";

//styled
import styled from "styled-components";
//Animations
import { motion } from "framer-motion";
import { pageAnimation } from "./Animation";

const Citysearch = ({
  setAuthenticated,
  windowheight,
  windowwidth,
  preloader,
  setpreloader,
  name,
  setName,
  currentTime,
  setcurrentTime,
  long,
  setLong,
  lat,
  setLat,
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
  setnavclrhome,
  navclrprofile,
  setnavclrprofile,
  navclrsettings,
  setnavclrsettings,
  male,
  setMale,
  female,
  setFemale,
  formal,
  setFormal,
}) => {
  const history = useHistory();
  const [bottom, setbottom] = useState(30);
  //useEffect
  useEffect(() => {
    // setpreloader(true);
  }, [isSearched]);

  useEffect(() => {});

  const currentLocationHandler = (e) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLong(position.coords.longitude);
        setLat(position.coords.latitude);
      });

      setbottom(150);
      setTimeout(function () {
        setgenerateSuggestion(true);
        setisSearched(true);
      }, 450);
    }
  };
  const citySearch = (e) => {
    setsearchedCity(e.target.value);
  };
  const countryHandler = (e) => {
    console.log(e.target.value);
    setsearchedCountry(e.target.value);
  };
  const citysearchHandler = () => {
    fetchDataSearch();
  };
  const fetchDataSearch = async () => {
    const apiCrd = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity},${searchedCountry}&APPID=22d0e65e7e7b1518e96f61cbefe11d65`;
    try {
      await fetch(apiCrd)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.coord);
          setLat(data.coord.lat);
          setLong(data.coord.lon);

          setbottom(150);

          setTimeout(function () {
            setgenerateSuggestion(true);
            setisSearched(true);
          }, 450);
        });
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <Body
      bottom={bottom}
      height={windowheight}
      variants={pageAnimation}
      initial="hidden"
      animate="show"
      exit="exit"
    >
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
      {!isSearched ? (
        <div className="citySearch">
          <div className="captions">
            <h1>Where are you headed today?</h1>
            <h2>
              Dress for the weather
              <br id="pad" />
              Be prepared for <l>rain</l> or <l2>sunshine</l2>
            </h2>
          </div>

          <div className="locationInput">
            <div className="buttons">
              <button
                onClick={currentLocationHandler}
                className="currentLocationBtn"
              >
                <img src={currentlocation} alt="" /> Current Location
              </button>
              <select onChange={countryHandler} placeholder="Country">
                <option id="option" value="">
                  Country
                </option>
                <option id="option" value="bd">
                  Bangladesh
                </option>
                <option id="option" value="np">
                  Nepal
                </option>
                <option id="option" value="us">
                  United State
                </option>
                <option id="option" value="uk">
                  United Kingdom
                </option>
                <option id="option" value="bd">
                  Bangladesh
                </option>
              </select>
            </div>
            <div className="searchLocationInput">
              <form onSubmit={citysearchHandler}>
                <input
                  className="locationSearchbox"
                  placeholder=" City/Place"
                  value={searchedCity}
                  onChange={citySearch}
                ></input>
                <button type="reset">
                  <img onClick={citysearchHandler} src={searchIcon} alt="" />
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="Dashboard">
          <Dashboard
            setAuthenticated={setAuthenticated}
            windowwidth={windowwidth}
            windowheight={windowheight}
            preloader={preloader}
            setpreloader={setpreloader}
            name={name}
            setName={setName}
            currentTime={currentTime}
            setcurrentTime={setcurrentTime}
            searchedCity={searchedCity}
            setsearchedCity={setsearchedCity}
            searchedCountry={searchedCountry}
            setsearchedCountry={setsearchedCountry}
            isSearched={isSearched}
            setisSearched={setisSearched}
            generateSuggestion={generateSuggestion}
            setgenerateSuggestion={setgenerateSuggestion}
            apiData={apiData}
            setapiData={setapiData}
            long={long}
            setLong={setLong}
            lat={lat}
            setLat={setLat}
            icons={icons}
            setIcons={setIcons}
            greetings={greetings}
            setGreetings={setGreetings}
            dresses={dresses}
            setDresses={setDresses}
            weekDays={weekDays}
            setweekDays={setweekDays}
            dressesMale={dressesMale}
            setDressesMale={setDressesMale}
            dressesFemale={dressesFemale}
            setDressesFemale={setDressesFemale}
            dressesFormalMale={dressesFormalMale}
            setDressesFormalMale={setDressesFormalMale}
            dressesFormalFemale={dressesFormalFemale}
            setDressesFormalFemale={setDressesFormalFemale}
            setnavclrhome={setnavclrhome}
            navclrprofile={navclrprofile}
            setnavclrprofile={setnavclrprofile}
            navclrsettings={navclrsettings}
            setnavclrsettings={setnavclrsettings}
            male={male}
            setMale={setMale}
            female={female}
            setFemale={setFemale}
            formal={formal}
            setFormal={setFormal}
            setbottom={setbottom}
          />
        </div>
      )}
      {preloader ? (
        <div className="preloader">
          <ClipLoader color="#50c2c9" loading={preloader} size={150} />
        </div>
      ) : (
        ""
      )}
    </Body>
  );
};

//styled Components
const Body = styled(motion.div)`
  @media (min-width: 800px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    height: ${(props) => props.height}px;
    background-image: url(${citysrcBG});
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
    .nav {
      position: fixed;
      width: 100vw;
      left: 0;
      top: 0;
      height: 7vh;
      background-color: #0000003b;
    }
    .citySearch {
      position: absolute;
      transition: 1s;
      bottom: ${(props) => props.bottom}vh;
      .captions {
        img {
          height: 12rem;
        }
        h1 {
          color: #123386d5;
          font-size: 5.4rem;
          padding-bottom: 2rem;
          cursor: default;
        }
        h2 {
          color: #4d2786ba;
          font-size: 3rem;
          font-family: century-gothic, sans-serif;
          padding-bottom: 2rem;
          cursor: default;
          l {
            color: #54c1ff;
            text-shadow: 0px 5px 5px #045f83;
          }
          l2 {
            color: #fcd121;
            text-shadow: 0px 5px 5px #80740c;
          }
        }
      }
      .locationInput {
        .buttons {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          button {
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-size: 15px;
            background-color: #4d278650;
            border: 2px solid #29abe2;
            border-radius: 10px;
            padding: 10px;
            cursor: pointer;
            overflow: hidden;
            transition: 0.5s;
            img {
              height: 20px;
              padding-right: 5px;
            }
          }
          button:hover {
            background-color: #32729e;
            border: 2px solid #29abe2;
          }

          select {
            color: white;
            font-size: 15px;
            background-color: #4d278650;
            border: 2px solid #29abe2;
            border-radius: 10px;
            padding: 10px;
            cursor: pointer;
            overflow: hidden;
            transition: 0.5s;
            margin-left: 50px;
          }
          select:hover {
            background-color: #32729e;
            border: 2px solid #29abe2;
          }
          #option {
            background-color: #32729e;
            border: 2px solid #29abe2;
          }
          select:focus {
            outline: none;
            border: 2px solid #29abe2;
          }
        }
        .searchLocationInput {
          form {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-top: 2vh;
            width: 50vw;
            input {
              width: 38.8vw;
              height: 5vh;
              padding: 5px;
              font-size: 22px;
              background: #e5d4ff50;
              border: 2px solid #29abe2;
              border-radius: 5px;
              transition: 0.5s;
            }
            input::placeholder {
              color: rgba(0, 0, 0, 0.452);
            }
            input:focus {
              outline: none;
              background-color: white;
              border: 2px solid #29abe2;
            }

            button {
              margin-left: -60px;
              height: 4.5vh;
              width: 60px;
              background: transparent;
              border: none;
              img {
                height: 4.4vh;
                padding: 5px;
                border: 1px solid transparent;
                border-radius: 20px;
                background-color: #29aae260;
                cursor: pointer;
                transition: 0.5s;
              }
              img:hover {
                outline: none;
                background-color: white;
                border: 1px solid #29abe2;
              }
            }
          }
        }
      }
    }
  }
`;

export default Citysearch;
