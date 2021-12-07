import express, { NextFunction, Request, Response } from "express";
import passport from "passport";
import microsoftAuthRouter from "./microsoft";
import googleAuthRouter from "./google";
import dotenv from "dotenv";
import session from "express-session";
import db from "./db/sequelize";
import authRouter from "./routes/public/auth";
import eventsRouter from "./routes/private/events";
import userRouter from "./routes/private/user";
import ApiError from "./error/apiError";
import cors from "cors";
import checkJWT from "./middlewares/checkJWT";

const app = express();

app.use(cors());

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
app.use("/auth", authRouter);
app.use("/events", checkJWT, eventsRouter);
app.use("/user", checkJWT, userRouter);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user: any, done) {
  done(null, user);
});

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ success: false, message: err.message });
  }
  return res
    .status(500)
    .json({ success: false, message: "Something went wrong" });
};

app.use(errorHandler);

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
