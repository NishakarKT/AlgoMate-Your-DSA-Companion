import fs from "fs";
import nodemailer from "nodemailer";
import Handlebars from "handlebars";
import { fileURLToPath } from "url";
import { join, dirname } from "path";

// get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const getModifiedTemplate = (template, replacements) => {
    const filePath = join(__dirname, `./templates/${template}.html`)
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    return Handlebars.compile(source)(replacements);
};

const sendMail = async (sendee, subject, template, replacements) => new Promise((resolve, reject) => {
    const modifiedTemplate = getModifiedTemplate(template, replacements);

    const options = {
        from: "AlgoMate <" + process.env.EMAIL + ">",
        to: sendee,
        subject,
        html: modifiedTemplate,
    };

    transporter.sendMail(options, (err, info) => {
        if (err) resolve(err);
        else resolve(info.response);
    });
});

export default sendMail;
