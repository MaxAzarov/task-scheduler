import passport from "passport";
import { OIDCStrategy } from "passport-azure-ad";
import dotenv from "dotenv";
import UserService from "../../services/User";

import { Router } from "express";
import simpleOAuth from "simple-oauth2";
import getUserDetails from "../helpers/getUserDetails";
import IntegrationService from "./../../services/Integration";
import { User } from "../../db/sequelize";
const router = Router();

dotenv.config();

const {
  OAUTH_APP_ID = "",
  OAUTH_REDIRECT_URI = "",
  OAUTH_APP_PASSWORD = "",
  OAUTH_ID_METADATA = "",
  OAUTH_AUTHORITY = "",
  OAUTH_SCOPES = "",
  OAUTH_AUTHORIZE_ENDPOINT = "",
  OAUTH_TOKEN_ENDPOINT = "",
} = process.env;
console.log(
  "🚀 ~ file: auth.ts ~ line 15 ~ OAUTH_REDIRECT_URI",
  OAUTH_REDIRECT_URI
);

let oauth2 = (simpleOAuth as any).create({
  client: {
    id: OAUTH_APP_ID,
    secret: OAUTH_APP_PASSWORD,
  },
  auth: {
    tokenHost: OAUTH_AUTHORITY,
    authorizePath: OAUTH_AUTHORIZE_ENDPOINT,
    tokenPath: OAUTH_TOKEN_ENDPOINT,
  },
});

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
      accessToken: any,
      refreshToken: string,
      params: any,
      done: any
    ) {
      if (!profile.oid) {
        return done(new Error("No OID found in user profile."));
      }
      let newUser: User | undefined;

      try {
        const user = await getUserDetails(accessToken);

        const { userPrincipalName: email, givenName, surname } = user;
        try {
          newUser = await UserService.checkIfUserExistsByEmail(email);
        } catch (e) {
          try {
            newUser = await UserService.addNewUser(givenName, surname, email);
          } catch (e) {
            console.log("e: ", e);
          }
        }
      } catch (err) {
        return done(err);
      }

      // const oauthToken = oauth2.accessToken.create(params);

      try {
        await IntegrationService.checkIfIntegrationExists(
          newUser!.id as any,
          "microsoft-calendar"
        );
      } catch (e) {
        try {
          await IntegrationService.createNewIntegration(
            "microsoft-calendar",
            newUser!.id as any,
            accessToken,
            refreshToken
          );
        } catch (e) {
          console.log("e: ", e);
        }
      }

      return done(null, newUser);
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
    console.log("req.user: ", req.user);
    res.json(req.user);
  }
);

export default router;
