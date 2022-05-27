import mongoose from "mongoose";

const DB_URL = `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASSWORD}@cluster0.xxutl.mongodb.net/az?retryWrites=true&w=majority`;
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection: Success");
  })
  .catch((err) => console.log(err));