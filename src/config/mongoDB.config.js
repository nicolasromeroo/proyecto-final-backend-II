import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;
        if (!mongoURI) throw new Error("La URI de MongoDB no está definida en las variables de entorno.");
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Conexión exitosa a MongoDB.");
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error.message);
        process.exit(1); // Termina la aplicación si falla la conexión
    }
};
