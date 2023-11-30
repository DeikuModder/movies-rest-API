"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movies_1 = require("./src/routes/movies");
const cors_1 = require("./src/middlewares/cors");
const PORT = process.env.PORT || 1235;
const app = (0, express_1.default)();
app.disable("x-powered-by");
app.use((0, cors_1.corsMiddleware)()); //middleware that helps with cors error, and specifying the origins that has access to the api
app.use(express_1.default.json()); // for parsing application/json
app.get("/", (_req, res) => {
    res.send("Hello Typescript!");
});
app.use("/movies", movies_1.moviesRouter);
app.use((_req, res) => {
    res.status(404).send("404 not found");
});
app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`);
});
