import { Router } from "express";
import {
  addReaction,
  createThought,
  deleteReaction,
  deleteThought,
  getThought,
  getThoughts,
  updateThought,
} from "../../controllers/thoughtController.js";

const router = Router();

router.route("/").get(getThoughts).post(createThought);

router
  .route("/:thoughtId")
  .get(getThought)
  .put(updateThought)
  .delete(deleteThought);

router.route("/:thoughtId/reactions").post(addReaction);
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

export { router as thoughtRouter };
