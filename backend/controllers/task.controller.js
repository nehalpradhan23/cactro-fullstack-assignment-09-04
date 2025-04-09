import jwt from "jsonwebtoken";
import Task from "../models/Task.js";

export async function createTask(req, res) {
  try {
    const { title, description, status = "pending" } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Title required" });
    }
    // find user
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ error: "User not logged in or cannot find token" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res
        .status(401)
        .json({ error: "Unauthorized - Invalid token or cannot find user" });
    }

    console.log("creating task");

    const newTask = await Task.create({
      title,
      description,
      status: status || "pending",
      createdBy: decoded.newUserId,
    });
    if (newTask) {
      return res.status(201).json({
        success: true,
        message: "Task created successfully",
        task: newTask,
      });
    } else {
      return res
        .status(400)
        .json({ success: false, error: "Cannot create Task" });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error creating task",
      error: error.message,
    });
  }
}

export async function getAllTask(req, res) {
  try {
    // find user
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ error: "User not logged in or cannot find token" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res
        .status(401)
        .json({ error: "Unauthorized - Invalid token or cannot find user" });
    }

    // find all user tasks
    const userTasks = await Task.find({ createdBy: decoded.newUserId });

    if (userTasks) {
      return res.status(200).json({
        success: true,
        message: "Tasks fetched successfully",
        userTasks,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Error fetching all tasks",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch all tasks",
      error: error.message,
    });
  }
}

export async function deleteTask(req, res) {
  try {
    const { taskId } = req.params;

    if (!taskId) {
      return res.status(400).json({ error: "Task ID is required" });
    }

    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      task: deletedTask,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete task",
      error: error.message,
    });
  }
}

export async function updateTask(req, res) {
  try {
    const { taskId } = req.params;
    const { title, description, status } = req.body;

    if (!taskId) {
      return res
        .status(400)
        .json({ success: false, error: "Task ID is required" });
    }

    const updatedFields = {};
    if (title) updatedFields.title = title;
    if (description) updatedFields.description = description;
    if (status) updatedFields.status = status;

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { $set: updatedFields },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update task",
      error: error.message,
    });
  }
}
