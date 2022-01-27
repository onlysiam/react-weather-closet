import { React, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Axios from "axios";

//styled
import styled from "styled-components";
//Animations
import { motion } from "framer-motion";
import ClipLoader from "react-spinners/ClipLoader";
import { Navbardesktop } from "./Navbardesktop";
import { Navbar } from "./Navbar";

import profileBG from "../img/profileBG.jpg";
import Suggestions from "./Suggestins";
const Profile = ({
  authenticated,
  setAuthenticated,
  setnavclrhome,
  navclrprofile,
  setnavclrprofile,
  navclrsettings,
  setnavclrsettings,
  savedOutfit,
  setSavedOutfit,
}) => {
  const [fetched, setfetched] = useState(true);
  useEffect(() => {
    setnavclrhome("white");
    setnavclrsettings("white");
    Axios.post("https://weathercloset.onlysiam.com/api/fetch", {
      username: localStorage.getItem("userID"),
    }).then((response) => {
      if (response.data.length > 0) {
        setSavedOutfit(response.data);
      }
    });
  }, []);

  return (
    <Body>
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
      <div className="outfits">
        <h1 id="header">Saved Outfits</h1>
        {savedOutfit.map((dress) => (
          <Suggestions
            top={dress.top}
            bottom={dress.bottom}
            accessories={dress.accessories}
            footwear={dress.foot}
            date={dress.date}
            fetched={fetched}
            setfetched={setfetched}
            key={uuidv4()}
          />
        ))}
      </div>
    </Body>
  );
};

//styled Components
const Body = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100vw;
  height: 100vh;
  position: absolute;
  overflow-y: scroll;
  background-image: url(${profileBG});
  .nav {
    position: fixed;
    width: 100vw;
    left: 0;
    top: 0;
    height: 7vh;
    background-color: #363636;
    z-index: 10;
  }
  .outfits {
    position: absolute;
    display: flex;

    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
    margin-top: 15vh;
    width: 80vw;
    background-color: #0000001c;
    #header {
      position: fixed;
      top: 7vh;
      width: 100vw;
      height: 8vh;
      left: 0;
      text-align: center;
      background-color: #41bbb199;
      color: white;
      font-size: 60px;
      z-index: 10;
    }
  }
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 50px;
  }
`;

export default Profile;
