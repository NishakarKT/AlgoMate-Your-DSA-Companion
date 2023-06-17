import express from "express";
import * as authCtrl from "./controllers/auth-ctrl.js";
import * as dsaCtrl from "./controllers/dsa-ctrl.js";

const Router = express.Router();

// Misc Routes
Router.get("/", (req, res) => res.status(200).send("AlgoMate's backend is up and running here!"));
// Auth Routes
Router.post("/auth/generate_OTP", authCtrl.generate_OTP);
Router.post("/auth/verify_OTP", authCtrl.verify_OTP);
Router.get("/auth/token/:token", authCtrl.auth_token);
Router.get("/auth/get_user/:email", authCtrl.get_user);
Router.post("/auth/sign_up", authCtrl.sign_up);
// DSA Routes
Router.get("/dsa/get_questions", dsaCtrl.get_questions);

export default Router;