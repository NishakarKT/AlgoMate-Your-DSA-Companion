import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import axios from "axios";
import "./SignIn.css";
// constants
import { HOME_ROUTE } from "../../constants/routes";
import { MAIN_LOGO_PNG } from "../../constants/images";
import { PORTAL_BG_MP4 } from "../../constants/videos";
import {
  CONTACT_FB_URL,
  CONTACT_IN_URL,
  CONTACT_YT_URL,
  CONTACT_GH_URL,
  IMPORTANT_ALGOZENITH_URL,
} from "../../constants/urls";
import {
  AUTH_GENERATE_OTP_ENDPOINT,
  AUTH_GET_USER_ENDPOINT,
  AUTH_TOKEN_ENDPOINT,
  AUTH_SIGN_UP_ENDPOINT,
  AUTH_VERIFY_OTP_ENDPOINT,
} from "../../constants/endpoints";
// contexts
import UserContext from "../../contexts/userContext";
// mui
import { IconButton, Button, TextField, Checkbox } from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import DialpadRoundedIcon from "@mui/icons-material/DialpadRounded";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import GitHubIcon from "@mui/icons-material/GitHub";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
// intervals
let dateInterval;

const SignIn = () => {
  const signInRef = useRef(null);
  const navigate = useNavigate();
  const { user, dark, setUser, setIsLoading } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [otpErr, setOtpErr] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [remMe, setRemMe] = useState(true);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("hackathon"))?.token;
    if (token) {
      try {
        setIsLoading(true);
        axios
          .get(AUTH_TOKEN_ENDPOINT + "/" + token)
          .then((res) => {
            setUser(res.data);
            setIsLoading(false);
          })
          .catch((err) => {
            setIsLoading(false);
          });
      } catch (err) {
        setIsLoading(false);
      }
    }
  }, [setUser, setIsLoading]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (user.name) {
      if (window.history.state && window.history.state.idx > 0) navigate(-1);
      else navigate(HOME_ROUTE, { replace: true });
    }
    clearInterval(dateInterval);
    dateInterval = setInterval(() => setDate(new Date()), 1000);
  }, [user, navigate]);

  const generateOtp = (e) => {
    e.preventDefault();

    if (validator.isEmail(email)) {
      setEmailErr("");
      setIsLoading(true);
      try {
        axios
          .post(AUTH_GENERATE_OTP_ENDPOINT, { email })
          .then((res) => {
            setIsOtpSent(true);
            setIsLoading(false);
            setEmailErr("");
          })
          .catch((err) => {
            setIsOtpSent(false);
            setIsLoading(false);
            setEmailErr(err.response.data.msg);
          });
      } catch (err) {
        setIsLoading(false);
      }
    } else {
      setEmailErr("Please, enter a valid email address!");
    }
  };

  const verifyOtp = (e) => {
    e.preventDefault();
    if (otp) {
      setOtp("");
      setIsLoading(true);
      try {
        axios
          .post(AUTH_VERIFY_OTP_ENDPOINT, { email, otp })
          .then((res) => {
            setIsOtpSent(false);
            setOtpErr("");

            if (remMe) {
              const currData = JSON.parse(localStorage.getItem("hackathon"));
              const newData = { ...currData, token: res.data.token };
              localStorage.setItem("hackathon", JSON.stringify(newData));
            }

            try {
              axios
                .get(AUTH_GET_USER_ENDPOINT + "/" + email)
                .then((res) => {
                  setUser(res.data);
                  setIsLoading(false);
                  navigate(HOME_ROUTE);
                })
                .catch((err) => {
                  console.log("new account");
                  try {
                    axios
                      .post(AUTH_SIGN_UP_ENDPOINT, { email })
                      .then((res) => {
                        setUser(res.data);
                        setIsLoading(false);
                        navigate(HOME_ROUTE);
                      })
                      .catch((err) => {
                        setEmailErr(err.response.data.msg);
                        setIsLoading(false);
                      });
                  } catch (err) {
                    setIsLoading(false);
                  }
                });
            } catch (err) {
              setIsLoading(false);
            }
          })
          .catch((err) => {
            setIsOtpSent(true);
            setOtpErr(err.response.data.msg);
            setIsLoading(false);
          });
      } catch (err) {
        setIsLoading(false);
      }
    } else {
      setOtpErr("Please, enter the OTP!");
    }
  };

  return (
    <div className={`signIn ${dark ? "signIn__dark" : ""}`} ref={signInRef}>
      <div className="signIn__left">
        <div
          className="signIn__logoContainer"
          onClick={() => navigate(HOME_ROUTE)}
        >
          <img className="signIn__logo" src={MAIN_LOGO_PNG} alt="" />
          <div className="signIn__title">
            <p>AlgoMate - Your DSA Companion!</p>
            <p>Algozenith's Internal Hackathon, 2022</p>
          </div>
        </div>
        <video
          className="signIn__bg"
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
        <div className="signIn__welcome">
          <h1>Welcome back, Programmer!</h1>
          <p>Get started with a simple user authentication.</p>
          <p>
            AlgoMate - Your DSA Companion is created under Algozenith's Internal
            Hackathon starting on 1st May 2022, extending upto two weeks. At
            AlgoMate, you get access to a powerful DSA search engine, tons of
            resources and many more. I hope you like it!
          </p>
          <div className="signIn__buttons">
            <Button onClick={() => navigate(HOME_ROUTE)}>
              <HomeRoundedIcon />
              Home
            </Button>
            {window.innerWidth < 840 ? (
              <Button
                onClick={() =>
                  signInRef.current.scrollBy(
                    window.innerHeight,
                    window.innerHeight
                  )
                }
              >
                <KeyRoundedIcon />
                Sign In|Up
              </Button>
            ) : (
              <Button onClick={() => window.open(IMPORTANT_ALGOZENITH_URL)}>
                <CodeRoundedIcon />
                Algozenith
              </Button>
            )}
          </div>
        </div>
        <p className="signIn__copyright">
          Nishakar Kumar, IIT Kharagpur © All Rights Reserved
        </p>
      </div>
      <div className="signIn__right">
        <p className="signIn__date">
          {date.toLocaleString("en-GB", {
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
        <form
          className="signIn__form"
          onSubmit={(e) => (isOtpSent ? verifyOtp(e) : generateOtp(e))}
        >
          <div className="signIn__formInfo">
            {isOtpSent ? (
              <h1>
                <DialpadRoundedIcon />
                Verify OTP
              </h1>
            ) : (
              <h1>
                <KeyRoundedIcon />
                Sign In|Up
              </h1>
            )}
            {isOtpSent ? (
              <p>
                Enter the OTP sent to{" "}
                <b style={{ wordBreak: "break-all", color: "#0c6cf9" }}>
                  {email}
                </b>{" "}
                to proceed with the user authentication.
              </p>
            ) : (
              <p>
                Enter your email address to proceed with the user
                authentication.
              </p>
            )}
          </div>
          <div className="signIn__formInput">
            {isOtpSent ? (
              <TextField
                variant="standard"
                type="number"
                label="Enter OTP (One Time Password)"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                error={Boolean(otpErr)}
                helperText={otpErr}
                fullWidth
              />
            ) : (
              <TextField
                variant="standard"
                label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={Boolean(emailErr)}
                helperText={emailErr}
                fullWidth
              />
            )}
          </div>
          <div className="signIn__formOptions">
            <div className="signIn__remMe">
              <Checkbox
                checked={remMe}
                onChange={(e) => setRemMe(e.target.checked)}
              />
              Remember me?
            </div>
          </div>
          {isOtpSent ? (
            <Button type="submit" fullWidth>
              <DialpadRoundedIcon />
              Verify OTP
            </Button>
          ) : (
            <Button type="submit" fullWidth>
              <KeyRoundedIcon />
              Generate OTP
            </Button>
          )}
          {isOtpSent ? (
            <p className="signIn__loginInfo">
              Note that the OTP is valid only for{" "}
              <b style={{ color: "#0c6cfa" }}>1 minute</b>. Re-Login for a new
              one.
            </p>
          ) : (
            <p className="signIn__loginInfo">
              No registration is required for a{" "}
              <b style={{ color: "#0c6cfa" }}>Programmer!</b> Simply verify your
              email address and you shall be signed in.
            </p>
          )}
          <div className="signIn__social">
            <FacebookRoundedIcon
              onClick={() => window.open(CONTACT_FB_URL, "_blank")}
            />
            <LinkedInIcon
              onClick={() => window.open(CONTACT_IN_URL, "_blank")}
            />
            <YouTubeIcon
              onClick={() => window.open(CONTACT_YT_URL, "_blank")}
            />
            <GitHubIcon onClick={() => window.open(CONTACT_GH_URL, "_blank")} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
