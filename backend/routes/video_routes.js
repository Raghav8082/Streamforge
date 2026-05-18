import express from "express"
import { uploadvid } from "../controller/video.controller";
import isauthenticated from "../middleware/isauthenticated";

const Route = express.Router();

Route.post("/upload", isauthenticated,uploadvid);


export default Route;