import { findResults_tfIdf, findResults_bm25, data } from "../utils/dsa-ut.js";

export const get_questions = (req, res) => {
  const { search, mode, autocorrect } = req.params;
  if (search === "all") res.status(200).send(data);
  else {
    if (mode === "tf_idf") res.status(200).send(findResults_tfIdf(search, autocorrect));
    else res.status(200).send(findResults_bm25(search, autocorrect));
  }
};
