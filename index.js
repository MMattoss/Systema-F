const express = require('express');
const path = require('path');
const http = require('http');
const nodemailer = require('nodemailer');

const app = express();
const server = http.Server(app);
const port = 500;

app.set("port", port);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "/public")));

// Routing
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/pages/index.html"));
});

app.get('/Solucoes', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/pages/solucoes.html"))
})

app.post('/send_email', (req, res) => {
    const fName = req.body.
})

// Initialize web server
server.listen(port, ()=> {
    console.log("Starting server on port: " + port);
});