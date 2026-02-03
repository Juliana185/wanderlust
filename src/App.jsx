import { useState } from "react";
import "./App.css";

import StartFlow from "./screens/Auth/StartFlow";
import Cat from "./screens/Auth/Cat";
import Home from "./screens/Home/Home";
import Profile from "./screens/Profile/Profile";
import Help from "./screens/Help/Help";
import About from "./screens/About/About";
import Statistics from "./screens/Statistics/Statistics";
import CountriesVisited from "./screens/CountriesVisited/CountriesVisited";
import Settings from "./screens/Settings/Settings";
import ChangePassword from "./screens/ChangePassword/ChangePassword";
import ChangePasswordSuccess from "./screens/ChangePasswordSuccess/ChangePasswordSuccess";
import ResetPassword from "./screens/ResetPassword/ResetPassword";
import SignOut from "./screens/SignOut/SignOut";
import DeleteAccount from "./screens/DeleteAccount/DeleteAccount";
import Language from "./screens/Language/Language";
import EditProfile from "./screens/EditProfile/EditProfile";


import Paris from "./screens/Country/paris/paris";
import Germany from "./screens/Country/germany/germany";
import Italy from "./screens/Country/italy/italy";
import Japan from "./screens/Country/japan/japan";
import Serbia from "./screens/Country/serbia/serbia";
import Montenegro from "./screens/Country/montenegro/montenegro";
import USA from "./screens/Country/usa/usa";
import Czechia from "./screens/Country/czechia/czechia";

function App() {
  const [countryId, setCountryId] = useState(null);
  const [screen, setScreen] = useState("auth");
  const [authMode, setAuthMode] = useState("signin");

  const [theme, setTheme] = useState("light"); // 🌞🌚

  return (
    <div className={`app ${theme}`}>
      {screen === "auth" && (
        <StartFlow
          initialScreen={authMode}
          goToCat={() => setScreen("cat")}
          goToHome={() => setScreen("home")}
        />
      )}

      {screen === "cat" && (
        <Cat
          goBack={() => {setAuthMode("signin"); setScreen("auth");}}
        />
      )}

      {screen === "home" && (
        <Home
          goToProfile={() => setScreen("profile")}

          goToParis={() => setScreen("paris")}
          goToGermany={() => setScreen("germany")}
          goToItaly={() => setScreen("italy")}
          goToJapan={() => setScreen("japan")}
          goToSerbia={() => setScreen("serbia")}
          goToMontenegro={() => setScreen("montenegro")}
          goToUsa={() => setScreen("usa")}
          goToCzechia={() => setScreen("czechia")}
        />
      )}

      {screen === "profile" && (
        <Profile
          goBack={() => setScreen("home")}
          goToHelp={() => setScreen("help")}
          goToAbout={() => setScreen("about")}
          goToStatistics={() => setScreen("statistics")}
          goToSettings={() => setScreen("settings")}
          goToEdit={() => setScreen("edit-profile")}
        />
      )}

      {screen === "help" && (
        <Help onBack={() => setScreen("profile")}
        />
      )}

      {screen === "about" && (
        <About onBack={() => setScreen("profile")}
        />
      )}

      {screen === "statistics" && (
        <Statistics
          onBack={() => setScreen("profile")}
          goToCountries={() => setScreen("countries")} />
      )}

      {screen === "countries" && (
        <CountriesVisited onBack={() => setScreen("statistics")} />
      )}

      {screen === "settings" && (
        <Settings
          onBack={() => setScreen("profile")}
          theme={theme}
          setTheme={setTheme}
          goToChangePassword={() => setScreen("change-password")}
          goToSignOut={() => setScreen("signout")}
          goToDelete={() => setScreen("delete-account")}
          goToLanguage={() => setScreen("language")}
        />
      )}

      {screen === "change-password" && (
        <ChangePassword
          onBack={() => setScreen("settings")}
          onSuccess={() => setScreen("change-password-success")}
          onForgot={() => setScreen("reset-password")}
        />
      )}

      {screen === "change-password-success" && (
        <ChangePasswordSuccess goToMain={() => setScreen("home")} />
      )}

      {screen === "reset-password" && (
        <ResetPassword onBack={() => setScreen("change-password")} />
      )}

      {screen === "signout" && (
        <SignOut onBack={() => setScreen("settings")} onConfirm={() => setScreen("auth")} />
      )}

      {screen === "delete-account" && (
        <DeleteAccount onBack={() => setScreen("settings")} onConfirm={() => setScreen("auth")} />
      )}

      {screen === "language" && <Language onBack={() => setScreen("settings")} />}

      {screen === "edit-profile" && ( <EditProfile onBack={() => setScreen("profile")} />)}

      {screen === "paris" && <Paris onBack={() => setScreen("home")} />}
      {screen === "germany" && <Germany onBack={() => setScreen("home")} />}
      {screen === "italy" && <Italy onBack={() => setScreen("home")} />}
      {screen === "japan" && <Japan onBack={() => setScreen("home")} />}
      {screen === "serbia" && <Serbia onBack={() => setScreen("home")} />}
      {screen === "montenegro" && <Montenegro onBack={() => setScreen("home")} />}
      {screen === "usa" && <USA onBack={() => setScreen("home")} />}
      {screen === "czechia" && <Czechia onBack={() => setScreen("home")} />}
    </div>
  );
}

export default App;
