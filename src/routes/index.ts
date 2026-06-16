
import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";

const router = Router();

const moduleRoute =[
  {
    path: "/users",
    router: UserRoutes,
  }
]

moduleRoute.forEach((route) => {
  router.use(route.path, route.router);
});


export default router;