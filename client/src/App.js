import React, { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
// constants
import { HOME_ROUTE, ERROR404_ROUTE, SIGN_IN_ROUTE, DSA_ROUTE, NEWS_ROUTE, ABOUT_ROUTE, RESOURCES_ROUTE } from "./constants/routes";
import { AUTH_TOKEN_ENDPOINT } from "./constants/endpoints";
// components
import Loader from "./components/loader/Loader";
import Nav from "./components/nav/Nav";
import Footer from "./components/footer/Footer";
import NewsMarquee from "./components/newsMarquee/NewsMarquee";
import Assistant from "./components/assistant/Assistant";
// contexts
import UserContext from "./contexts/userContext";
import PostDrawer from "./components/postDrawer/PostDrawer";
// mui
import { Drawer } from "@mui/material";
// data
import newsData from "./pages/news/news.json";
// pages
const Home = lazy(() => import("./pages/home/Home"));
const SignIn = lazy(() => import("./pages/signIn/SignIn"));
const DSA = lazy(() => import("./pages/dsa/DSA"));
const News = lazy(() => import("./pages/news/News"));
const Resources = lazy(() => import("./pages/resources/Resources"));
const About = lazy(() => import("./pages/about/About"));
const Error404 = lazy(() => import("./pages/error404/Error404"));

function App() {
  const [user, setUser] = useState({});
  const [search, setSearch] = useState("");
  const [post, setPost] = useState(null);
  const [dark, setDark] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("hackathon"));
    setDark(data?.dark);
    if (data?.token) {
      try {
        setIsLoading(true);
        axios.get(AUTH_TOKEN_ENDPOINT + "/" + data.token)
          .then(res => {
            setUser(res.data);
            setIsLoading(false);
          })
          .catch(err => { setIsLoading(false); });
      } catch (err) { setIsLoading(false); }
    }
  }, []);

  const handleTheme = () => {
    setDark(dark => {
      const data = JSON.parse(localStorage.getItem("hackathon"));
      localStorage.setItem("hackathon", JSON.stringify(data ? { ...data, dark: !dark } : { dark: !dark }));
      return !dark;
    });
  };

  return (
    <Router>
      {isLoading ? <Loader /> : null}
      <UserContext.Provider value={{ user, setUser, setIsLoading, setPost, search, setSearch, dark, handleTheme }}>
        <Nav />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route exact path={HOME_ROUTE} element={<Home />} />
            <Route exact path={SIGN_IN_ROUTE} element={<SignIn />} />
            <Route exact path={DSA_ROUTE} element={<DSA />} />
            <Route exact path={NEWS_ROUTE} element={<News />} />
            <Route exact path={RESOURCES_ROUTE} element={<Resources />} />
            <Route exact path={ABOUT_ROUTE} element={<About />} />
            <Route path={ERROR404_ROUTE} element={<Error404 />} />
          </Routes>
        </Suspense>
        <Assistant />
        <Drawer anchor="top" open={Boolean(post)} onClose={() => setPost(null)}>
          <PostDrawer post={post} setPost={setPost} />
        </Drawer>
        <NewsMarquee dataList={newsData} />
        <Footer />
      </UserContext.Provider>
    </Router>
  );
}

export default App;
