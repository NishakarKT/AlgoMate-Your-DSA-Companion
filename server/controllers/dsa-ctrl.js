import { findResults_tfIdf, findResults_bm25 } from "../utils/dsa-ut.js";
import { idToData } from "../utils/dsa-ut.js";

export const data = Object.values(idToData);

export const get_questions = (req, res) => {
  let { search, mode, autocorrect, filter, page, limit } = req.query;
  search = search || "all";
  mode = mode || "bm25";
  autocorrect = autocorrect || "no";
  filter = filter || "all";
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;
  if (search === "all") {
    const filteredData = data.filter((d) => filter === "all" ? true : d.platform.toLowerCase() === filter.toLowerCase());
    res.status(200).send({ data: filteredData.slice((page - 1) * limit, page * limit), count: filteredData.length });
  } else {
    if (mode === "tf_idf") res.status(200).send(findResults_tfIdf(search, autocorrect, filter, page, limit));
    else if (mode === "bm25") res.status(200).send(findResults_bm25(search, autocorrect, filter, page, limit));
  }
};
