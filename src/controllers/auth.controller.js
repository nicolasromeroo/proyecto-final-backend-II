import bcrypt from "bcrypt";
import { userDao } from "../dao/user.dao.js"; 
import { createToken } from "../utils/jwt.js";  

export const register = async (req, res) => {
  const { first_name, last_name, email, password, age, role } = req.body;

  try {
    const existingUser = await userDao.getByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userDao.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      age
    });

    const token = createToken(newUser);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true, 
      maxAge: 3600000 
    });

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar el usuario" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userDao.getByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    const token = createToken(user);

     res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 3600000  
    });

    res.status(200).json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al hacer login" });
  }
};
