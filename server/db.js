const express = require("express");
const path = require("path");
const mysql = require("mysql");
const cors = require("cors");
const nodemailer = require("nodemailer");

require("dotenv").config();

const app = express();

app.use(express.static(__dirname));

app.use(express.json());
app.use(cors());

const bcrypt = require("bcrypt");
const { response } = require("express");

const db = mysql.createConnection({
  user: "onlysiam_weathercloset",
  host: "localhost",
  password: process.env.db_password,
  database: "onlysiam_weathercloset",
  // user: "root",
  // host: "localhost",
  // password: "",
  // database: "weathercloset",
});

(async function () {
  const password = "1620141";
  const hashpass = await bcrypt.hash(password, 9);
})();
app.post("/api/validateEmail", (req, res) => {
  const email = req.body.email;
  db.query("SELECT * from user WHERE email=?;", [email], (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    res.send(result);
  });
});
app.post("/api/signup", (req, res) => {
  const username = req.body.username;
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  db.query(
    "INSERT INTO user (name,username,password,email) VALUES (?,?,?,?)",
    [name, username, password, email],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result) {
        res.send(result);
      }
    }
  );
});
app.post("/api/validateUsername", (req, res) => {
  const username = req.body.username;
  db.query(
    "SELECT * from user WHERE username=?;",
    [username],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send(result);
    }
  );
});
app.post("/api/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.query(
    "SELECT * FROM user WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send(result);
    }
  );
});
app.post("/api/registersession", (req, res) => {
  const username = req.body.username;
  db.query(
    "INSERT INTO session (username) VALUES (?)",
    [username],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result) {
        res.send(result);
      }
    }
  );
});
app.post("/api/fetchweather", (request, response) => {
  const api = `https://api.openweathermap.org/data/2.5/weather?q=kuril,BD}&APPID=22d0e65e7e7b1518e96f61cbefe11d65`;
  fetch(api)
    .then((response) => {
      res.send({ err: "err" });
    })
    .then((data) => {
      res.send({ err: "err2" });
    });

  res.send({ err: "errrrrr" });
});
var otptmp;
app.post("/api/resetreq", (req, res) => {
  otptmp = Math.floor(Math.random() * (999999 - 111111) + 111111);
  otpmail = otptmp;
  const email = req.body.email;
  const otp = otptmp;
  db.query(
    "UPDATE user SET otp = ? WHERE email = ?",
    [otp, email],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        const output = `
    <h3>Please Use The Following OTP to Reset Your Password Within 5 Minute.</h3><h1 style = 'color:#ffffff;width: 150px; background-color: #06AA6D; border-radius: 15px;padding: 10px;text-align: center;'>${otptmp}</h1>
  `;
        const usermail = req.body.usermail;
        let transporter = nodemailer.createTransport({
          host: "weathercloset.onlysiam.com",
          port: 465,
          secure: true,
          auth: {
            user: "authentication@weathercloset.onlysiam.com",
            pass: "ot.siam07",
          },
        });

        transporter.sendMail(
          {
            from: '"Weather Closet" <authentication@weathercloset.onlysiam.com>',
            to: usermail,
            subject: "Password Reset OTP",
            text: "Enter The Following Otp To Reset Password.",
            html: output,
          },
          (err, result) => {
            if (err) {
              res.send({ err: err });
            }
          }
        );

        res.send({ message: otp });
      }
    }
  );
});
app.post("/api/mailchecker", (req, res) => {
  const email = req.body.email;
  db.query("SELECT email FROM user WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result.length > 0) {
      res.send(result);
    } else {
      res.send({ message: "Cannot Fetch Data" });
    }
  });
});

app.post("/api/otpchecker", (req, res) => {
  const otp = req.body.otp;
  const email = req.body.email;
  db.query(
    "SELECT otp FROM user WHERE email = ? AND otp = ?",
    [email, otp],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "Cannot Fetch Data" });
      }
    }
  );
});
app.post("/api/resetpass", (req, res) => {
  const email = req.body.email;
  const pass = req.body.pass;
  db.query(
    "UPDATE user SET password = ? WHERE email = ?",
    [pass, email],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "success" });
      }
    }
  );
});
app.post("/api/saveoutfit", (req, res) => {
  const username = req.body.username;
  const accessories = req.body.accessories;
  const top = req.body.top;
  const bottom = req.body.bottom;
  const foot = req.body.foot;
  db.query(
    "INSERT INTO outfits (username,accessories,top,bottom,foot) VALUES (?,?,?,?,?)",
    [username, accessories, top, bottom, foot],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result) {
        res.send(result);
      }
    }
  );
});
app.post("/api/fetch", (req, res) => {
  const username = req.body.username;
  db.query(
    "SELECT * FROM outfits WHERE username = ?",
    [username],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "Cannot Fetch Data" });
      }
    }
  );
});
app.post("/api/fetchuser", (req, res) => {
  const username = req.body.username;
  db.query(
    "SELECT * FROM user WHERE username = ?",
    [username],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "Cannot Fetch Data" });
      }
    }
  );
});
app.post("/api/namechange", (req, res) => {
  const username = req.body.username;
  const name = req.body.name;
  db.query(
    "UPDATE user SET name = ? WHERE username = ?",
    [name, username],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "Cannot Fetch Data" });
      }
    }
  );
});
app.post("/api/mailchange", (req, res) => {
  const username = req.body.username;
  const mail = req.body.mail;
  db.query(
    "UPDATE user SET email = ? WHERE username = ?",
    [mail, username],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "Cannot Fetch Data" });
      }
    }
  );
});
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});

// app.listen();
app.listen();
