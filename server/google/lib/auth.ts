import passport from "passport";
import { Router } from "express";

import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const router = Router();

const {
  GOODLE_CLIENT_ID = "",
  GOOGLE_CLIENT_SECRET = "",
  GOOGLE_CALLBACK_URL = "",
} = process.env;

// passport.serializeUser(function (user, done) {
//   /*
//     From the user take just the id (to minimize the cookie size) and just pass the id of the user
//     to the done callback
//     PS: You dont have to do it like this its just usually done like this
//     */
//   done(null, user);
// });

// passport.deserializeUser(function (user: any, done) {
//   /*
//     Instead of user this function usually recives the id
//     then you use the id to select the user from the db and pass the user obj to the done callback
//     PS: You can later access this data in any routes in: req.user
//     */
//   done(null, user);
// });

passport.use(
  new GoogleStrategy(
    {
      //   clientID: "1051.............",
      clientID: GOODLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
    },
    function (accessToken: string, refreshToken, profile, done) {
      console.log("🚀 ~ file: auth.ts ~ line 31 ~ accessToken", accessToken);
      console.log("🚀 ~ file: auth.ts ~ line 31 ~ refreshToken", refreshToken);
      console.log("🚀 ~ file: auth.ts ~ line 31 ~ profile", profile);
      /*
     use the profile info (mainly profile id) to check if the user is registerd in ur db
     If yes select the user and pass him to the done callback
     If not create the user and then select him and pass to callback
    */
      return done(null, profile);
    }
  )
);

router.get(
  "/signin",
  passport.authenticate("google", {
    scope: [
      "profile",
      "email",
      "https://www.googleapis.com/auth/calendar",
      "https://www.googleapis.com/auth/calendar.readonly",
      "https://www.googleapis.com/auth/calendar.events",
      "https://www.googleapis.com/auth/calendar.events.readonly",
      "https://www.googleapis.com/auth/calendar.settings.readonly",
      "https://www.googleapis.com/auth/calendar.addons.execute",
      // "calendar",
    ],
    accessType: "offline",
    // prompt: "select_account",
    prompt: "consent",
    session: false,
  })
);

router.get(
  "/callback",
  passport.authenticate("google", {
    failureRedirect: "/failed",
    session: false,
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

export default router;
