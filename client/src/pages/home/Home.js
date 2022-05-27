import React, { useRef, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
// constants
import { MAIN_LOGO_PNG, ABOUT_ART_2_PNG } from "../../constants/images";
import { PORTAL_BG_MP4 } from "../../constants/videos";
import {
  ABOUT_ROUTE,
  DSA_ROUTE,
  NEWS_ROUTE,
  RESOURCES_ROUTE,
  SIGN_IN_ROUTE,
} from "../../constants/routes";
import {
  IMPORTANT_CODEACADEMY_URL,
  IMPORTANT_CODECHEF_URL,
  IMPORTANT_CODEFORCES_URL,
  IMPORTANT_LEETCODE_URL,
} from "../../constants/urls";
// components
import MediaSlider from "../../components/mediaSlider/MediaSlider";
import GridCard from "../../components/gridCard/GridCard";
import SearchResult from "../../components/searchResult/SearchResult";
import Testimonial from "../../components/testimonial/Testimonial";
// mui
import { IconButton, Button, TextareaAutosize, TextField } from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import EqualizerRoundedIcon from "@mui/icons-material/EqualizerRounded";
import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
// contexts
import UserContext from "../../contexts/userContext";
// data
import data from "./data/data.json";
import dsa from "./data/dsa.json";
import news from "./data/news.json";
import resources from "./data/resources.json";
import testimonials from "./data/testimonials.json";

const Home = () => {
  const formRef = useRef(null);
  const { dark, user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleContact = (e) => {
    e.preventDefault();
  };

  return (
    <div className={`home ${dark ? "home__dark" : ""}`}>
      <div className="home__intro">
        <video
          className="home__bg"
          src={PORTAL_BG_MP4 + "#t=10"}
          alt=""
          autoPlay
          muted
          loop
        />
        <IconButton
          onClick={() =>
            window.open("https://www.youtube.com/watch?v=YwHXniAUMQo#t=10")
          }
        >
          <PlayArrowRoundedIcon />
        </IconButton>
        <div className="home__welcome">
          <h1>Welcome back, Programmer!</h1>
          <p>Get started with a simple user authentication.</p>
          <p>
            AlgoMate - Your DSA Companion is created under Algozenith's Internal
            Hackathon starting on 1st May 2022, extending upto two weeks. At
            AlgoMate, you get access to a powerful DSA search engine, tons of
            news and many more. I hope you like it!
          </p>
          <div className="home__buttons">
            <Button onClick={() => window.scrollTo(0, window.innerHeight)}>
              <DirectionsRunIcon />
              Get Started
            </Button>
            {!user.name ? <Button onClick={() => navigate(SIGN_IN_ROUTE)}>
              <KeyRoundedIcon />
              Sign In|Up
            </Button> : null}
          </div>
        </div>
        <p className="home__copyright">
          Nishakar Kumar, IIT Kharagpur © All Rights Reserved
        </p>
      </div>
      <MediaSlider mediaFiles={data} isBgFixed isCarousel />
      <div className="home__intro2">
        <img src={MAIN_LOGO_PNG} alt="" />
        <h1>AlgoMate - Your DSA Companion!</h1>
        <p>
          At AlgoMate, you get access to a powerful DSA search engine, tons of
          resources and many more. AlgoMate - Your DSA Companion is created
          under Algozenith's Internal Hackathon starting on 1st May 2022,
          extending upto two weeks.{" "}
        </p>
        <div
          className="home__scrollDown"
          onClick={() => window.scrollTo(0, 2 * window.innerHeight)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className="home__title">
        <h1>About AlgoMate</h1>
      </div>
      <div className="home__skill">
        <div>
          <p>
            <b>
              Data integrated into this web application doesn't belong to
              AlgoMate!
            </b>
            <br />
            <br />
            AlgoMate - Your DSA Companion is created under Algozenith's Internal
            Hackathon starting on 1st May 2022, extending upto two weeks. At
            AlgoMate, you get access to a powerful DSA search engine, tons of
            resources and many more. AlgoMate is a perfect blend of reading
            Material, opportunities and practice problems to expedite learning
            beyond expectations! Learn tough topics in the resources section
            prepared directly by experts. Get your concepts checked and learn
            new techniques while competing with peers. AlgoMate is possible from
            the data scraped from{" "}
            <span
              className="home__link"
              onClick={() => window.open(IMPORTANT_CODEFORCES_URL)}
            >
              Codeforces
            </span>
            ,{" "}
            <span
              className="home__link"
              onClick={() => window.open(IMPORTANT_CODECHEF_URL)}
            >
              CodeChef
            </span>
            ,{" "}
            <span
              className="home__link"
              onClick={() => window.open(IMPORTANT_LEETCODE_URL)}
            >
              LeetCode
            </span>{" "}
            and{" "}
            <span
              className="home__link"
              onClick={() => window.open(IMPORTANT_CODEACADEMY_URL)}
            >
              CodeAcademy
            </span>
            . Do check out these amazing websites!
          </p>
        </div>
        <img src={ABOUT_ART_2_PNG} alt="" />
      </div>
      <div className="home__title">
        <h1>Data Structures & Algorithms</h1>
      </div>
      <div className="home__dsa">
        <SearchResult data={dsa[0]} delay={0.1} />
        <SearchResult data={dsa[1]} delay={0.2} />
        <SearchResult data={dsa[2]} delay={0.3} />
      </div>
      <Link className="home__explore" to={DSA_ROUTE}>
        <EqualizerRoundedIcon />
        Explore DSA
      </Link>
      <div className="home__title">
        <h1>News</h1>
      </div>
      <div className="home__list">
        <GridCard data={news[0]} delay={0.1} />
        <GridCard data={news[1]} delay={0.2} />
        <GridCard data={news[2]} delay={0.3} />
      </div>
      <Link className="home__explore" to={NEWS_ROUTE}>
        <PsychologyRoundedIcon />
        Explore News
      </Link>
      <div className="home__title">
        <h1>Resources</h1>
      </div>
      <div className="home__list">
        <GridCard data={resources[0]} delay={0.1} />
        <GridCard data={resources[1]} delay={0.2} />
        <GridCard data={resources[2]} delay={0.3} />
      </div>
      <Link className="home__explore" to={RESOURCES_ROUTE}>
        <PsychologyRoundedIcon />
        Explore Resources
      </Link>
      <div className="home__title">
        <h1>Testimonials - Algozenith</h1>
      </div>
      <div className="home__list">
        <Testimonial testimonial={testimonials[0]} delay={0.1} />
        <Testimonial testimonial={testimonials[1]} delay={0.2} />
        <Testimonial testimonial={testimonials[2]} delay={0.3} />
      </div>
      <div className="home__title">
        <h1>Contact Me</h1>
      </div>
      <div className="home__contactContainer">
        <iframe
          title="home__map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.0239927260523!2d87.308342413992!3d22.31493234800481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1d440255555547%3A0x6f2f20dd0c0d6793!2sIndian%20Institute%20of%20Technology%20Kharagpur!5e0!3m2!1sen!2sin!4v1651656930757!5m2!1sen!2sin"
          width={window.innerWidth - 100}
          frameBorder="0"
          className="home__map"
          allowFullScreen=""
          aria-hidden="false"
          tabIndex={0}
        />
        <form
          ref={formRef}
          className="home__contactForm"
          onSubmit={(e) => handleContact(e)}
        >
          <div>
            <TextField
              variant="standard"
              type="text"
              label="First Name"
              name="fname"
            />
            <TextField
              variant="standard"
              type="text"
              label="Last Name"
              name="lname"
            />
          </div>
          <div>
            <TextField
              variant="standard"
              type="email"
              label="Email Address"
              name="email"
            />
            <TextField
              variant="standard"
              type="number"
              label="Phone Number"
              name="contact"
            />
          </div>
          <textarea name="message" placeholder="Type your message." />
          <div
            className="home__buttons home__contactBtns"
            style={{ justifyContent: "center" }}
          >
            <Button
              type="submit"
              style={{ flex: 1, backgroundColor: "#0C6CFA", color: "white" }}
            >
              <SaveRoundedIcon />
              Submit
            </Button>
            <Button
              style={{ flex: 1, backgroundColor: "lightgray", color: "black" }}
              onClick={() => formRef.current.reset()}
            >
              <ClearRoundedIcon />
              Reset
            </Button>
          </div>
        </form>
      </div>
      <Link
        className="home__explore"
        style={{ marginBottom: "20px" }}
        to={ABOUT_ROUTE}
      >
        <AccountCircleRoundedIcon />
        More About Me
      </Link>
    </div>
  );
};

export default Home;
