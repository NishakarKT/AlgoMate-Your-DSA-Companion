import React, { useContext, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Footer.css";
// components
import MediaSlider from "../mediaSlider/MediaSlider";
// constants
import { HOME_ROUTE, DSA_ROUTE, NEWS_ROUTE, ABOUT_ROUTE, RESOURCES_ROUTE } from "../../constants/routes";
import { CONTACT_FB_URL, CONTACT_GH_URL, CONTACT_IN_URL, CONTACT_YT_URL, IMPORTANT_ALGOZENITH_URL, IMPORTANT_CODEACADEMY_URL, IMPORTANT_CODECHEF_URL, IMPORTANT_CODEFORCES_URL, IMPORTANT_GEEKSFORGEEKS_URL, IMPORTANT_HACKERRANK_URL, IMPORTANT_LEETCODE_URL, IMPORTANT_STACKOVERFLOW_URL } from "../../constants/urls";
import { MAIN_DOTS_BG_WHITE_PNG } from "../../constants/images";
// mui
import { IconButton } from "@mui/material";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import GitHubIcon from "@mui/icons-material/GitHub";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import EqualizerRoundedIcon from "@mui/icons-material/EqualizerRounded";
import NewspaperRoundedIcon from "@mui/icons-material/NewspaperRounded";
import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import LocalDiningRoundedIcon from "@mui/icons-material/LocalDiningRounded";
import QrCode2RoundedIcon from "@mui/icons-material/QrCode2Rounded";
import SsidChartRoundedIcon from "@mui/icons-material/SsidChartRounded";
import LocalLibraryRoundedIcon from "@mui/icons-material/LocalLibraryRounded";
import AdbRoundedIcon from "@mui/icons-material/AdbRounded";
import WaterfallChartRoundedIcon from "@mui/icons-material/WaterfallChartRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
// contexts
import UserContext from "../../contexts/userContext";
// utils
import { truncateString } from "../../utils";
// data
import sources from "./sources.json";

const Footer = () => {
    const navigate = useNavigate();
    const darkRef = useRef(null);
    const { setSearch, dark, handleTheme } = useContext(UserContext);

    return (
        <div className="footer">
            <IconButton ref={darkRef} onClick={() => handleTheme()}>{dark ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}</IconButton>
            <div className="footer__bg" style={{ backgroundImage: `url("${MAIN_DOTS_BG_WHITE_PNG}")` }}></div>
            <div className="footer__section">
                <div className="footer__group">
                    <div className="footer__subSection" style={{ flex: 2 }}>
                        <h1>About</h1>
                        <p> I am Nishakar Kumar, a second year undergraduate student of the department of Electrical Engineering enrolled in its Bachelor of Technology Course of Intrumentation Engineering. I am a boarder of Azad Hall of Residence. I am from Bhubaneswar, Odisha.<br /><br />About Algozenith's Internal Hackathon<br /><br />AlgoMate - Your DSA Companion is created under  Algozenith's Internal Hackathon starting on 1st May 2022, extending upto two weeks. At AlgoMate, you get access to a powerful DSA search engine, tons of resources and many more. I hope you like it!</p>
                        <h1>Contact</h1>
                        <p className="footer__contact"><b>Address:</b> Indian Institute of Technology Kharagpur</p>
                        <p className="footer__contact"><b>Phone:</b> +91 7008831288</p>
                        <a className="footer__contact" href="mailto:nishakarkumar0@outlook.com"><b>Email:</b> nishakarkumar0@outlook.com</a>
                    </div>
                    <div className="footer__subSection">
                        <h1>Tags</h1>
                        <div className="footer__tags">
                            <div className="footer__tag" onClick={e => { setSearch(e.target.innerText); navigate(DSA_ROUTE); }}>XOR</div>
                            <div className="footer__tag" onClick={e => { setSearch(e.target.innerText); navigate(DSA_ROUTE); }}>stack</div>
                            <div className="footer__tag" onClick={e => { setSearch(e.target.innerText); navigate(DSA_ROUTE); }}>quick sort</div>
                            <div className="footer__tag" onClick={e => { setSearch(e.target.innerText); navigate(DSA_ROUTE); }}>int</div>
                        </div>
                        <h1>Quick Links</h1>
                        <div className="footer__links">
                            <NavLink exact="true" to={HOME_ROUTE} className={({ isActive }) => (isActive ? "footer__link footer__activeLink" : "footer__link")}><HomeRoundedIcon />Home</NavLink>
                            <NavLink exact="true" to={NEWS_ROUTE} className={({ isActive }) => (isActive ? "footer__link footer__activeLink" : "footer__link")}><NewspaperRoundedIcon />News</NavLink>
                            <NavLink exact="true" to={NEWS_ROUTE} className={({ isActive }) => (isActive ? "footer__link footer__activeLink" : "footer__link")}><PsychologyRoundedIcon />Resources</NavLink>
                            <NavLink exact="true" to={RESOURCES_ROUTE} className={({ isActive }) => (isActive ? "footer__link footer__activeLink" : "footer__link")}><EqualizerRoundedIcon />DSA</NavLink>
                            <NavLink exact="true" to={ABOUT_ROUTE} className={({ isActive }) => (isActive ? "footer__link footer__activeLink" : "footer__link")}><AccountCircleRoundedIcon />About</NavLink>
                        </div>
                    </div>
                </div>
                <div className="footer__group">
                    <div className="footer__subSection" style={{ flex: 2 }}>
                        <h1>Sources</h1>
                        <div className="footer__source">
                            {sources.map((source, index) => (
                                <div className="footer__sourcePost" key={"footer__source_" + index}>
                                    <MediaSlider mediaFiles={source.fileURLs} style={{ width: "150px", height: "90px" }} isCarousel />
                                    <div className="footer__sourceContent">
                                        <h1 className="footer__sourceTitle">{source.title}</h1>
                                        <p className="footer__sourceDate">{source.data}</p>
                                        <p className="footer__sourceDetails">{truncateString(source.description, 50)}<span className="footer__readMore" onClick={() => window.open(source.link)}>Read more</span></p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="footer__subSection">
                        <h1>Important Links</h1>
                        <div className="footer__links">
                            <a className="footer__link" href={IMPORTANT_ALGOZENITH_URL} target="_blank" rel="noreferrer"><CodeRoundedIcon />Algozenith</a>
                            <a className="footer__link" href={IMPORTANT_CODEACADEMY_URL} target="_blank" rel="noreferrer"><AdbRoundedIcon />Codeacademy</a>
                            <a className="footer__link" href={IMPORTANT_CODEFORCES_URL} target="_blank" rel="noreferrer"><EqualizerRoundedIcon />Codeforces</a>
                            <a className="footer__link" href={IMPORTANT_CODECHEF_URL} target="_blank" rel="noreferrer"><LocalDiningRoundedIcon />Codechef</a>
                            <a className="footer__link" href={IMPORTANT_LEETCODE_URL} target="_blank" rel="noreferrer"><SsidChartRoundedIcon />Leet Code</a>
                            <a className="footer__link" href={IMPORTANT_HACKERRANK_URL} target="_blank" rel="noreferrer"><QrCode2RoundedIcon />HackerRank</a>
                            <a className="footer__link" href={IMPORTANT_GEEKSFORGEEKS_URL} target="_blank" rel="noreferrer"><LocalLibraryRoundedIcon />Geeks For Geeks</a>
                            <a className="footer__link" href={IMPORTANT_STACKOVERFLOW_URL} target="_blank" rel="noreferrer"><WaterfallChartRoundedIcon />Stack Overflow</a>
                        </div>
                        <h1>Social Links</h1>
                        <div className="footer__social">
                            <FacebookRoundedIcon onClick={() => window.open(CONTACT_FB_URL, "_blank")} />
                            <LinkedInIcon onClick={() => window.open(CONTACT_IN_URL, "_blank")} />
                            <YouTubeIcon onClick={() => window.open(CONTACT_YT_URL, "_blank")} />
                            <GitHubIcon onClick={() => window.open(CONTACT_GH_URL, "_blank")} />
                        </div>
                    </div>
                </div>
            </div>
            <p className="footer__end">Nishakar Kumar, IIT Kharagpur © All Rights Reserved</p>
        </div>
    );
};

export default Footer;