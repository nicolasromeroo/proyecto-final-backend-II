
import { Router } from "express";
import { userDao } from "../dao/user.dao.js";
import { createToken, verifyToken } from "../utils/jwt.js";
import { passportCall } from "../middlewares/passport.middleware.js";
import UserDTO from "../dto/user.dto.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/current", passportCall("jwt"), authMiddleware("user"), async (req, res) => {
  try {
    const user = await userDao.getById(req.user.id);
    const userDTO = new UserDTO(user);
    
    res.status(200).json({ status: "success", payload: userDTO });

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
  }
});



export default router;