import "./App.css";
import { useState, useEffect } from "react";

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
import AlbumScreen from "./screens/Album/AlbumScreen";
import CityScreen from "./screens/City/CityScreen"; 
import SearchResultScreen from "./screens/SearchResultScreen/SearchResultScreen"; 

function App() {
  const [screen, setScreen] = useState("auth");
  const [authMode, setAuthMode] = useState("signin");
  const [fromStart, setFromStart] = useState(false);
  const [currentAlbum, setCurrentAlbum] = useState(null);
  const [currentCity, setCurrentCity] = useState(null);
  const [theme, setTheme] = useState("light");
  const [searchData, setSearchData] = useState(null);


  /* ===== HOME VIEW STATE ===== */
  const [homeView, setHomeView] = useState("home");

  /* ===================== ALBUMS STATE ===================== */

  const [albums, setAlbums] = useState([]);
  const [albumsLoaded, setAlbumsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("albums");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setAlbums(parsed);
      }
    } catch {
      localStorage.removeItem("albums");
    } finally {
      setAlbumsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!albumsLoaded) return;
    localStorage.setItem("albums", JSON.stringify(albums));
  }, [albums, albumsLoaded]);

  /* ===================== APP BACKGROUND ===================== */

  useEffect(() => {
    const bg = localStorage.getItem("appBg");
    if (bg) {
      document.documentElement.style.setProperty("--app-bg", bg);
    }
  }, []);

  return (
    <div className={`app ${theme}`}>

      {/* ===== AUTH ===== */}
      {screen === "auth" && (
        <StartFlow
          initialScreen={authMode}
          goToCat={() => setScreen("cat")}
          goToHome={() => {
            setFromStart(true);
            setScreen("home");
          }}
        />
      )}

      {screen === "cat" && (
        <Cat
          goBack={() => {
            setAuthMode("signin");
            setScreen("auth");
          }}
        />
      )}

      {/* ===== HOME ===== */}
      {screen === "home" && (
        <Home
          albums={albums}
          setAlbums={setAlbums}
          view={homeView}
          setView={setHomeView}
          goToProfile={() => setScreen("profile")}
          showHints={fromStart}
          onHintsEnd={() => setFromStart(false)}
          openAlbum={(album) => {
            setCurrentAlbum(album);
            setScreen("album");
          }}
          openSearchResult={(data) => {
            setSearchData(data);
            setScreen("search");
          }}
        />
      )}


      {/* ===== ALBUM SCREEN (страна → города) ===== */}
      {screen === "album" && currentAlbum && (
        <AlbumScreen
          album={currentAlbum}
          albums={albums}
          setAlbums={setAlbums}
          openCity={(city) => {
            setCurrentCity(city);
            setScreen("city");
          }}
          onBack={() => setScreen("home")}
        />
      )}

      {/* ===== CITY SCREEN (город → фото) ===== */}
      {screen === "city" && currentCity && (
        <CityScreen
          album={currentAlbum}
          city={currentCity}
          albums={albums}
          setAlbums={setAlbums}
          onBack={() => setScreen("album")}
        />
      )}

      {/* ===== PROFILE ===== */}
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

      {screen === "help" && <Help onBack={() => setScreen("profile")} />}
      {screen === "about" && <About onBack={() => setScreen("profile")} />}

      {screen === "statistics" && (
        <Statistics
          onBack={() => setScreen("profile")}
          goToCountries={() => setScreen("countries")}
        />
      )}

      {screen === "countries" && (
        <CountriesVisited onBack={() => setScreen("statistics")} />
      )}

      {/* ===== SETTINGS ===== */}
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
        <SignOut
          onBack={() => setScreen("settings")}
          onConfirm={() => setScreen("auth")}
        />
      )}

      {screen === "delete-account" && (
        <DeleteAccount
          onBack={() => setScreen("settings")}
          onConfirm={() => setScreen("auth")}
        />
      )}

      {screen === "language" && (
        <Language onBack={() => setScreen("settings")} />
      )}

      {screen === "edit-profile" && (
        <EditProfile onBack={() => setScreen("profile")} />
      )}

      {screen === "search" && searchData && (
        <SearchResultScreen
          data={searchData}
          onBack={() => setScreen("home")}
          onAddCountry={(name) => {
            setAlbums(prev => [
              {
                id: Date.now(),
                title: name,
                cities: []
              },
              ...prev
            ]);
            setScreen("home");
          }}
        />
      )}
    </div>
  );
}

export default App;
