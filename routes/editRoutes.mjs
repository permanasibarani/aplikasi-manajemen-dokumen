import express from "express";
import {
  getEditPage,
  getTableWarkah,
} from "../controllers/editControllers.mjs";
const editRouter = express.Router();

editRouter.get("/", getEditPage);
editRouter.get("/getTableWarkah", getTableWarkah);

export default editRouter;
