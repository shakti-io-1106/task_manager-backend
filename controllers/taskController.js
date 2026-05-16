import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    //Validation
    if (!title) {
      return res.status(400).json({
        message: "Title is required",
      });
    }
    const task = await Task.create({
      title,
      description,
      user: req.user._id,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user._id,
    });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    //check ownership
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    //Update Fields
    task.title = title || task.title;
    task.description = description || task.description;

    if (completed !== undefined) {
      task.completed = completed;
    }

    //Save Updated Task
    const updatedTask = await task.save();
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    //Find Task
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task Not Found." });
    }

    //check ownership
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not Authorized.",
      });
    }

    await task.deleteOne();

    return res.status(200).json({
      message: "Task Deleted Successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
