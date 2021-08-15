const router = require("express").Router();
const edge = require("../controllers/edge.controller");

// Edges routes
router.get("/", edge.allEdges);
router.put("/", edge.updateConfig);

router.post("/:id/start", edge.start);
router.post("/:id/stop", edge.stop);
router.post("/:id/reboot", edge.reboot);
router.post("/:id/stress", edge.stress);

router.get("/:id/availability", edge.getAvailability);
router.get("/:id/cpu_usage", edge.getCpuUsage);
router.get("/:id/storage_usage", edge.getStorageUsage);

module.exports = router;
