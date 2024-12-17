import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import productRoutes from "./routes/products.router.js";
import cartRoutes from "./routes/carts.router.js";
import { connectMongoDB } from "./config/mongoDB.config.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser("secretKey"));

// Conexión a MongoDB
connectMongoDB();

// Rutas
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
