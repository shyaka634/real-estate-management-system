import express from "express";
import {
    deleteRequest,
    getAllRequests,
    getRequestById,
    registerRent,
    updateRequest
} from "../controllers/requestController.js";

const router = express.Router();

router.post("/", registerRent);
router.get("/", getAllRequests);
router.get("/:request_id", getRequestById);
router.put("/:request_id", updateRequest);
router.delete("/:request_id", deleteRequest);

export default router;
