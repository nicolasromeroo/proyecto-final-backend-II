
// const authMiddleware = (role) => {
//     return (req, res, next) => {
//         const user = req.body

//         if (!user) {
//             return res.status(401).json({ error: "No autorizado."})
//         }

//         if (role !== userRole) {
//             return res.status(403).json({ error: "No tienes permiso para realizar esta acción."})
//         }

//         next()
//     }
// }

// export default authMiddleware

// middlewares/authMiddleware.js
export default function authMiddleware(role) {
    return async (req, res, next) => {
      const token = req.cookies.token;
      const user = verifyToken(token); // Verifica el token y extrae el usuario
  
      if (!user || (role === "admin" && user.role !== "admin") || (role === "user" && user.role !== "user")) {
        return res.status(403).json({ message: "Acceso no permitido" });
      }
  
      req.user = user;
      next();
    };
  }
  