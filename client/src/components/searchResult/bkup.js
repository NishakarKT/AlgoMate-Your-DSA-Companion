import React, { useContext, useEffect, useRef } from "react";
import "./SearchResult.css";
// contexts
import UserContext from "../../contexts/userContext";
// utils
import { shuffle, truncateString } from "../../utils";
// consts
const tagURLs = {
  LeetCode: "https://leetcode.com/problemset/all/?page=1&topicSlugs=",
  Codechef:
    "https://www.codechef.com/practice?page=0&limit=100&sort_by=difficulty_rating&sort_order=asc&search=&start_rating=0&end_rating=5001&topic=&group=all&tags=",
  Codeforces: "https://codeforces.com/problemset?tags=",
};
const platformURLs = {
  LeetCode: "https://miro.medium.com/max/1400/1*gBkMCGTAdSk4tu17SCa7RQ.png",
  Codechef: "https://cdn.codechef.com/sites/all/themes/abessive/cc-logo.png",
  Codeforces:
    "https://letmethink.mx/public/pictures/cf-172/codeforces_logo.png",
};
const questionURLs = [
  "https://images.unsplash.com/photo-1562813733-b31f71025d54?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80",
  "https://images.unsplash.com/photo-1580894742597-87bc8789db3d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  "https://images.unsplash.com/photo-1605379399843-5870eea9b74e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=898&q=80",
  "https://images.unsplash.com/photo-1580894908361-967195033215?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  "https://images.unsplash.com/photo-1534665482403-a909d0d97c67?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  "https://images.unsplash.com/photo-1484417894907-623942c8ee29?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80",
];

const SearchResult = ({ data, delay }) => {
  const { setPost, dark } = useContext(UserContext);
  const titleRef = useRef(null);

  useEffect(() => {
    // titleRef.current.innerHTML = data.title;
  }, [data]);

  return (
    <div
      className={`searchResult ${dark ? "searchResult__dark" : ""}`}
      style={{ animationDelay: delay + "s" }}
    >
      <img
        className="searchResult__platform"
        src={platformURLs[data.platform]}
        alt=""
      />
      <p className="searchResult__title" ref={titleRef}>
        {data.title || data.platform + "'s Question"}
        <sup>{" (" + data.rating + ")"}</sup>
      </p>
      <p className="searchResult__link" onClick={() => window.open(data.url)}>
        {data.url}
      </p>
      {data.tags?.length ? (
        <div className="searchResult__tags">
          <b>Tags: </b>
          {data.tags.map((tag, index) =>
            tag.split(", ").map((t, i) => (
              <span
                className="searchResult__tag"
                key={`${data.id}${index}${i}`}
                onClick={() =>
                  window.open(
                    tagURLs[data.platform] +
                      t
                        .toLowerCase()
                        .replace(
                          " ",
                          data.platform === "Codeforces" ? "+" : "-"
                        )
                  )
                }
              >
                {t}
              </span>
            ))
          )}
        </div>
      ) : null}
      <p className="searchResult__description">
        {data.description
          ? truncateString(data.description, 500)
          : data.platform === "LeetCode"
          ? "The question is not available for free. One needs to get LeetCode's premium subscription to access this question. Follow the link to know more! We are sorry for the inconvinience caused. Your relationship with us is extremely important, and we hope any inconvenience experienced owing to this issue will not dissuade you from continue using AlgoMate."
          : "We are sorry for the inconvinience caused. Your relationship with us is extremely important, and we hope any inconvenience experienced owing to this issue will not dissuade you from continue using AlgoMate."}{" "}
        <span
          className="searchResult__link"
          onClick={() =>
            setPost({
              ...data,
              isQuestion: true,
              fileURLs: shuffle(questionURLs),
            })
          }
        >
          {data.description?.length > 500 ? " Read More" : " >> Explore"}
        </span>
      </p>
      <p
        className="searchResult__host"
        onClick={() =>
          window.open(`https://${data.platform.toLowerCase()}.com`)
        }
      >
        Platform: <span>{data.host || data.platform}</span>
      </p>
    </div>
  );
};

export default SearchResult;
