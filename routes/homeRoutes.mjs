import express from "express";
import {
  postRuangan,
  getHomeIndex,
  postLemari,
  postRak,
  getRak,
  getRuangan,
  getLemari,
  getTahun,
  postTahun,
  getBundelan,
  postBundelan,
  getAllSameYearBundelan,
  getWarkah,
  getAllSameYearWarkah,
  postWarkah,
  getTableWarkah,
} from "../controllers/homeController.mjs";
const homeRouter = express.Router();

homeRouter.post("/postRuangan", postRuangan);
homeRouter.get("/", getHomeIndex);
homeRouter.post("/postLemari", postLemari);
homeRouter.post("/postRak", postRak);
homeRouter.post("/postTahun", postTahun);
homeRouter.post("/postBundelan", postBundelan);
homeRouter.post("/postWarkah", postWarkah);

homeRouter.get("/getRuangan", getRuangan);
homeRouter.get("/getLemari", getLemari);
homeRouter.get("/getRak", getRak);
homeRouter.get("/getTahun", getTahun);
homeRouter.get("/getBundelan", getBundelan);
homeRouter.get("/getAllBundelan", getAllSameYearBundelan);
homeRouter.get("/getWarkah", getWarkah);
homeRouter.get("/getAllWarkah", getAllSameYearWarkah);
homeRouter.get("/getTableWarkah", getTableWarkah);

export default homeRouter;
