import {generateToken} from "../utils/token.generator.js";

const default_user = {
    id: 1,
    email: "user@email.com",
    password: "strongPass123"
}

export const login = (req, res) => {
    const {email, password} = req.body;

    // verificar credenciales del user con bd

    const user = {id: 1, email};

    if (email === default_user.email && password === default_user.password) {
        const token = generateToken(user);
        res.json({token});
    } else {
        res.sendStatus(401); // agregar mensaje a rta
    }
}