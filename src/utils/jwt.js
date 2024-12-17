import jwt from "jsonwebtoken"

// se crea el token
export const createToken = () => {
    const { id } = user
    const token = jwt.sign({ id, email }, "ClaveScereta", { expiresIn: "5m" })
    return token
}

// se verifica el token
export const verifyToken = (token) => {
    try {
        const decode = jwt.verify(token, "ClaveScereta")
        return decode
    } catch (error) {
        return null
    }
}