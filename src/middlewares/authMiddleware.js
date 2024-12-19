
import { verifyToken } from "../utils/jwt.js";

export default function authMiddleware(role) {
  return async (req, res, next) => {
    const token = req.cookies.token;
    const user = verifyToken(token);

    if (!user || (role === "admin" && user.role !== "admin") || (role === "user" && user.role !== "user")) {
      return res.status(403).json({ message: "Acceso no permitido" });
    }

    req.user = user;
    next();
  };
}
