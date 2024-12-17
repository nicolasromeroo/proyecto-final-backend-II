
import { Router } from "express";
import { userDao } from "../dao/mongo/user.dao.js";
import { createToken, verifyToken } from "../utils/jwt.js";
import { passportCall } from "../middlewares/passport.middleware.js";
import UserDTO from "../dtos/user.dto.js";

const router = Router();

router.get("/current", passportCall("jwt"), authorization("user"), async (req, res) => {
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