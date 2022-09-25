import "module-alias";
import express, { NextFunction, Request, Response } from "express";
import passport from "passport";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import authRouter from "@routes/public/auth";

// import authRouter from "./routes/public/auth";
import log from "./logger";
// import fetch from "node-fetch";
import microsoftAuthRouter from "./microsoft";
import googleAuthRouter from "./google";
import trelloAuthRouter from "./trello";
import jiraAuthRouter from "./jira";
import db from "./db/sequelize";
// import authRouter from "./routes/public/auth";
import eventsRouter from "./routes/private/events";
import userRouter from "./routes/private/user";
import ApiError from "./error/apiError";
import checkJWT from "./middlewares/checkJWT";

const app = express();

app.use(cors());

app.use(
  session({
    secret: "your_secret_value_here",
    resave: false,
    saveUninitialized: false,
    unset: "destroy"
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use("/microsoft", microsoftAuthRouter);
app.use("/google", googleAuthRouter);
app.use("/trello", trelloAuthRouter);
app.use("/jira", jiraAuthRouter);
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

// fetch("https://maxazarov.atlassian.net/rest/api/3/project/search", {
//   method: "GET",
//   headers: {
//     Authorization: `Basic ${Buffer.from(
//       "volodor05412@gmail.com:eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik16bERNemsxTVRoRlFVRTJRa0ZGT0VGRk9URkJOREJDTVRRek5EZzJSRVpDT1VKRFJrVXdNZyJ9.eyJodHRwczovL2F0bGFzc2lhbi5jb20vb2F1dGhDbGllbnRJZCI6IlE2UWJvbUs2UVlWa3B1MXhWMWkwenM5T3pvNjIwWWxzIiwiaHR0cHM6Ly9hdGxhc3NpYW4uY29tL2VtYWlsRG9tYWluIjoiZ21haWwuY29tIiwiaHR0cHM6Ly9hdGxhc3NpYW4uY29tL3N5c3RlbUFjY291bnRJZCI6IjYyMjY1MjUxMTRjZDI0MDA2OTBhYmUwMiIsImh0dHBzOi8vYXRsYXNzaWFuLmNvbS9zeXN0ZW1BY2NvdW50RW1haWxEb21haW4iOiJjb25uZWN0LmF0bGFzc2lhbi5jb20iLCJodHRwczovL2F0bGFzc2lhbi5jb20vdmVyaWZpZWQiOnRydWUsImh0dHBzOi8vYXRsYXNzaWFuLmNvbS9maXJzdFBhcnR5IjpmYWxzZSwiaHR0cHM6Ly9hdGxhc3NpYW4uY29tLzNsbyI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9hdGxhc3NpYW4tYWNjb3VudC1wcm9kLnB1czIuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDVkZDcwYzA1OWQ3OWFkMGVmNTNhNDJiMSIsImF1ZCI6ImFwaS5hdGxhc3NpYW4uY29tIiwiaWF0IjoxNjQ2NzQ3NDgwLCJleHAiOjE2NDY3NTEwODAsImF6cCI6IlE2UWJvbUs2UVlWa3B1MXhWMWkwenM5T3pvNjIwWWxzIiwic2NvcGUiOiJyZWFkOmlzc3VlOmppcmEtc29mdHdhcmUgcmVhZDppc3N1ZTpqaXJhIHJlYWQ6cHJvamVjdDpqaXJhIHJlYWQ6dXNlcjpqaXJhIHJlYWQ6dXNlci5wcm9wZXJ0eTpqaXJhIn0.Un43JJAq12APx55-g0SLzquJSRzaYmsLxM4bvjMY3-x4O38_kFD_WVensYIIt69MmQJEGJD2cKDujNYxdLPrAiX-tyuvBUdBQY-1elxoZ3cTxnJlbNbWAPUHLfU7X3CWMo0_pEQbWdqUq_PiAyWkpmDO60kn1BV4_ZQnothN8jG2V4ugS03BYnoDwJigM66H8JZhob9O6d_tjG0MB5Qpfw89UX7Lzwsp1jX3_vaYG7uCPISO6LFCk78oIvCXi_zlkoKAb08F34lkHFtiYL8sBO1ib5yYxR1aJxv4pdolX_VXCZUWkXEY35lOwLHVhgVkkdT3Tjce9r2IIED2CbM-Qg"
//     ).toString("base64")}`,
//     Accept: "application/json"
//   }
// })
//   .then((response) => {
//     console.log(`Response: ${response.status} ${response.statusText}`);
//     return response.text();
//   })
//   .then((text) => console.log(text))
//   .catch((err) => console.error(err));

// const { PORT = 5000 } = process.env;

const port = process.env.PORT ? +process.env.PORT : 5000;

db.authenticate()
  .then(() => {
    app.listen(port, () => {
      log.info("🚀 Server ready at http://localhost:5000");
    });
  })
  .catch((e) => {
    log.error("Can not connect to db! Reason: ", e);
  });

process.on("uncaughtException", (e) => {
  log.error("Uncaught Expection " + e.message);
});
