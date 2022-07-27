import { Request, Router, Response, NextFunction } from "express";
import passport from "passport";
import { Strategy } from "passport-trello";
// var OAuth = require("oauth").OAuth;
import { OAuth } from "oauth";
// var url = require("url");
import url from "url";

const router: Router = Router();

const {
  TRELLO_ID = "",
  TRELLO_SECRET = "",
  TRELLO_CALLBACK = ""
} = process.env;

// const token = "c275d2e1f80808fcc143dff86fbd4b6f";
// const secret =
//   "bec424b2866677287bddf3042b27f6db1d960f014e0f058f4965d92da2c3bf5c";

/*
/     OAuth Setup and Functions
*/
const requestURL = "https://trello.com/1/OAuthGetRequestToken";
const accessURL = "https://trello.com/1/OAuthGetAccessToken";
const authorizeURL = "https://trello.com/1/OAuthAuthorizeToken";
const appName = "Trello OAuth Example";
const scope = "read";
const expiration = "1hour";

// Be sure to include your key and secret in 🗝.env ↖️ over there.
// You can get your key and secret from Trello at: https://trello.com/app-key
// const key = process.env.TRELLO_KEY;
const key = "c275d2e1f80808fcc143dff86fbd4b6f";
const secret =
  "bec424b2866677287bddf3042b27f6db1d960f014e0f058f4965d92da2c3bf5c";

// Trello redirects the user here after authentication
const loginCallback = "http://localhost:5000/trello/callback";

// You should have {"token": "tokenSecret"} pairs in a real application
// Storage should be more permanent (redis would be a good choice)
const oauth_secrets: any = {};

const oauth = new OAuth(
  requestURL,
  accessURL,
  key,
  secret,
  "1.0A",
  loginCallback,
  "HMAC-SHA1"
);

const login = function (request: any, response: any) {
  oauth.getOAuthRequestToken(function (error, token, tokenSecret, results) {
    console.log("🚀 ~ file: auth.ts ~ line 57 ~ tokenSecret", tokenSecret);
    console.log("🚀 ~ file: auth.ts ~ line 57 ~ token", token);
    // console.log("🚀 ~ file: auth.ts ~ line 57 ~ results", results);
    oauth_secrets[token] = tokenSecret;
    response.redirect(
      `${authorizeURL}?oauth_token=${token}&name=${appName}&scope=${scope}&expiration=${expiration}`
    );
  });
};

let token, tokenSecret;

const callback = function (req: any, res: any) {
  const query = url.parse(req.url, true).query;
  const token = query.oauth_token as string;
  const tokenSecret = oauth_secrets[token] as any;
  const verifier = query.oauth_verifier;
  oauth.getOAuthAccessToken(
    token as any,
    tokenSecret,
    verifier as any,
    function (error, accessToken, accessTokenSecret, results) {
      console.log(
        "🚀 ~ file: auth.ts ~ line 79 ~ callback ~ accessTokenSecret",
        accessTokenSecret
      );
      console.log(
        "🚀 ~ file: auth.ts ~ line 79 ~ callback ~ accessToken",
        accessToken
      );

      res.send({ ok: "ok" });
      // In a real app, the accessToken and accessTokenSecret should be stored
      //   oauth.getProtectedResource(
      //     "https://api.trello.com/1/members/me",
      //     "GET",
      //     accessToken,
      //     accessTokenSecret,
      //     function (error, data, response) {
      //       console.log("🚀 ~ file: auth.ts ~ line 83 ~ callback ~ data", data);
      //       // Now we can respond with data to show that we have access to your Trello account via OAuth
      //       res.send(data);
      //     }
      //   );
    }
  );
};

// passport.use(
//   "trello",
//   new Strategy(
//     {
//       consumerKey: token,
//       consumerSecret: secret,
//       callbackURL: "http://localhost:5000/trello/callback",
//       passReqToCallback: true,
//       trelloParams: {
//         scope: "read,write",
//         name: "MyApp",
//         expiration: "never"
//       }
//     },
//     (req: any, token: any, tokenSecret: any, profile: any, done: any) => {
//       console.log("🚀 ~ file: apiFunction.ts ~ line 32 ~ req", req.user);
//       console.log("🚀 ~ file: apiFunction.ts ~ line 32 ~ profile", profile);
//       console.log(
//         "🚀 ~ file: apiFunction.ts ~ line 32 ~ tokenSecret",
//         tokenSecret
//       );
//       console.log("🚀 ~ file: apiFunction.ts ~ line 32 ~ token", token);
//       // if (!req.user) {
//       //     // # user is not authenticated, log in via trello or do something else
//       // } else {
//       //     // # authorize user to use Trello api
//       // }
//     }
//   )
// );

router.get(
  "/signin",
  //   passport.authenticate("trello", {
  //     prompt: "login",
  //     failureFlash: true,
  //     session: false
  //   }),
  (req: Request, res: Response, next: NextFunction) => {
    // console.log("asdfadsf");
    login(req, res);
  }
);

router.get("/callback", (req: Request, res: Response, next: NextFunction) => {
  console.log("req.user: ", req.user);
  callback(req, res);
});

export default router;
