import jwt from "jsonwebtoken";

// Doctor authentication middleware. Verifies the JWT and attaches the doctor
// id to `req.docId` (not `req.body`, which Multer would overwrite for
// multipart requests).
const authDoctor = (req, res, next) => {
  try {
    const bearer = req.headers.authorization?.replace(/^Bearer\s+/i, "");
    const token = req.headers.dtoken || bearer;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized. Please login again." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.docId = decoded.id;

    next();
  } catch {
    res
      .status(401)
      .json({ success: false, message: "Session expired. Please login again." });
  }
};

export default authDoctor;
