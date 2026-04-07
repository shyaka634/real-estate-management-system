import express from "express";
import {
    deleteRent,
    getAllRents,
    getRentById,
    registerRent,
    updateRent
} from "../controllers/rentController.js";

const router = express.Router();

router.post("/", registerRent);
router.get("/", getAllRents);
router.get("/:id", getRentById);
router.put("/:id", updateRent);
router.delete("/:id", deleteRent);

export default router;
