const { StatusCodes } = require("http-status-codes");

const {
  register,
  comparePassword,
  findUser,
} = require("../services/user.service");
qs = require("qs");
const {
  NotFound,
  BadRequest,
  Unauthenticated,
} = require("../../config/errors");
const { default: axios } = require("axios");
const client = require("../../config/database/redis");
const { dropSession } = require("../services/session.service");
//register user function
const registerUser = async (req, res) => {
  const user = await register({ ...req.body });
  res
    .status(StatusCodes.CREATED)
    .json({ message: `User created successfully with id : ${user.user_id}` });
};
//login user function using jwt

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  let user = null;
  if (!email || !password) {
    throw new BadRequest("Provide an email or badge_number and password ");
  }
  const isEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  if (isEmail) {
    user = await findUser({ email });
  }
  console.log("user....", user);
  if (!user) {
    throw new Unauthenticated("Invalid Credentials");
  }
  const isPassword = await comparePassword(password, user.password);
  if (!isPassword) {
    throw new Unauthenticated("Wrong Password");
  }
  //making a request to the token endpoint to get the refresh and access tokens

  const requestBody = qs.stringify({
    grant_type: "client_credentials",
    user_id: user.user_id,
  });

  const tokenResponse = await axios.post(
    process.env.TOKEN_ENDPOINT,
    requestBody
  );
  const response = {
    tokens: {
      refresh_token: tokenResponse.data.refresh_token.token,
      access_token: tokenResponse.data.access_token.token,
    },
    user: {
      user_id: user.user_id,
      email: user.email,
      username: user.username,
      active: user.active,
      image: user.image,
      role: user.role,
    },
  };
  //returning the tokens to the user
  res.status(StatusCodes.OK).json(response);
};
const forgotPassword = async (req, res) => {
  const { email, password, oldPassword } = req.body;
  if (!email || !password) {
    throw new BadRequest("Provide an email and password");
  }
  const user = await findUser({ email });
  console.log(user);
  if (!user) {
    throw new NotFound("No user found with this email .");
  }
  if (oldPassword) {
    const isMatch = await comparePassword(oldPassword, user.password);
    if (!isMatch) {
      throw new Unauthenticated("Wrong Old Password");
    }
  }
  await user.update({ password });
  res.status(StatusCodes.ACCEPTED).json({ user });
};
const logoutUser = async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];

  await client.setEx(`${token}`, process.env.BLOCKED_TOKEN_LIFETIME, "");
  const session = await dropSession({ access_token: { token } });
  if (!session) {
    throw new BadRequest("Session doesnt exist");
  }

  res
    .status(StatusCodes.ACCEPTED)
    .json({ message: "Session deleted successfuly" });
};

module.exports = { registerUser, loginUser, forgotPassword, logoutUser };
