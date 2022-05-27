import React, { useEffect, useRef, useContext } from "react";
import "./About.css";
// contexts
import UserContext from "../../contexts/userContext";
// costants
import {
  ABOUT_ME_JPG,
  ABOUT_ART_1_PNG,
  ABOUT_ART_2_PNG,
  ABOUT_ART_3_PNG,
  ABOUT_ART_4_PNG,
} from "../../constants/images";
// mui
import { Button, TextareaAutosize, TextField } from "@mui/material";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
// data
import data from "./data.json";

const About = () => {
  const formRef = useRef(null);
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);
  const textRef3 = useRef(null);
  const typeInterval = useRef(null);
  const { dark } = useContext(UserContext);

  useEffect(() => {
    let i = 0;
    clearInterval(typeInterval.current);
    typeInterval.current = setInterval(() => {
      i = (i + 1) % data[0].length;
      if (textRef1.current) textRef1.current.innerText = data[0][i];
      if (textRef2.current) textRef2.current.innerText = data[1][i];
      if (textRef3.current) textRef3.current.innerText = data[2][i];
    }, 7500);
    window.scrollTo(0, 0);
  }, []);

  const handleContact = (e) => {
    e.preventDefault();
  };

  return (
    <div className={`about ${dark ? "about__dark" : ""}`}>
      <div className="about__typewriter">
        <img className="about__me" src={ABOUT_ME_JPG} alt="" />
        <h1 ref={textRef1}>{data[0][0]}</h1>
        <h1 ref={textRef2} style={{ animationDelay: "0.5s" }}>
          {data[1][0]}
        </h1>
        <h1 ref={textRef3} style={{ animationDelay: "1s" }}>
          {data[2][0]}
        </h1>
      </div>
      <div
        className="about__title"
        style={{ marginTop: "-50px", marginBottom: "20px" }}
      >
        <h1>About Me</h1>
      </div>
      <p>
        I am Nishakar Kumar, a second year undergraduate student of the
        department of Electrical Engineering enrolled in its Bachelor of
        Technology Course of Intrumentation Engineering. I am a boarder of Azad
        Hall of Residence. I am from Bhubaneswar, Odisha.
      </p>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>
      <div className="about__title" style={{ marginTop: "70px" }}>
        <h1>Skills & Experiences</h1>
      </div>
      <div className="about__skill about__skillL">
        <div className="">
          <h1>Leadership</h1>
          <p>
            Leadership comes in many forms and constructs, including
            transformational leadership, servant leadership, and entrepreneurial
            leadership, which helps to understand and define leadership itself.
            <br />
            Leadership can come naturally, but it’s not necessarily innate.
            Leadership can be learned through leadership development programs,
            where leadership skills are created, developed, and improved through
            rigorous education and practice. Those skills can help demonstrate
            why leadership is important.
            <br /> Understanding entrepreneurial leadership and honing the
            necessary leadership skills are important to becoming an
            entrepreneurial leader, able to identify, address, and help solve
            complex problems with empathy.
          </p>
        </div>
        <img src={ABOUT_ART_4_PNG} alt="" />
      </div>
      <div className="about__skill">
        <div className="">
          <h1>Web Development</h1>
          <p>
            I work as a MERN stack web developer. Every day, I spend my entire
            day experimenting with HTML, CSS, and JavaScript; dabbling with
            React and Node; and implementing a wide range of APIs to create
            awesome projects and utilities. I create websites that both
            entertain and inform. I'm very good at it!
            <br />
            I'm inquisitive, and I enjoy work that pushes me to learn new things
            and stretch in new directions. I do my best to stay up to date on
            technological advances so that I can meet challenges with tools that
            are well suited to the task at hand. The projects I follow on GitHub
            will give you an idea of the tools I prefer to use, and my
            Instapaper "Starred" list will give you an idea of the reading
            material I find interesting enough to share.
          </p>
        </div>
        <img src={ABOUT_ART_1_PNG} alt="" />
      </div>
      <div className="about__skill about__skillL">
        <div className="">
          <h1>Game Development</h1>
          <p>
            As a game developer, I understand Game Development as the art of
            creating games and describes the design, development and release of
            a game. It may involve concept generation, design, build, test and
            release. While you create a game, it is important to think about the
            game mechanics, rewards, player engagement and level design.
            <br /> Game Developers take the video game designer's ideas,
            drawings, rules, and turn them into a playable game with visuals and
            sound through writing code. The work of a games developer typically
            involves: Looking at the design specifications of video game
            designers and writing code to turn the designer's concepts into a
            playable game.
          </p>
        </div>
        <img src={ABOUT_ART_2_PNG} alt="" />
      </div>
      <div className="about__skill">
        <div className="">
          <h1>Programming</h1>
          <p>
            Programming is the process of creating a set of instructions that
            tell a computer how to perform a task. Programming can be done using
            a variety of computer programming languages, such as JavaScript,
            Python, and C++.
            <br />
            As a competitive programmer, I understand Competitive Programming as
            a mental sport which enables you to code a given problem under
            provided constraints. The purpose of this article is to guide every
            individual possessing a desire to excel in this sport. This article
            provides a detailed syllabus for Competitive Programming designed by
            industry experts to boost the preparation of the readers.
          </p>
        </div>
        <img src={ABOUT_ART_3_PNG} alt="" />
      </div>
      <div className="about__title">
        <h1>Contact Me</h1>
      </div>
      <div className="about__contactContainer">
        <iframe
          title="about__map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.0239927260523!2d87.308342413992!3d22.31493234800481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1d440255555547%3A0x6f2f20dd0c0d6793!2sIndian%20Institute%20of%20Technology%20Kharagpur!5e0!3m2!1sen!2sin!4v1651656930757!5m2!1sen!2sin"
          width={window.innerWidth - 100}
          frameBorder="0"
          className="about__map"
          allowFullScreen=""
          aria-hidden="false"
          tabIndex={0}
        />
        <form
          ref={formRef}
          className="about__contactForm"
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
          <textarea placeholder="Type your message." />
          <div
            className="about__buttons about__contactBtns"
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
    </div>
  );
};

export default About;
