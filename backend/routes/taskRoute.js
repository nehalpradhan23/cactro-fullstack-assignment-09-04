import express from "express";
import {
  createTask,
  deleteTask,
  getAllTask,
  updateTask,
} from "../controllers/task.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const taskRouter = express.Router();

taskRouter.post("/createTask", protectRoute, createTask);
taskRouter.get("/getAllTasks", protectRoute, getAllTask);
taskRouter.delete("/deleteTask/:taskId", protectRoute, deleteTask);
taskRouter.put("/updateTask/:taskId", protectRoute, updateTask);

export default taskRouter;
