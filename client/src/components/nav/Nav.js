import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "./Nav.css";
// constants
import { MAIN_LOGO_PNG, MAIN_DOTS_BG_WHITE_PNG } from "../../constants/images";
import { DSA_ROUTE, HOME_ROUTE, NEWS_ROUTE, RESOURCES_ROUTE, SIGN_IN_ROUTE } from "../../constants/routes";
// contexts
import UserContext from "../../contexts/userContext";
// mui
import { Menu, IconButton } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import EqualizerRoundedIcon from "@mui/icons-material/EqualizerRounded";
import NewspaperRoundedIcon from "@mui/icons-material/NewspaperRounded";
import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

const Nav = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const scrollToTopRef = useRef(null);
  const navRef = useRef(null);
  const [avatarPic, setAvatarPic] = useState("");
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [avatarAnchor, setAvatarAnchor] = useState(null);

  useEffect(() => {
    setAvatarPic(`https://avatars.dicebear.com/api/avataaars/${Math.floor(Math.random() * 10000)}.svg`);
    window.addEventListener("scroll", handleScrollEvents);
    return () => window.removeEventListener("scroll", handleScrollEvents);
  }, []);

  const handleSignOut = () => {
    const data = JSON.parse(localStorage.getItem("hackathon"));
    delete data["token"];
    localStorage.setItem("hackathon", JSON.stringify(data));
    navigate(SIGN_IN_ROUTE);
    window.location.reload();
  };

  const handleScrollEvents = () => {
    if (window.scrollY > 10) {
      scrollToTopRef.current.style.transform = "scale(1)";
    } else {
      scrollToTopRef.current.style.transform = "scale(0)";
    }
  };

  return (
    <div className="nav__container">
      <IconButton ref={scrollToTopRef} onClick={() => window.scrollTo(0, 0)}>
        <ArrowUpwardRoundedIcon />
      </IconButton>
      <div className="nav" ref={navRef}>
        <div className="nav__bg" style={{ backgroundImage: `url("${MAIN_DOTS_BG_WHITE_PNG}")` }}></div>
        <div className="nav__left" onClick={() => navigate(HOME_ROUTE)}>
          <img className="nav__logo" src={MAIN_LOGO_PNG} alt="" />
          <div className="nav__title">
            <p>AlgoMate - Your DSA Companion!</p>
            <p>Algozenith's Internal Hackathon, 2022</p>
          </div>
        </div>
        <div className="nav__right">
          <NavLink exact="true" to={HOME_ROUTE} className={({ isActive }) => (isActive ? "nav__link nav__activeLink" : "nav__link")}>
            <HomeRoundedIcon />
            Home
          </NavLink>
          <NavLink exact="true" to={DSA_ROUTE} className={({ isActive }) => (isActive ? "nav__link nav__activeLink" : "nav__link")}>
            <EqualizerRoundedIcon />
            DSA
          </NavLink>
          <NavLink exact="true" to={NEWS_ROUTE} className={({ isActive }) => (isActive ? "nav__link nav__activeLink" : "nav__link")}>
            <NewspaperRoundedIcon />
            News
          </NavLink>
          <NavLink exact="true" to={RESOURCES_ROUTE} className={({ isActive }) => (isActive ? "nav__link nav__activeLink" : "nav__link")}>
            <PsychologyRoundedIcon />
            Resources
          </NavLink>
          {/* <NavLink exact="true" to={ABOUT_ROUTE} className={({ isActive }) => (isActive ? "nav__link nav__activeLink" : "nav__link")}><AccountCircleRoundedIcon />About</NavLink> */}
          <img
            className="nav__avatar"
            src={user.profilePic || avatarPic}
            alt=""
            onClick={(e) => setAvatarAnchor(e.currentTarget)}
            style={{ marginLeft: "10px" }}
          />
          <Menu className="nav__basicMenu" anchorEl={avatarAnchor} open={Boolean(avatarAnchor)} onClose={() => setAvatarAnchor(null)}>
            <div className="nav__menu">
              <div className="nav__menuInfo">
                <img className="nav__avatar" src={user.profilePic || avatarPic} alt="" />
                <div className="nav__userInfo">
                  <p>{user.name || "Anonymous"}</p>
                  <p>{user.name ? "Welcome, " + user.name + "!" : "Why not sign in?"}</p>
                </div>
              </div>
              <div className="nav__menuLinks" onClick={() => setAvatarAnchor(null)}>
                <div onClick={() => (user.name ? handleSignOut() : navigate(SIGN_IN_ROUTE))} className="nav__link">
                  <ExitToAppRoundedIcon />
                  {user.name ? "Sign Out" : "Sign In"}
                </div>
              </div>
            </div>
          </Menu>
        </div>
        <IconButton className="nav__menuToggle" onClick={(e) => setMenuAnchor(e.currentTarget)}>
          <MenuRoundedIcon />
        </IconButton>
        <Menu className="nav__basicMenu nav__resMenu" anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={() => setMenuAnchor(null)}>
          <div className="nav__menu">
            <div className="nav__menuInfo">
              <img
                className="nav__avatar"
                src={user.profilePic || avatarPic}
                alt=""
                onClick={() => {
                  setMenuAnchor(null);
                  navigate(HOME_ROUTE + "/" + user.email);
                }}
              />
              <div className="nav__userInfo">
                <p>{user.name || "Anonymous"}</p>
                <p>{user.name ? "Welcome, " + user.name + "!" : "Why not sign in?"}</p>
              </div>
            </div>
            <div className="nav__menuLinks" onClick={() => setMenuAnchor(null)}>
              <NavLink exact="true" to={HOME_ROUTE} className={({ isActive }) => (isActive ? "nav__link nav__activeLink" : "nav__link")}>
                <HomeRoundedIcon />
                Home
              </NavLink>
              <NavLink exact="true" to={DSA_ROUTE} className={({ isActive }) => (isActive ? "nav__link nav__activeLink" : "nav__link")}>
                <EqualizerRoundedIcon />
                DSA
              </NavLink>
              <NavLink exact="true" to={NEWS_ROUTE} className={({ isActive }) => (isActive ? "nav__link nav__activeLink" : "nav__link")}>
                <NewspaperRoundedIcon />
                News
              </NavLink>
              <NavLink
                exact="true"
                to={RESOURCES_ROUTE}
                className={({ isActive }) => (isActive ? "nav__link nav__activeLink" : "nav__link")}
              >
                <PsychologyRoundedIcon />
                Resources
              </NavLink>
              {/* <NavLink exact="true" to={ABOUT_ROUTE} className={({ isActive }) => (isActive ? "nav__link nav__activeLink" : "nav__link")}><AccountCircleRoundedIcon />About</NavLink> */}
              <div onClick={() => (user.name ? handleSignOut() : navigate(SIGN_IN_ROUTE))} className="nav__link">
                <ExitToAppRoundedIcon />
                {user.name ? "Sign Out" : "Sign In"}
              </div>
            </div>
          </div>
        </Menu>
      </div>
    </div>
  );
};

export default Nav;
