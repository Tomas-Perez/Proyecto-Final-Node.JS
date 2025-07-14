import {generateToken} from "../utils/token.generator.js";

const default_user = {
    id: 1,
    email: "user@email.com",
    password: "strongPass123"
} // user de prueba

export const login = (req, res) => {
    const {email, password} = req.body;

    const user = {id: 1, email};

    if (email === default_user.email && password === default_user.password) {
        const token = generateToken(user);
        res.json({token});
    } else {
        res.sendStatus(401);
    }
}