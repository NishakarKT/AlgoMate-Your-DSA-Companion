import Autocorrect from "autocorrect";
import Lemmatizer from "javascript-lemmatizer";
import keyword_extractor from "keyword-extractor";
import { performance } from "perf_hooks";
import IDF from "../data/IDF.json";
import TF_IDF from "../data/TF_IDF.json";
import BM25 from "../data/BM25.json";
import idToData from "../data/idToData.json";
// import IDF from "../data/IDF.json" assert { type: "json" };
// import TF_IDF from "../data/TF_IDF.json" assert { type: "json" };
// import BM25 from "../data/BM25.json" assert { type: "json" };
// import idToData from "../data/idToData.json" assert { type: "json" };

const rectify = Autocorrect();
const lemmatizer = new Lemmatizer();

export const data = Object.values(idToData).reverse();

const stripPunctuations = (str) =>
  str.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, " ");

const processStr = (str, autocorrect) => {
  // spell correction & lemmatization
  return stripPunctuations(str)
    .split(" ")
    .flatMap((word) => {
      const w = autocorrect === "yes" ? rectify(word) : word;
      const words = {};
      words[w] = 1;
      words[lemmatizer.noun(w)] = 1;
      words[lemmatizer.adjective(w)] = 1;
      words[lemmatizer.verb(w)] = 1;
      return Object.keys(words);
    })
    .join(" ");
};

// const getSrchStr = (data) => {
//   if (data) {
//     return stripPunctuations(
//       Object.values(data)
//         .map((val) =>
//           Array.isArray(val) ? val.join(" ").toLowerCase() : val.toLowerCase()
//         )
//         .join(" ")
//     );
//   }
//   return "";
// };

const getKeywords = (str) => {
  return keyword_extractor.extract(str, {
    language: "english",
    remove_digits: true,
    return_changed_case: true,
  });
};

// // unique keywords
// const keywords = {};
// data.forEach((d, i) => {
//   getKeywords(getSrchStr(d)).map((kWord) => {
//     if (!keywords[kWord]) keywords[kWord] = 1;
//   });
//   console.log(i + 1 + "/" + data.length);
// });
// console.log(Object.keys(keywords).length);

// // id to keywords
// const idToKeywords = {};
// data.forEach((d, i) => {
//     if(d.id)
//         idToKeywords[d.id] = getKeywords(getSrchStr(d))
//     console.log(i+1 + "/" +data.length);
// });

// // IDF
// const IDF = {};
// keywords.map((kWord, i) => {
//   let count = 0;
//   Object.values(idToKeywords).forEach((d) => {
//     if (d.includes(kWord)) count++;
//   });
//   IDF[kWord] = Math.log10(1 + ((Object.values(idToKeywords).length - count + 0.5)/(count + 0.5)));
//   console.log(i + 1 + "/" + keywords.length);
// });

// let L = 0;
// Object.values(idToKeywords).forEach((kWords) => {
//   L += kWords.length;
// });
// L /= Object.keys(idToKeywords).length;
// console.log(L);

// // BM25
// const BM25 = {};
// Object.keys(idToKeywords).forEach((id, i) => {
//     const freq = {};
//     idToKeywords[id].map((kWord) => {
//       if (!freq[kWord]) freq[kWord] = 0;
//       freq[kWord]++;
//     });
//     const bm25 = {};
//     Object.keys(freq).forEach(kWord => bm25[kWord] = (IDF[kWord] || 0) * ((freq[kWord] * (1.2 + 1)) / (freq[kWord] + 1.2*(1 - 0.75 + 0.75*(idToKeywords[id].length / L)))));
//     BM25[id] = bm25;
//     console.log(i+1 + "/" + Object.keys(idToKeywords).length);
// });

// fs.writeFile("data/myData.json", JSON.stringify(data), (err) =>
//   err ? console.log(err) : null
// );

export const findResults_bm25 = (search, autocorrect) => {
  const kWords = getKeywords(processStr(search, autocorrect));

  // BM25 scores
  const scores = {};
  const startTime = performance.now();
  Object.keys(BM25).forEach((id) => {
    let bm25 = 0;
    kWords.forEach((kWord) => (bm25 += BM25[id][kWord] || 0));
    scores[id] = bm25;
  });
  const endTime = performance.now();

  const results = Object.keys(scores)
    .sort((a, b) => scores[b] - scores[a])
    .slice(0, 50)
    .map((id) => idToData[id]);
  return { data: results, time: endTime - startTime };
};

export const findResults_tfIdf = (search, autocorrect) => {
  const kWords = getKeywords(processStr(search, autocorrect));
  let sq_A = 0;
  const tf_idf = {};
  kWords.forEach((kWord) => {
    if (!tf_idf[kWord]) tf_idf[kWord] = 0;
    tf_idf[kWord] += 1 / kWords.length;
  });

  Object.keys(tf_idf).forEach((kWord) => {
    tf_idf[kWord] = (IDF[kWord] || 0) * tf_idf[kWord];
    sq_A += tf_idf[kWord] * tf_idf[kWord];
  });

  const similarity = {};
  const startTime = performance.now();
  Object.keys(TF_IDF).forEach((id) => {
    let sim = 0,
      sq_B = 0;
    Object.keys(TF_IDF[id]).forEach((kWord) => {
      sim += TF_IDF[id][kWord] * (tf_idf[kWord] || 0);
      sq_B += TF_IDF[id][kWord] * TF_IDF[id][kWord];
    });
    sim = sim / (Math.sqrt(sq_A) * Math.sqrt(sq_B));
    similarity[id] = sim;
  });
  const endTime = performance.now();

  const results = Object.keys(similarity)
    .sort((a, b) => similarity[b] - similarity[a])
    .slice(0, 50)
    .map((id) => idToData[id]);

  return { data: results, time: endTime - startTime };
};

console.log(processStr("adding two numbers", "no"));
