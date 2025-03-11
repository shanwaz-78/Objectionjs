import { Router } from "express";
import userController from "../controllers/index.js";

const router = Router();

router.get("/", userController.userController.getAllUsers);
router.get("/:id", userController.userController.getUserById);
router.post("/create-user", userController.userController.createUser);
router.put("/update-user/:id", userController.userController.updateUser);
router.delete("/delete-user/:id", userController.userController.deleteUser);

export default router;
