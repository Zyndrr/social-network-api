import { Request, Response } from "express";
import { Thought, User } from "../models/index.js";
import { AnyObject, ObjectId } from "mongoose";

export const getThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    res.status(200).json(thoughts);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    res.status(200).json(thought);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createThought = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const thought: AnyObject = await Thought.create({
      ...req.body,
      username: user.username,
    });
    const thoughtId: ObjectId = thought._id;
    user.thoughts.push(thoughtId);
    await user.save();
    return res.status(200).json(thought);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const updateThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      req.body,
      { new: true }
    );
    res.status(200).json(thought);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteThought = async (req: Request, res: Response) => {
  try {
    await Thought.findByIdAndDelete(req.params.thoughtId);
    res.status(200).json("Thought deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const addReaction = async (req: Request, res: Response) => {
  const user = await User.findById(req.body.userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: { ...req.body, username: user._id } } },
      { new: true }
    );
    return res.status(200).json(thought);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );
    res.status(200).json(thought);
  } catch (error) {
    res.status(500).json(error);
  }
};
