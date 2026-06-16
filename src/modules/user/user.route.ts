import { Router } from "express";
import UserController from "./user.controller";
import UserService from "./user.services";
import UserRepository from "./user.repository";
import zodValidate from "../../middleware/zodValidation";
import { createUserZodSchema, updateUserZodSchema } from "./user.zod";

const router = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.post("/", zodValidate(createUserZodSchema), userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", zodValidate(updateUserZodSchema), userController.updateUser);
router.delete("/:id", userController.deleteUser);

export const UserRoutes = router;