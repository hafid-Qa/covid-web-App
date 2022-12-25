import express from "express";
const router = express.Router();
import axios from "axios";

import COUNTRIES from "../data/countriesNames.js";
const countriesList = COUNTRIES.split(", ").sort();
/* GET home page. */
router.get("/home", function (req, res, next) {
  res.render("index");
});

router.get("/statistics", async (req, res) => {
  const worldStats = await axios.get(
    "https://covid-19.dataflowkit.com/v1/world"
  );
  res.render("stats", {
    worldStats: worldStats.data,
    countriesList: countriesList,
  });
});

export default router;
