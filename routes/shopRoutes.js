import express from "express";
import { updateShop } from "../handlers/shopHandlers.js";
const shopRouter = express.Router();

//post User
shopRouter.put("/update", updateShop);

export default shopRouter;
