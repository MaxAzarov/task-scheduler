import passport from "passport";
import { Router } from "express";
import { path } from "ramda";

import { Profile, Strategy as GoogleStrategy } from "passport-google-oauth20";
import UserService from "../../services/User";
import IntegrationService from "../../services/Integration";
import { User } from "../../db/sequelize";
import { VerifyCallback } from "passport-azure-ad";

const router = Router();

const {
  GOODLE_CLIENT_ID = "",
  GOOGLE_CLIENT_SECRET = "",
  GOOGLE_CALLBACK_URL = "",
} = process.env;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOODLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
    },
    async function (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) {
      const email = path(["emails", 0, "value"], profile) as string;

      const { name } = profile;

      const { familyName, givenName } = name as {
        familyName: string;
        givenName: string;
      };
      let user: User | undefined;
      // user
      try {
        user = await UserService.checkIfUserExistsByEmail(email);
      } catch (e) {
        try {
          user = await UserService.addNewUser(givenName, familyName, email);
        } catch (e) {
          console.log("e: ", e);
        }
      }

      try {
        await IntegrationService.checkIfIntegrationExists(
          user!.id as any,
          "google-calendar"
        );
      } catch (e) {
        try {
          await IntegrationService.createNewIntegration(
            "google-calendar",
            user!.id as any,
            accessToken,
            refreshToken
          );
        } catch (e) {
          console.log("e: ", e);
        }
      }

      return done(null, user);
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
    console.log("req.user: ", req.user);
    res.send(req.user);
  }
);

export default router;
