import passport from "passport";
import { OIDCStrategy } from "passport-azure-ad";
import dotenv from "dotenv";

import { Router } from "express";
import simpleOAuth from "simple-oauth2";
import getUserDetails from "../helpers/getUserDetails";
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

// passport.serializeUser(function (user: any, done) {
//   console.log("🚀serializeUser: ", user);
//   done(null, user.profile.oid);
// });

// passport.deserializeUser(function (id: any, done) {
//   console.log("deserializeUser: ", id);
//   done(null, id);
// });

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

  try {
    const user = await getUserDetails(accessToken);

    console.log("userDetails", user); // {displayName, surname, givenName, userPrincipalName, }
    if (user) {
      profile["email"] = user.mail ? user.mail : user.userPrincipalName;
    }
  } catch (err) {
    return done(err);
  }

  console.log("params:", params);

  const oauthToken = oauth2.accessToken.create(params);

  console.log("oauthToken", oauthToken);

  //   users[profile.oid] = { profile, oauthToken };
  //   return done(null, users[profile.oid]);
  return done(null, { profile, oauthToken });
}

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
    signInComplete
  )
);

router.get(
  "/signin",
  passport.authenticate("azuread-openidconnect", {
    prompt: "login",
    failureRedirect: "/",
    failureFlash: true,
    successRedirect: "/",
    session: false,
  })
);

router.post(
  "/callback",
  passport.authenticate("azuread-openidconnect", {
    successRedirect: "/",
    session: false,
  }),
  function (req, res) {
    console.log("req: ", req.user);

    const { profile, oauthToken } = req.user as any;
    console.log("🚀 ~ file: auth.js ~ line 50 ~ oauthToken", oauthToken);
    console.log("🚀 ~ file: auth.js ~ line 50 ~ profile", profile);
  }
);

export default router;
