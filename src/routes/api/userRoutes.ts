import { Router } from "express";
import {
  addFriend,
  createUser,
  deleteFriend,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../../controllers/userController.js";
const router = Router();

router.route("/").get(getUsers).post(createUser);

router.route("/:userId").get(getUser).put(updateUser).delete(deleteUser);

router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

export { router as userRouter };
