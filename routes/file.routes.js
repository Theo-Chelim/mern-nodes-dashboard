const router = require("express").Router();
const file = require("../controllers/file.controller");

// File routes
router.get("/", file.allFiles);
router.get("/:id/infos", file.getInfos);
router.post("/", file.addFile);

module.exports = router;
