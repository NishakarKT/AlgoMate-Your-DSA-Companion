import React, { useState, useEffect, useRef, useContext } from "react";
import Mark from "mark.js";
import axios from "axios";
import "./DSA.css";
// constants
import { DSA_GET_QUESTIONS_ENDPOINT } from "../../constants/endpoints";
// components
import SearchResult from "../../components/searchResult/SearchResult";
// mui
import { Pagination, IconButton, TextField, NativeSelect, FormControl, InputLabel, Switch } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
// contexts
import UserContext from "../../contexts/userContext";
// consts
let data = [];

const DSA = () => {
  const max_items = 10;
  const { user, dark, search, setSearch, setIsLoading } = useContext(UserContext);
  const searchRef = useRef(null);
  const dsaResultsRef = useRef(null);
  const markInstance = useRef(null);
  const [filter, setFilter] = useState("all");
  const [questions, setQuestions] = useState([]);
  const [time, setTime] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [ttl, setTtl] = useState(1);
  const [mode, setMode] = useState("bm25");
  const [autocorrect, setAutocorrect] = useState("no");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  useEffect(() => {
    if (!data.length) {
      try {
        setIsLoading(true);
        axios
          .get(DSA_GET_QUESTIONS_ENDPOINT, {
            params: { mode, autocorrect, page, limit, filter, search },
          })
          .then((res) => {
            setIsLoading(false);
            setQuestions(res.data.data);
            setTtl(res.data.count);
            setTime(res.data.time);
            setPage((page) => (page > Math.floor(res.data.count / max_items) ? 1 : page));
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
  }, [user, mode, autocorrect, page, limit, filter, search]);

  useEffect(() => {
    if (dsaResultsRef.current) {
      markInstance.current = new Mark(dsaResultsRef.current);
      markInstance.current.unmark();
      markInstance.current.mark(search);
    }
  }, [search, questions]);

  const handleSearch = (e) => {
    e.preventDefault();
    const search = searchRef.current.value;
    if (search) setSearch(search);
  };

  return (
    <div className={`dsa ${dark ? "dsa__dark" : ""}`}>
      <div className="dsa__title">
        <h1>Ultimate DSA Search Engine</h1>
      </div>
      <form className="dsa__searchBox" onSubmit={(e) => handleSearch(e)}>
        <div className="dsa__subSearch">
          <TextField variant="standard" inputRef={searchRef} autoFocus label="Type you question." />
          <IconButton type="submit">
            <SearchRoundedIcon />
          </IconButton>
        </div>
        <div className="dsa__subSearch">
          <FormControl style={{ marginRight: "5px" }}>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Sort / Filter By
            </InputLabel>
            <NativeSelect defaultValue={0} onChange={(e) => setFilter(e.target.value)} inputProps={{ id: "uncontrolled-native" }}>
              <option value={"all"}>All</option>
              <option value={"codeforces"}>Codeforces</option>
              <option value={"codechef"}>Codechef</option>
              <option value={"leetcode"}>LeetCode</option>
            </NativeSelect>
          </FormControl>
          <FormControl>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Search Engine
            </InputLabel>
            <NativeSelect defaultValue={0} onChange={(e) => setMode(e.target.value)} inputProps={{ id: "uncontrolled-native" }}>
              <option value="bm25">BM25</option>
              <option value="tf_idf">TF_IDF</option>
            </NativeSelect>
          </FormControl>
        </div>
      </form>
      <div className="dsa__autocorrect">
        <p>Fear spelling errors? Enable our AutoCorrect!</p>
        <Switch onChange={(e) => setAutocorrect(e.target.checked ? "yes" : "no")} />
      </div>
      <div className="dsa__results" ref={dsaResultsRef}>
        {time != null ? (
          <p className="dsa__time">
            Searched through 12.5k+ questions in <span>{(time / 1000).toFixed(3)}</span> seconds
          </p>
        ) : null}
        {questions?.length ? (
          questions.map((q, index) => <SearchResult key={"dsa_" + index} data={q} delay={index * 0.1} />)
        ) : (
          <p className="dsa__noData">Searching Among 12.5K+ Questions</p>
        )}
        <Pagination
          count={Math.floor(ttl / max_items)}
          page={page}
          color="primary"
          onChange={(e, val) => setPage(val)}
          siblingCount={1}
          boundaryCount={2}
        />
      </div>
    </div>
  );
};

export default DSA;
