const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");

router.get("/", contactController.getAllNumbers);
router.post("/", contactController.createNumber);
router.get("/:id", contactController.getNumberById);
router.put("/:id", contactController.updateNumber);
router.delete("/:id", contactController.deleteNumber);

module.exports = router;
