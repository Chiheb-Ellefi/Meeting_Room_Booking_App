const { StatusCodes } = require("http-status-codes");

const {
  createSession,
  findSession,
  dropSession,
} = require("../../services/session.service");
const {
  createRefreshToken,
  createAccessToken,
  findUser,
} = require("../../services/user.service");
const {
  NotFound,
  BadRequest,
  Unauthenticated,
} = require("../../../config/errors");

const getToken = async (req, res) => {
  if (!req.body.grant_type) {
    throw new BadRequest("No grant type provided ");
  }
  // if the grant_type =client_credentials than the server is exchanging the user credentials for the tokens
  if (req.body.grant_type == "client_credentials") {
    const user = await findUser({ user_id: req.body.user_id });

    const refresh_token = createRefreshToken({
      user_id: user.user_id,
      email: user.email,
    });
    const access_token = createAccessToken({
      user_id: user.user_id,
      email: user.email,
      role: user.role,
      active: user.active,
    });
    const session = await createSession({
      refresh_token,
      access_token,
      user_id: user.user_id,
    });
    const token_response = {
      refresh_token,
      access_token,
      token_type: "Bearer",
      expires_at: process.env.ACCESS_TOKEN_LIFETIME,
    };
    res.status(StatusCodes.CREATED).json(token_response);
  } //if the grant_type = refresh_token then the access_token is expired and  the server is exchanging the current refresh_token with a new refresh and access tokens
  else if (req.body.grant_type == "refresh_token") {
    if (!req.body.refresh_token) {
      throw new Unauthenticated("Invalid token");
    }

    const session = await findSession({
      refresh_token: {
        token: req.body.refresh_token,
      },
    });
    if (!session) {
      throw new NotFound("No session found");
    }
    const user = await findUser({ user_id: session.user_id });
    //we need to drop the current refresh token because we used it to generate an access_token
    const deletedSession = await dropSession({
      session_id: session.session_id,
    });
    const refresh_token = createRefreshToken(user);
    const access_token = createAccessToken(user);
    //save the new tokens in the database
    const newSession = await createSession({
      refresh_token,
      access_token,
      user_id: user.user_id,
    });
    const token_response = {
      refresh_token: refresh_token.token,
      access_token: access_token.token,
    };
    res.status(StatusCodes.CREATED).json(token_response);
  }
};

module.exports = getToken;
