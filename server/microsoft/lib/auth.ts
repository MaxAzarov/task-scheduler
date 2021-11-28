import passport from "passport";
import { OIDCStrategy } from "passport-azure-ad";
import dotenv from "dotenv";
import UserService from "../../services/User";
import { Router } from "express";
import getUserDetails from "../helpers/getUserDetails";
import IntegrationService from "./../../services/Integration";
import { User } from "../../db/sequelize";
import AuthService from "./../../services/Auth";
import { Services } from "../../constants/services";
const router = Router();

dotenv.config();

const {
  OAUTH_APP_ID = "",
  OAUTH_REDIRECT_URI = "",
  OAUTH_APP_PASSWORD = "",
  OAUTH_ID_METADATA = "",
  OAUTH_AUTHORITY = "",
  OAUTH_SCOPES = "",
} = process.env;

passport.use(
  new OIDCStrategy(
    {
      identityMetadata: `${OAUTH_AUTHORITY}${OAUTH_ID_METADATA}`,
      clientID: OAUTH_APP_ID,
      responseType: "code id_token",
      responseMode: "form_post",
      redirectUrl: OAUTH_REDIRECT_URI,
      allowHttpForRedirectUrl: true,
      clientSecret: OAUTH_APP_PASSWORD,
      validateIssuer: false,
      passReqToCallback: false,
      scope: OAUTH_SCOPES.split(" "),
    },
    async function signInComplete(
      iss: any,
      sub: any,
      profile: any,
      accessToken: string,
      refreshToken: string,
      params: any,
      done: any
    ) {
      if (!profile.oid) {
        return done(new Error("No OID found in user profile."));
      }
      let newUser: User | null;

      try {
        const user = await getUserDetails(accessToken);

        const { userPrincipalName: email, givenName, surname } = user;
        try {
          newUser = await UserService.checkIfUserExistsByEmail(email);
          if (!newUser) {
            newUser = await UserService.addNewUser(givenName, surname, email);
          }
        } catch (e) {
          throw new Error("Internal Error ");
        }
      } catch (err) {
        return done(err);
      }

      try {
        const integration = await IntegrationService.checkIfIntegrationExists(
          newUser!.id as any,
          Services.microsoftCalendar
        );

        if (!integration) {
          await IntegrationService.createNewIntegration(
            Services.microsoftCalendar,
            newUser!.id as any,
            accessToken,
            refreshToken
          );
        }
      } catch (e) {
        console.log("e: ", e);
      }

      return done(null, newUser!);
    }
  )
);

router.get(
  "/signin",
  passport.authenticate("azuread-openidconnect", {
    prompt: "login",
    failureFlash: true,
    session: false,
  })
);

router.post(
  "/callback",
  passport.authenticate("azuread-openidconnect", {
    session: false,
  }),
  function (req, res) {
    if (req.user) {
      const { email, id } = req.user as User;
      const token = AuthService.issueToken(email, id);
      res.redirect(`http://localhost:3000?token=${token}`);
      return;
    }

    res.redirect(`http://localhost:3000`);
  }
);

export default router;
