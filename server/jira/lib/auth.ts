import { Request, Router, Response, NextFunction } from "express";
import passport from "passport";
import { Strategy } from "passport-trello";
// var OAuth = require("oauth").OAuth;
import { OAuth } from "oauth";
// import fetch from "node-fetch";
// const fetch = await import("node-fetch");
import url from "url";
import crypto from "crypto";

// https://auth.atlassian.com/authorize?audience=api.atlassian.com
// &client_id=Q6QbomK6QYVkpu1xV1i0zs9Ozo620Yls&scope=read%3Ame&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fjira%2Fsignin&state=${YOUR_USER_BOUND_VALUE}&response_type=code&prompt=consent

const router = Router();

router.get(
  "/signin",
  //   passport.authenticate("trello", {
  //     prompt: "login",
  //     failureFlash: true,
  //     session: false
  //   }),
  (req: Request, res: Response, next: NextFunction) => {
    // console.log("asdfadsf");
    const id = crypto.randomBytes(20).toString("hex");
    res.redirect(
      `https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=Q6QbomK6QYVkpu1xV1i0zs9Ozo620Yls&scope=read%3Auser.property%3Ajira%20offline_access%20read%3Auser%3Ajira%20read%3Aproject%3Ajira%20read%3Aissue%3Ajira%20read%3Aissue%3Ajira-software%20delete%3Aboard-scope.admin%3Ajira-software%20delete%3Asprint%3Ajira-software%20read%3Aboard-scope%3Ajira-software%20read%3Aboard-scope.admin%3Ajira-software%20read%3Abuild%3Ajira-software%20read%3Adeployment%3Ajira-software%20read%3Aepic%3Ajira-software%20read%3Afeature-flag%3Ajira-software%20read%3Aremote-link%3Ajira-software%20read%3Asource-code%3Ajira-software%20read%3Asprint%3Ajira-software%20write%3Aboard-scope%3Ajira-software%20write%3Aboard-scope.admin%3Ajira-software%20write%3Abuild%3Ajira-software%20write%3Adeployment%3Ajira-software%20write%3Aepic%3Ajira-software%20write%3Afeature-flag%3Ajira-software%20write%3Aissue%3Ajira-software%20write%3Aremote-link%3Ajira-software%20write%3Asource-code%3Ajira-software%20write%3Asprint%3Ajira-software%20read%3Aproject.avatar%3Ajira%20read%3Aproject.component%3Ajira%20read%3Aproject.email%3Ajira%20read%3Aproject.feature%3Ajira%20read%3Aproject.property%3Ajira%20read%3Aproject-version%3Ajira%20read%3Aproject-type%3Ajira%20read%3Aproject-role%3Ajira%20read%3Aproject-category%3Ajira%20read%3Aissue-type-hierarchy%3Ajira%20read%3Aapplication-role%3Ajira%20read%3Aissue-type%3Ajira%20read%3Aavatar%3Ajira%20write%3Aproject%3Ajira%20delete%3Aproject%3Ajira%20read%3Agroup%3Ajira%20delete%3Agroup%3Ajira%20write%3Agroup%3Ajira%20read%3Aissue-details%3Ajira&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fjira%2Fcallback&state=${id}&response_type=code&prompt=consent`
    );
  }
);

router.get(
  "/callback",
  async (req: Request, res: Response, next: NextFunction) => {
    const data = url.parse(req.url, true).query;
    console.log("🚀 ~ file: auth.ts ~ line 32 ~ router.get ~ data", data);
    console.log(
      "🚀 ~ file: auth.ts ~ line 33 ~ router.get ~ data",
      data.state,
      data.code
    );

    const response = await fetch("https://auth.atlassian.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        grant_type: "authorization_code",
        client_id: "Q6QbomK6QYVkpu1xV1i0zs9Ozo620Yls",
        client_secret:
          "qt8deITv-mYW51v2y0AKMRKLta87scGT1yVnMWCIR3KIoyAOWiI9qEt5ZqbRwDC7",
        code: data.code,
        redirect_uri: "http://localhost:5000/jira/callback"
      })
    });
    console.log(
      "🚀 ~ file: auth.ts ~ line 54 ~ router.get ~ response",
      response
    );

    const user = await response.json();
    console.log("🚀 ~ file: auth.ts ~ line 62 ~ user", user);

    //  res.redirect(`http://localhost:3000?token=${token}`);

    res.redirect("http://localhost:5000");
  }
);

export default router;
