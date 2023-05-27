const express = require("express");
const {
  getAllProducts,
  getAllStaticProducts,
} = require("../controllers/products");
const router = express.Router();

router.get("/", getAllProducts);
router.get("/static", getAllStaticProducts);

module.exports = router