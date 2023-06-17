// import idToData from "../data/idToData.json" assert { type: "json" };
// import idf from "../data/IDF.json" assert { type: "json" };
// import tfIdf from "../data/TF_IDF.json" assert { type: "json" };
// import bm25 from "../data/BM25.json" assert { type: "json" };
// import { Question, IDF, TFIDF, BM25 } from "../models.js";

// const DELAY = 15000;

// // store question data
// const data = Object.values(idToData);
// setTimeout(
//   () =>
//     Question.insertMany(data)
//       .then((res) => console.log(res))
//       .catch((err) => console.log(err)),
//   DELAY
// );

// // store idf data
// const idfData = Object.keys(idf).map((key) => ({ key, value: idf[key] }));
// setTimeout(
//   () =>
//     IDF.insertMany(idfData)
//       .then((res) => console.log(res))
//       .catch((err) => console.log(err)),
//   DELAY
// );

// // store tfidf data
// const tfIdfData = Object.keys(tfIdf).map((key) => ({ key, value: tfIdf[key] }));
// setTimeout(
//   () =>
//     TFIDF.insertMany(tfIdfData)
//       .then((res) => console.log(res))
//       .catch((err) => console.log(err)),
//   DELAY
// );

// // store tfidf data
// const bm25Data = Object.keys(bm25).map((key) => ({ key, value: bm25[key] }));
// setTimeout(
//   () =>
//     BM25.insertMany(bm25Data)
//       .then((res) => console.log(res))
//       .catch((err) => console.log(err)),
//   DELAY
// );