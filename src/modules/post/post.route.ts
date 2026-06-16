import { Router } from "express";
import PostController from "./post.controller";
import PostService from "./post.services";
import PostRepository from "./post.repository";
import zodValidate from "../../middleware/zodValidation";
import { createPostZodSchema, updatePostZodSchema } from "./post.zod";

const router = Router();

const postRepository = new PostRepository();
const postService = new PostService(postRepository);
const postController = new PostController(postService);

router.post("/", zodValidate(createPostZodSchema), postController.createPost);
router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPostById);
router.put("/:id", zodValidate(updatePostZodSchema), postController.updatePost);
router.delete("/:id", postController.deletePost);

export const PostRoutes = router;