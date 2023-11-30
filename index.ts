import express from "express";
import { moviesRouter } from "./src/routes/movies";
import { corsMiddleware } from "./src/middlewares/cors";

const PORT = process.env.PORT || 1235;
const app = express();
app.disable("x-powered-by");
app.use(corsMiddleware()); //middleware that helps with cors error, and specifying the origins that has access to the api
app.use(express.json()); // for parsing application/json

app.get("/", (_req, res) => {
  res.send("Hello Typescript!");
});

app.use("/movies", moviesRouter);

app.use((_req, res) => {
  res.status(404).send("404 not found");
});

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});
