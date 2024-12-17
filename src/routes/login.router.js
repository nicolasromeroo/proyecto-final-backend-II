
import { Router } from 'express';
import { createToken } from '../utils/jwt.js';
import { userDao } from '../dao/user.dao.js';

const router = Router();

router.post("/auth", async (req, res) => {
    const { email, password } = req.body
    const user = await userDao.getByEmail(email)

    if (!user) {
        return res.status(401).json({ message: 'Email o contraseña no válido.' });
    }

    const token = createToken(user)

    // token en cookie
    res.cookie("token", token, { httpOnly: true })

    res.status(200).json({ status: "success", payload: { user, token } })
})

export default router;
