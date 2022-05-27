import React, { useEffect, useContext } from "react";
import "./News.css";
// contexts
import UserContext from "../../contexts/userContext";
// components
import GridCard from "../../components/gridCard/GridCard";
// data
import news from "./news.json";

const News = () => {
  let i = 0;
  const { dark } = useContext(UserContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`news ${dark ? "news__dark" : ""}`}>
      <div className="news__title">
        <h1>Upcoming Events</h1>
      </div>
      <div className="news__list">
        {news
          .filter((r) => r.category === "Upcoming Events")
          .map((resource, index) => (
            <GridCard
              key={"news__list_" + index}
              data={resource}
              delay={++i * 0.1}
            />
          ))}
      </div>
      <div className="news__title">
        <h1>Did You Know?</h1>
      </div>
      <div className="news__list">
        {news
          .filter((r) => r.category === "Did You Know?")
          .map((resource, index) => (
            <GridCard
              key={"news__list_" + index}
              data={resource}
              delay={++i * 0.1}
            />
          ))}
      </div>
      <div className="news__title">
        <h1>Practice & Learn</h1>
      </div>
      <div className="news__list">
        {news
          .filter((r) => r.category === "Practice & Learn")
          .map((resource, index) => (
            <GridCard
              key={"news__list_" + index}
              data={resource}
              delay={++i * 0.1}
            />
          ))}
      </div>
    </div>
  );
};

export default News;
