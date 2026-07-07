import { Router } from "express";
import CommentController from "./comment.controller";
import CommentService from "./comment.services";
import CommentRepository from "./comment.repository";
import zodValidate from "../../middleware/zodValidation";
import { createCommentZodSchema, updateCommentZodSchema } from "./comment.zod";

const router = Router();

const commentRepository = new CommentRepository();
const commentService = new CommentService(commentRepository);
const commentController = new CommentController(commentService);

router.post("/", zodValidate(createCommentZodSchema), commentController.createComment);
router.get("/", commentController.getAllComments);
router.get("/:id", commentController.getCommentById);
router.put("/:id", zodValidate(updateCommentZodSchema), commentController.updateComment);
router.delete("/:id", commentController.deleteComment);

export const CommentRoutes = router;