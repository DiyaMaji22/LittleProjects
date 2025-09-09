import Router from "express";
import { Signup, Login } from "../controller/userController.js";

const route = Router();

route.post("/signup", Signup);
route.post("/login", Login);

export default route;
