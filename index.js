import express from "express";
import cors from "cors";
import productsRouter from "./src/routes/products.router.js";

const app = express();

app.use(express.json()); // middleware para traducir req body a json
app.use(cors()); // para realizar peticiones de diferentes dominios en navegadores
app.use(productsRouter); // agregando un parametro adelante se puede poner un prefijo a la ruta

app.get("/", (req, res) => {
    res.send("Hola mundo desde Express");
});

app.use((req, res, next) => { // Para manejo de rutas invalidas
    res.status(404).json({error: "Not Found"});
});

const PORT = 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));