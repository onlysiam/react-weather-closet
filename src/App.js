import { React, useEffect, useState } from "react";
//router
import { Switch, Route, useLocation } from "react-router-dom";
//animation
// import { AnimatePresence } from "framer-motion";
import Getstarted from "./components/Getstarted";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import Citysearch from "./components/Citysearch";
import Login from "./components/Login";
import Signup from "./components/Signup";
//data
import {
  iconsData,
  timeofday,
  weekdaysname,
  dressesDataMale,
  dressesDataFemale,
  dressesDataFormalFemale,
  dressesDataFormalMale,
} from "./data";

//styled
import GlobalStyle from "./components/GlobalStyle";
//animation
import { AnimatePresence } from "framer-motion";

function App() {
  const location = useLocation();

  const [windowheight, setWindowheght] = useState();
  const [windowwidth, setWindowwidth] = useState();

  const [navclrhome, setnavclrhome] = useState("white");
  const [navclrprofile, setnavclrprofile] = useState("white");
  const [navclrsettings, setnavclrsettings] = useState("white");

  const [startpage, setStartpage] = useState();
  const [authenticated, setAuthenticated] = useState(false);
  const [authenticationType, setAuthenticationType] = useState(true);
  const [incorrectUsername, setincorrectUsername] = useState(false);
  const [incorrectPassword, setincorrectPassword] = useState(false);
  const [validMail, setvalidMail] = useState(false);
  const [passMatched, setpassMatched] = useState(false);

  const [loginOP, setloginOP] = useState("1");
  const [signupOP, setsignupOP] = useState("0");
  const [resetPassword, setresetPassword] = useState(false);

  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setemail] = useState("");

  const [currentTime, setcurrentTime] = useState("");

  const [searchedCity, setsearchedCity] = useState("");
  const [searchedCountry, setsearchedCountry] = useState("");
  const [long, setLong] = useState("");
  const [lat, setLat] = useState("");

  const [isSearched, setisSearched] = useState(false);
  const [generateSuggestion, setgenerateSuggestion] = useState(false);

  const [apiData, setapiData] = useState([]);
  const [weekDays, setweekDays] = useState(weekdaysname());
  const [icons, setIcons] = useState(iconsData());
  const [greetings, setGreetings] = useState(timeofday());

  const [dressesMale, setDressesMale] = useState(dressesDataMale());
  const [dressesFemale, setDressesFemale] = useState(dressesDataFemale());
  const [dressesFormalMale, setDressesFormalMale] = useState(
    dressesDataFormalMale()
  );
  const [dressesFormalFemale, setDressesFormalFemale] = useState(
    dressesDataFormalFemale()
  );
  const [male, setMale] = useState(true);
  const [female, setFemale] = useState(false);
  const [formal, setFormal] = useState(false);

  const [savedOutfit, setSavedOutfit] = useState([]);
  const [fetchNow, setfetchNow] = useState("");

  const [preloader, setpreloader] = useState();

  useEffect(() => {
    setWindowheght(window.innerHeight);
    setWindowwidth(window.innerWidth);
    setStartpage(true);
    setTimeout(function () {
      setStartpage(false);
    }, 1600);

    if (localStorage.getItem("userID")) {
      setAuthenticated(true);
      setName(localStorage.getItem("name"));
    } else {
      setAuthenticated(false);
    }
  }, []);

  const windowSizer = () => {
    setWindowheght(window.innerHeight);
    setWindowwidth(window.innerWidth);
  };
  window.addEventListener("resize", windowSizer);

  return (
    <div className="App">
      <GlobalStyle />
      <AnimatePresence>
        <Switch location={location} key={location.pathname}>
          <Route path="/" exact>
            <Getstarted
              startpage={startpage}
              setStartpage={setStartpage}
              authenticationType={authenticationType}
              setAuthenticationType={setAuthenticationType}
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
              windowheight={windowheight}
              windowwidth={windowwidth}
              preloader={preloader}
              setpreloader={setpreloader}
              name={name}
              setName={setName}
              userName={userName}
              setUserName={setUserName}
              password={password}
              setPassword={setPassword}
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
              navclrhome={navclrhome}
              setnavclrhome={setnavclrhome}
              navclrprofile={navclrprofile}
              setnavclrprofile={setnavclrprofile}
              navclrsettings={navclrsettings}
              setnavclrsettings={setnavclrsettings}
              resetPassword={resetPassword}
              setresetPassword={setresetPassword}
            />
          </Route>
          <Route path="/login" exact>
            {!authenticated ? (
              <Login
                setAuthenticated={setAuthenticated}
                windowheight={windowheight}
                windowwidth={windowwidth}
                preloader={preloader}
                setpreloader={setpreloader}
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
                setnavclrhome={setnavclrhome}
                navclrprofile={navclrprofile}
                setnavclrprofile={setnavclrprofile}
                navclrsettings={navclrsettings}
                setnavclrsettings={setnavclrsettings}
                resetPassword={resetPassword}
                setresetPassword={setresetPassword}
              />
            ) : (
              <Citysearch
                setAuthenticated={setAuthenticated}
                windowwidth={windowwidth}
                windowheight={windowheight}
                preloader={preloader}
                setpreloader={setpreloader}
                name={name}
                setName={setName}
                currentTime={currentTime}
                setcurrentTime={setcurrentTime}
                long={long}
                setLong={setLong}
                lat={lat}
                setLat={setLat}
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
                icons={icons}
                setIcons={setIcons}
                greetings={greetings}
                setGreetings={setGreetings}
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
              />
            )}
          </Route>

          <Route path="/signup" exact>
            {!authenticated ? (
              <Signup
                setAuthenticated={setAuthenticated}
                windowheight={windowheight}
                windowwidth={windowwidth}
                preloader={preloader}
                setpreloader={setpreloader}
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
                setnavclrhome={setnavclrhome}
                navclrprofile={navclrprofile}
                setnavclrprofile={setnavclrprofile}
                navclrsettings={navclrsettings}
                setnavclrsettings={setnavclrsettings}
              />
            ) : (
              <Citysearch
                setAuthenticated={setAuthenticated}
                windowwidth={windowwidth}
                windowheight={windowheight}
                preloader={preloader}
                setpreloader={setpreloader}
                name={name}
                setName={setName}
                currentTime={currentTime}
                setcurrentTime={setcurrentTime}
                long={long}
                setLong={setLong}
                lat={lat}
                setLat={setLat}
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
                icons={icons}
                setIcons={setIcons}
                greetings={greetings}
                setGreetings={setGreetings}
                dressesMale={dressesMale}
                setDressesMale={setDressesMale}
                dressesFemale={dressesFemale}
                setDressesFemale={setDressesFemale}
                dressesFormalMale={dressesFormalMale}
                setDressesFormalMale={setDressesFormalMale}
                dressesFormalFemale={dressesFormalFemale}
                setDressesFormalFemale={setDressesFormalFemale}
                weekDays={weekDays}
                setweekDays={setweekDays}
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
              />
            )}
          </Route>
          <Route path="/dashboard" exact>
            <Citysearch
              setAuthenticated={setAuthenticated}
              windowwidth={windowwidth}
              windowheight={windowheight}
              preloader={preloader}
              setpreloader={setpreloader}
              name={name}
              setName={setName}
              currentTime={currentTime}
              setcurrentTime={setcurrentTime}
              long={long}
              setLong={setLong}
              lat={lat}
              setLat={setLat}
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
              icons={icons}
              setIcons={setIcons}
              greetings={greetings}
              setGreetings={setGreetings}
              dressesMale={dressesMale}
              setDressesMale={setDressesMale}
              dressesFemale={dressesFemale}
              setDressesFemale={setDressesFemale}
              dressesFormalMale={dressesFormalMale}
              setDressesFormalMale={setDressesFormalMale}
              dressesFormalFemale={dressesFormalFemale}
              setDressesFormalFemale={setDressesFormalFemale}
              weekDays={weekDays}
              setweekDays={setweekDays}
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
            />
          </Route>
          <Route path="/profile" exact>
            {!authenticated ? (
              <Getstarted
                setAuthenticated={setAuthenticated}
                windowheight={windowheight}
                windowwidth={windowwidth}
                preloader={preloader}
                setpreloader={setpreloader}
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
                setnavclrhome={setnavclrhome}
                navclrprofile={navclrprofile}
                setnavclrprofile={setnavclrprofile}
                navclrsettings={navclrsettings}
                setnavclrsettings={setnavclrsettings}
                resetPassword={resetPassword}
                setresetPassword={setresetPassword}
              />
            ) : (
              <Profile
                authenticated={authenticated}
                setAuthenticated={setAuthenticated}
                setnavclrhome={setnavclrhome}
                navclrprofile={navclrprofile}
                setnavclrprofile={setnavclrprofile}
                navclrsettings={navclrsettings}
                setnavclrsettings={setnavclrsettings}
                savedOutfit={savedOutfit}
                setSavedOutfit={setSavedOutfit}
              />
            )}
          </Route>
          <Route path="/settings" exact>
            {!authenticated ? (
              <Getstarted
                startpage={startpage}
                setStartpage={setStartpage}
                authenticationType={authenticationType}
                setAuthenticationType={setAuthenticationType}
                authenticated={authenticated}
                setAuthenticated={setAuthenticated}
                windowheight={windowheight}
                windowwidth={windowwidth}
                preloader={preloader}
                setpreloader={setpreloader}
                name={name}
                setName={setName}
                userName={userName}
                setUserName={setUserName}
                password={password}
                setPassword={setPassword}
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
                navclrhome={navclrhome}
                setnavclrhome={setnavclrhome}
                navclrprofile={navclrprofile}
                setnavclrprofile={setnavclrprofile}
                navclrsettings={navclrsettings}
                setnavclrsettings={setnavclrsettings}
                resetPassword={resetPassword}
                setresetPassword={setresetPassword}
              />
            ) : (
              <Settings
                setAuthenticated={setAuthenticated}
                windowwidth={windowwidth}
                windowheight={windowheight}
                preloader={preloader}
                setpreloader={setpreloader}
                name={name}
                setName={setName}
                currentTime={currentTime}
                setcurrentTime={setcurrentTime}
                long={long}
                setLong={setLong}
                lat={lat}
                setLat={setLat}
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
                icons={icons}
                setIcons={setIcons}
                greetings={greetings}
                setGreetings={setGreetings}
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
                resetPassword={resetPassword}
                setresetPassword={setresetPassword}
              />
            )}
          </Route>
        </Switch>
      </AnimatePresence>
    </div>
  );
}

export default App;
