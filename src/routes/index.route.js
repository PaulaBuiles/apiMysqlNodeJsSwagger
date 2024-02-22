import { Router } from "express";
import countryRouter from "./country.route.js";
import personaRouter from "./person.route.js";

// import loginRouter from "./login.route.js";

const indexRouter = Router();
const prefix = "/api";

//indexRouter.use(bodyParser.json());

indexRouter.get(prefix, (req, res) => {
  res.send("Welcome to Planetscale API");
});
indexRouter.use(`${prefix}/country`, countryRouter);
indexRouter.use(`${prefix}/persona`, personaRouter);

export default indexRouter;