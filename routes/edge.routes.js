const router = require("express").Router();
const edges = require("../controllers/edges.controller");

// Edges routes
router.get("/", edges.allEdges);
router.put("/", edges.updateConfig);

router.post("/:id/start", edges.start);
router.post("/:id/stop", edges.stop);
router.post("/:id/reboot", edges.reboot);
router.post("/:id/stress", edges.stress);

router.get("/:id/availability", edges.getAvailability);
router.get("/:id/cpu_usage", edges.getCpuUsage);
router.get("/:id/storage_usage", edges.getStorageUsage);

module.exports = router;
