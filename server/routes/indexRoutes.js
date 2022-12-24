const express = require("express");
const router = express.Router();
const axios = require("axios");

const countriesList = require("../data/countriesName");
const countriesListToArr = countriesList.countriesNames.split(", ").sort();
/* GET home page. */
router.get("/home", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/statistics", async (req, res) => {
  const worldCount = await axios.get(
    "https://covid-19.dataflowkit.com/v1/world"
  );
  res.render("stats", {
    worldCount: worldCount.data,
    countriesList: countriesListToArr,
  });
});

module.exports = router;
