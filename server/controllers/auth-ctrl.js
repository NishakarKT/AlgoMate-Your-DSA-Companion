import jwt from "jsonwebtoken";
import sendMail from "../mail/mail.js";
import { generate, verify } from "../utils/otp-ut.js";
import { User } from "../models.js";

export const generate_OTP = (req, res) => {
    const { email } = req.body;
    const otp = generate(email);
    sendMail(email, "User Authentication", "otp", { otp })
        .then(() => res.status(200).send({ msg: "OTP was sent successfully." }))
        .catch(() => res.status(401).send({ msg: "The provided email address is not a registered one." }));
};

export const verify_OTP = (req, res) => {
    const { otp, email } = req.body;
    const result = verify(email, otp);
    if (result) {
        const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY);
        res.status(200).send({ msg: "OTP verification successful!", token });
    }
    else res.status(404).send({ msg: "Invalid OTP. Please try again." });
}

export const auth_token = async (req, res) => {
    const { token } = req.params;
    try {
        const { email } = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        User.findOne({ email }, (err, result) => {
            if (!result) res.status(404).send({ msg: "User doesn't exist." })
            else res.status(200).send(result);
        });
    } catch (err) { res.status(502).send({ msg: "Database error." }) };
};

export const get_user = (req, res) => {
    const { email } = req.params;
    try {
        User.findOne({ email }, (err, result) => {
            if (!result) res.status(404).send({ msg: "User doesn't exist." })
            else res.status(200).send(result);
        });
    } catch (err) { res.status(502).send({ msg: "Database error." }) };
};

export const sign_up = (req, res) => {
    const { email } = req.body;
    const userData = {
        name: "Programmer",
        email: email
    };
    try {
        const user = new User(userData);
        user.save()
            .then(result => res.status(201).send(result))
            .catch(err => res.status(403).send({ msg: "An account linked to this email address already exists." }))
    } catch (err) { res.status(500).send({ msg: "Database error." }) };
};