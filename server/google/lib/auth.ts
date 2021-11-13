import passport from "passport";
import { Router } from "express";
import { path } from "ramda";
import { Profile, Strategy as GoogleStrategy } from "passport-google-oauth20";
import UserService from "../../services/User";
import IntegrationService from "../../services/Integration";
import { User } from "../../db/sequelize";
import { VerifyCallback } from "passport-azure-ad";
import AuthService from "./../../services/Auth";
import { Services } from "../../constants/services";

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
      let user: User | null;
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
          Services.googleCalendar
        );
      } catch (e) {
        try {
          await IntegrationService.createNewIntegration(
            Services.googleCalendar,
            user!.id as any,
            accessToken,
            refreshToken
          );
        } catch (e) {
          console.log("e: ", e);
        }
      }

      return done(null, user! as any);
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
    if (req.user) {
      const { email, id } = req.user as User;
      const token = AuthService.issueToken(email, id);
      res.redirect(`http://localhost:3000?token=${token}`);
    }

    res.redirect(`http://localhost:3000`);
  }
);

export default router;
