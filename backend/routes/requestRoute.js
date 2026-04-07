import express from "express";
import {
    deleteRequest,
    getAllRequests,
    getRequestById,
    registerRequest,
    updateRequest
} from "../controllers/requestController.js";

const router = express.Router();

router.post("/", registerRequest);
router.get("/", getAllRequests);
router.get("/:request_id", getRequestById);
router.put("/:request_id", updateRequest);
router.delete("/:request_id", deleteRequest);

export default router;
