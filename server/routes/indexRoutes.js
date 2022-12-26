import express from "express";
const router = express.Router();
import axios from "axios";

import COUNTRIES from "../data/countriesNames.js";
const countriesList = COUNTRIES.split(", ").sort();

/* GET home page. */
router.get("/home", function (req, res, next) {
  res.render("index");
});

// Get Statistics pages
router.get("/statistics", async (req, res) => {
  const worldStats = await axios.get(
    "https://covid-19.dataflowkit.com/v1/world"
  );
  res.render("statistics", {
    worldStats: worldStats.data,
    countriesList: countriesList,
  });
});

// get contact US page
router.get("/contact", (req, res) => {
  res.render("contact");
});
export default router;
