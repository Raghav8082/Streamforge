import express from "express"

const Route = express.Router();

import { registeruser ,login } from "../controller/user.controler";


Route.post("/registe",registeruser);
Route.post("/login",login);

export default Route;