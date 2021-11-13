import express from "express";
import passport from "passport";
import microsoftAuthRouter from "./microsoft";
import googleAuthRouter from "./google";
import dotenv from "dotenv";
import session from "express-session";
import db from "./db/sequelize";
import auth from "./routes/public/auth";
import cors from "cors";

import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// app.use(
//   cors()
//   //   {
//   //   // origin: "*",
//   //   preflightContinue: true,
//   //   origin: "*",
//   //   methods: "GET, POST, PATCH, DELETE, PUT",
//   // }
// );

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next(); // dont forget this
});

app.options("*", cors() as any);

// app.use(function (req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

//   // Request methods you wish to allow
//   res.setHeader("Access-Control-Allow-Methods", "*");

//   // Request headers you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     ""
//   );

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   // res.setHeader("Access-Control-Allow-Credentials", true);

//   // Pass to next layer of middleware
//   next();
// });

app.use(
  session({
    secret: "your_secret_value_here",
    resave: false,
    saveUninitialized: false,
    unset: "destroy",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use("/microsoft", microsoftAuthRouter);
app.use("/google", googleAuthRouter);
app.use("/auth", auth);

passport.serializeUser(function (user, done) {
  console.log("🚀 ~ file: index.ts ~ line 33 ~ user", user);
  done(null, user);
});

passport.deserializeUser(function (user: any, done) {
  console.log("🚀 ~ file: index.ts ~ line 42 ~ user", user);
  done(null, user);
});

db.authenticate()
  .then(() => {
    app.listen(5000, () => {
      console.log(`🚀 Server ready at http://localhost:5000`);
    });
  })
  .catch((e) => {
    console.log("e: ", e);
    console.log("can not connect to db!");
  });
