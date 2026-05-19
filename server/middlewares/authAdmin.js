import jwt from "jsonwebtoken";

// Admin authentication middleware. Accepts the token via the legacy `atoken`
// header or a standard `Authorization: Bearer` header, then confirms the
// decoded JWT carries the admin role.
const authAdmin = (req, res, next) => {
  try {
    const bearer = req.headers.authorization?.replace(/^Bearer\s+/i, "");
    const token = req.headers.atoken || bearer;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized. Please login again." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized. Please login again." });
    }

    next();
  } catch {
    res
      .status(401)
      .json({ success: false, message: "Session expired. Please login again." });
  }
};

export default authAdmin;
