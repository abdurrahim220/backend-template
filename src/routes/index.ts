import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { PostRoutes } from "../modules/post/post.route";

const router = Router();

const moduleRoute = [
  {
    path: "/users",
    router: UserRoutes,
  },
  {
    path: "/posts",
    router: PostRoutes,
  },
];

moduleRoute.forEach((route) => {
  router.use(route.path, route.router);
});

export default router;
