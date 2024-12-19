import express from "express";
import dotenv from "dotenv";
import envsConfig from "./config/envs.config.js";
import bodyParser from "body-parser";
import { connectMongoDB } from "./config/mongoDB.config.js";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import { initializePassport } from "./config/passport.config.js";
import cors from "cors"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// const corsOptions = {
//     origin: 'http://localhost:3000',  
//     credentials: true,  
// };

app.use(cors(corsOptions));

// middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(envsConfig.SECRET_KEY));
initializePassport()

// conexión a MongoDB
connectMongoDB();

// rutas
app.use("/api", routes);

// iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
