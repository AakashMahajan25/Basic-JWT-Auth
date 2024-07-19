import User from "../models/user.model.js";

const generateAccessAndRefreshTokens = async (userID) => {
  try {
    const user = await User.findById(userID);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);
  }
};

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(200).json({ message: "Username already exists" });
    }

    const newUser = await User.create({
      username,
      password,
    });

    // Generate Access and Refresh Token
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      newUser._id
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "strict",
    });

    // Send Access Token along with Refresh Token
    res.json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = User.findOne({ username });

    if (!existingUser) {
      return res.json({ message: "User don't exist" });
    }

    const isPasswordValid = await existingUser.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res.json({ message: "Invalid Username or Password" });
    }

    // Generate New Access and Refresh Token
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      existingUser._id
    );

    // Set Access and Refresh Tokens as a cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7Days
      secure: true,
      sameSite: "strict",
    });

    res.json({ accessToken });
  } catch (error) {
    console.log(error);
  }
};

const testRoute = async (req, res) => {
  try {
    const data = await User.find();
    res.json(data);
  } catch (error) {
    console.log(error);
  }
};

const refreshAccessToken = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({
      message: "Refresh Token is required!",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);

    if (!user || user.refreshToken !== token) {
      return res.status(403).json({ message: "Invalid Refresh Token" });
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = User.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    res.json({ accessToken, refreshToken });
  } catch (error) {
    res.status(403).json({ message: "Invalid Refresh Token" });
  }
};

const validate_token = async (req, res) => {
  try {
    res.status(200).json({ valid: true });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  testRoute,
  refreshAccessToken,
  validate_token,
};
