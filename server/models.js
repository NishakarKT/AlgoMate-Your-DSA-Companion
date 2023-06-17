import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const questionSchema = new mongoose.Schema({
  id: { type: String },
  url: { type: String },
  title: { type: String },
  rating: { type: String },
  tags: { type: Array },
  author: { type: String },
  platform: { type: String },
  description: { type: String },
  time_limit: { type: String },
  memory_limit: { type: String },
  input_format: { type: Array },
  output_format: { type: Array },
  sample_inputs: { type: Array },
  sample_outputs: { type: Array },
  notes: { type: Array },
});

export const idfSchema = new mongoose.Schema({
  key: { type: String },
  value: { type: String },
});

export const tfIdfSchema = new mongoose.Schema({
  key: { type: String },
  value: { type: Object },
});

export const bm25Schema = new mongoose.Schema({
  key: { type: String },
  value: { type: Object },
});

export const User = new mongoose.model("users", userSchema);
export const Question = new mongoose.model("questions", questionSchema);
export const IDF = new mongoose.model("idfs", idfSchema);
export const TFIDF = new mongoose.model("tfidfs", tfIdfSchema);
export const BM25 = new mongoose.model("bm25s", bm25Schema);
