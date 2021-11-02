const router = require("express").Router();
const algorithm = require("../controllers/algorithm.controller");

// algorithms routes
router.post("/heuristic", algorithm.heuristic);

module.exports = router;
