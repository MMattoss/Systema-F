require("dotenv").config();
const googlePassword = process.env.GOOGLE_APP_PASSWORD;
const express = require("express");
const path = require("path");
const http = require("http");
const nodemailer = require("nodemailer");

const app = express();
const server = http.Server(app);
const port = 500;

app.set("port", port);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

// Routing
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/pages/index.html"));
});

app.get("/Solucoes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/pages/solucoes.html"));
});

app.post("/send_email", (req, res) => {
  const formData = req.body;
  const { fName, lName, subject, email, message } = formData;
  const fullName = `${fName} ${lName}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mattoss.barreto@gmail.com",
      pass: googlePassword,
    },
  });

  const mailOptions = {
    from: email,
    to: "mateusmattosbarreto2000@gmail.com",
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(`An error occured: ${error}`);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
    res.redirect("/");
  });
});

// Initialize web server
server.listen(port, () => {
  console.log("Starting server on port: " + port);
});
