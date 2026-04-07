import express from "express";
import {
    deleteProperty,
    getAllProperties,
    getPropertyById,
    registerproperty,
    updateProperty
} from "../controllers/propertyController.js";

const router = express.Router();

router.post("/", registerproperty);
router.get("/", getAllProperties);
router.get("/:id", getPropertyById);
router.put("/:id", updateProperty);
router.delete("/:id", deleteProperty);

export default router;
