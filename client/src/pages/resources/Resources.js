import React, { useState, useEffect, useContext } from "react";
import "./Resources.css";
// mui
import { FormControl, Select, InputLabel, MenuItem } from "@mui/material";
// data
import data from "./data.json";
// contexts
import UserContext from "../../contexts/userContext";

const Resources = () => {
  const { dark } = useContext(UserContext);
  const [topic, setTopic] = useState(Object.keys(data)[0]);
  const [subTopic, setSubTopic] = useState(Object.values(data)[0][0].title);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`resources ${dark ? "resources__dark" : ""}`}>
      <div className="resources__head">
        <div className="resources__title">
          <h1>Resources</h1>
        </div>
        <div className="resources__select">
          <FormControl variant="standard">
            <InputLabel>Topic</InputLabel>
            <Select
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value);
                setSubTopic(data[e.target.value][0].title);
              }}
              label="Topic"
            >
              {Object.keys(data).map((topic, index) => (
                <MenuItem key={"resources__topic_" + index} value={topic}>
                  {topic}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="standard">
            <InputLabel>Sub Topic</InputLabel>
            <Select
              defaultValue={data[topic][0].title}
              value={subTopic}
              onChange={(e) => setSubTopic(e.target.value)}
              label="Sub Topic"
            >
              {data[topic].map((subTopic, index) => (
                <MenuItem
                  key={"resources__subTopic_" + index}
                  value={subTopic.title}
                >
                  {subTopic.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="resources__data">
        <h1>{topic}</h1>
        <h2>
          Topic: <span style={{ color: "teal" }}>{subTopic}</span>
        </h2>
        <pre>{data[topic].find((st) => st.title === subTopic).description}</pre>
      </div>
    </div>
  );
};

export default Resources;
