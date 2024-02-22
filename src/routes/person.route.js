import { Router } from "express";

import { getPersonasInfo } from "../controllers/person.controller.js";

const personRouter = Router();

personRouter.get("/", getPersonasInfo);
console.log("person.route");

export default personRouter;