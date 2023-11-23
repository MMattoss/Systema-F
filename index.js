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

app.get("/Sobre", (req, res)=> {
  res.sendFile(path.join(__dirname, "/public/pages/sobre.html"));
});

// Submit form
app.post("/send_email", (req, res) => {
  const formData = req.body;
  const { fName, lName, assunto, email, message } = formData;
  const info = `
    Nome: ${fName} ${lName}\n
    Email: ${email}\n
    Mensagem: ${message}`;

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
    subject: assunto,
    text: info,
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
app.listen(process.env.PORT || port, () => {
  console.log("Starting server on port: " + port);
});
