import express from "express";
import passport from "passport";
import microsoftAuthRouter from "./microsoft";
import googleAuthRouter from "./google";
import dotenv from "dotenv";
import session from "express-session";
import db from "./db/sequelize";

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

passport.serializeUser(function (user, done) {
  console.log("🚀 ~ file: index.ts ~ line 33 ~ user", user);
  /*
    From the user take just the id (to minimize the cookie size) and just pass the id of the user
    to the done callback
    PS: You dont have to do it like this its just usually done like this
    */
  done(null, user);
});

passport.deserializeUser(function (user: any, done) {
  console.log("🚀 ~ file: index.ts ~ line 42 ~ user", user);
  /*
    Instead of user this function usually recives the id
    then you use the id to select the user from the db and pass the user obj to the done callback
    PS: You can later access this data in any routes in: req.user
    */
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
