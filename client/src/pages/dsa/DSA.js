import React, { useState, useEffect, useRef, useContext } from "react";
import Mark from "mark.js";
import axios from "axios";
import "./DSA.css";
// constants
import { DSA_GET_QUESTIONS_ENDPOINT } from "../../constants/endpoints";
// components
import SearchResult from "../../components/searchResult/SearchResult";
// mui
import {
  Pagination,
  IconButton,
  TextField,
  NativeSelect,
  FormControl,
  InputLabel,
  Switch,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
// contexts
import UserContext from "../../contexts/userContext";
// consts
let data = [];

const DSA = () => {
  const max_items = 10;
  const { user, dark, search, setIsLoading } = useContext(UserContext);
  const searchRef = useRef(null);
  const dsaResultsRef = useRef(null);
  const markInstance = useRef(null);
  const [filter, setFilter] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [time, setTime] = useState(null);
  const [page, setPage] = useState(1);
  const [mode, setMode] = useState("bm25");
  const [autocorrect, setAutocorrect] = useState("no");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    markInstance.current = new Mark(dsaResultsRef.current);
    if (!data.length) {
      try {
        setIsLoading(true);
        axios
          .get(DSA_GET_QUESTIONS_ENDPOINT + "/all/" + mode + "/" + autocorrect)
          .then((res) => {
            setIsLoading(false);
            data = res.data;
            setQuestions(res.data);
          })
          .catch((err) => {
            setIsLoading(false);
            console.log(err);
          });
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    } else {
      setQuestions(data);
    }
  }, [user]);

  useEffect(() => {
    if (filter === 0) setQuestions(() => data);
    else if (filter === 1)
      setQuestions(() => data.filter((d) => d.platform === "Codeforces"));
    else if (filter === 2)
      setQuestions(() => data.filter((d) => d.platform === "Codechef"));
    else if (filter === 3)
      setQuestions(() => data.filter((d) => d.platform === "LeetCode"));
    setPage(1);
  }, [data, filter]);

  useEffect(() => {
    if (search) {
      setPage(1);
      window.scrollTo(0, 0);
      try {
        setIsLoading(true);
        axios
          .get(
            DSA_GET_QUESTIONS_ENDPOINT +
              "/" +
              search +
              "/" +
              mode +
              "/" +
              autocorrect
          )
          .then((res) => {
            markInstance.current.unmark();
            setQuestions(res.data.data);
            setTime(res.data.time);
            setIsLoading(false);
            setTimeout(() => markInstance.current.mark(search), 100);
          })
          .catch((err) => {
            setIsLoading(false);
            setTime(null);
            console.log(err);
          });
      } catch (err) {
        setIsLoading(false);
        setTime(null);
        console.log(err);
      }
    } else {
      setQuestions(data);
      setTime(null);
    }
  }, [search]);

  const handleSearch = (e) => {
    e.preventDefault();
    const search = searchRef.current.value;
    if (search) {
      setPage(1);
      window.scrollTo(0, 0);
      try {
        setIsLoading(true);
        axios
          .get(
            DSA_GET_QUESTIONS_ENDPOINT +
              "/" +
              search +
              "/" +
              mode +
              "/" +
              autocorrect
          )
          .then((res) => {
            markInstance.current.unmark();
            setQuestions(res.data.data);
            setTime(res.data.time);
            setIsLoading(false);
            setTimeout(() => markInstance.current.mark(search), 100);
          })
          .catch((err) => {
            setIsLoading(false);
            setTime(null);
            console.log(err);
          });
      } catch (err) {
        setIsLoading(false);
        setTime(null);
        console.log(err);
      }
    } else {
      setQuestions(data);
      setTime(null);
    }
  };

  return (
    <div className={`dsa ${dark ? "dsa__dark" : ""}`}>
      <div className="dsa__title">
        <h1>Ultimate DSA Search Engine</h1>
      </div>
      <form className="dsa__searchBox" onSubmit={(e) => handleSearch(e)}>
        <div className="dsa__subSearch">
          <TextField
            variant="standard"
            inputRef={searchRef}
            autoFocus
            label="Type you question."
          />
          <IconButton type="submit">
            <SearchRoundedIcon />
          </IconButton>
        </div>
        <div className="dsa__subSearch">
          <FormControl style={{ marginRight: "5px" }}>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Sort / Filter By
            </InputLabel>
            <NativeSelect
              defaultValue={0}
              onChange={(e) => setFilter(Number(e.target.value))}
              inputProps={{ id: "uncontrolled-native" }}
            >
              <option value={0}>All</option>
              <option value={1}>Codeforces</option>
              <option value={2}>Codechef</option>
              <option value={3}>LeetCode</option>
            </NativeSelect>
          </FormControl>
          <FormControl>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Search Engine
            </InputLabel>
            <NativeSelect
              defaultValue={0}
              onChange={(e) => setMode(e.target.value)}
              inputProps={{ id: "uncontrolled-native" }}
            >
              <option value="bm25">BM25</option>
              <option value="tf_idf">TF_IDF</option>
            </NativeSelect>
          </FormControl>
        </div>
      </form>
      <div className="dsa__autocorrect">
        <p>Fear spelling errors? Enable our AutoCorrect!</p>
        <Switch
          onChange={(e) => setAutocorrect(e.target.checked ? "yes" : "no")}
        />
      </div>
      <div className="dsa__results" ref={dsaResultsRef}>
        {time != null ? (
          <p className="dsa__time">
            Searched through 12.5k+ questions in{" "}
            <span>{(time / 1000).toFixed(3)}</span> seconds
          </p>
        ) : null}
        {questions?.length ? (
          questions
            .slice((page - 1) * max_items, page * max_items)
            .map((q, index) => (
              <SearchResult key={"dsa_" + index} data={q} delay={index * 0.1} />
            ))
        ) : (
          <p className="dsa__noData">Searching Among 12.5K+ Questions</p>
        )}
        <Pagination
          count={Math.ceil(questions?.length / max_items) || 1}
          page={page}
          color="primary"
          onChange={(e, val) => {
            window.scrollTo(0, 0);
            setPage(val);
          }}
          siblingCount={1}
          boundaryCount={2}
        />
      </div>
    </div>
  );
};

export default DSA;
