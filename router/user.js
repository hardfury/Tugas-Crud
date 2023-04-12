import express from "express";
import { createUser, deleteUser, getAllUser, getSingleUser, updateUser } from "../controller/userController.js";

const router = express.Router()

router.post("/", createUser)
router.get("/:id", getSingleUser)
router.delete("/:id", deleteUser)
router.put("/:id", updateUser)
router.get("/", getAllUser)

export default router