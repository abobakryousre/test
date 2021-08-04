const express = require("express");
const router = express.Router();
const storesController = require("../controllers/storesController");
/**
 * GET
 * Route: /
 * Result: return all food stoers
 */

router.get("/", storesController.getStores);

/**
 * GET
 * Route: /:id
 * Result: return matched food stoers or 404
 */

router.get("/:id", storesController.getStore);

/**
 * POST
 * Route: /
 * Result: return created food stoers
 */

router.post("/", storesController.createStore);

/**
 * PUT
 * Route: /:id
 * Result: return updated food stoers
 */

router.put("/:id", storesController.updateStore);

/**
 * DELETE
 * Route: /:id
 * Result: return deleted food stoers
 */

router.delete("/:id", storesController.deleteStore);

module.exports = router;
