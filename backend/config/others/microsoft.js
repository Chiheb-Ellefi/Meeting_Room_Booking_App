const MicrosoftStrategy = require("passport-microsoft").Strategy;
const {
  register,
  createAccessToken,
  createRefreshToken,
} = require("../../src/services/user");
const { createSession } = require("../../src/services/session");
const generator = require("generate-password");
const microsoftCallbackLogic = require("../../src/services/microsoft_callback");
const microsoftStrategy = new MicrosoftStrategy(
  {
    // Standard OAuth2 options
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    scope: ["user.read", "profile", "openid", "email"],
    prompt: "select_account",
    tenant: "common",
    authorizationURL:
      "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
    tokenURL: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
  },
  async function (req, refreshToken, profile, done) {
    await microsoftCallbackLogic(req, refreshToken, profile, done);
  }
);

//module.exports = microsoftStrategy;
