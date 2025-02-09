
import jwt from 'jsonwebtoken';
const generarJWT = (id) => {
    //nos va a crear un nuevo json web token
    return jwt.sign({ id },
        process.env.JWT_SECRET, {
        expiresIn: "30d",
    }
    )

}
export default generarJWT;