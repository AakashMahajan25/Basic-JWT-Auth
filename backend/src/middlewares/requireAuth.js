import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const requireAuth = async (req, res, next) => {
  // Verify Authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.json({ error: "Auth token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.JWT_Secret);
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    res.json({ error: "req not authorized" });
  }
};

export default requireAuth;
