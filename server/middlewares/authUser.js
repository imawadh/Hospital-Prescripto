import jwt from "jsonwebtoken";

// User authentication middleware. Verifies the JWT and attaches the user id
// to `req.userId` (not `req.body`, which Multer would overwrite for
// multipart requests).
const authUser = (req, res, next) => {
  try {
    const bearer = req.headers.authorization?.replace(/^Bearer\s+/i, "");
    const token = req.headers.token || bearer;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized. Please login again." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;

    next();
  } catch {
    res
      .status(401)
      .json({ success: false, message: "Session expired. Please login again." });
  }
};

export default authUser;
