import express from "express";
import passport from "passport";
import microsoftAuthRouter from "./microsoft";
import googleAuthRouter from "./google";
import dotenv from "dotenv";
import session from "express-session";

const app = express();

app.get("/", (req, res) => {
  res.send("test!");
});

app.use(
  session({
    secret: "your_secret_value_here",
    resave: false,
    saveUninitialized: false,
    unset: "destroy",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use("/microsoft", microsoftAuthRouter);
app.use("/google", googleAuthRouter);

app.listen(5000, () => {
  console.log(`🚀 Server ready at http://localhost:5000`);
});
