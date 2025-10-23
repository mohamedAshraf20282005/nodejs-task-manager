import tasksModel from "../model/tasks-model.mjs";

import statusText from "../util/statusText.mjs";

import tasksValidation from "../validation/tasks-validation.mjs";

const getAllTasks = async (req, res) => {
  try {
    const tasks = await tasksModel.find();

    if (!tasks || tasks.length == 0)
      return res
        .status(404)
        .json({ statusText: statusText.FAILD, message: "Not Found" });

    return res.status(200).json({
      statusText: statusText.SUCCESS,
      data: tasks,
    });
  } catch (err) {
    return res.status().json({
      statusText: statusText.ERROR,
      message: "Internal server error",
    });
  }
};

const getTask = async (req, res) => {
  try {
    const taskName = req.params.taskName;
    const task = await tasksModel.findOne({ taskName });

    if (!task)
      return res
        .status(404)
        .json({ statusText: statusText.FAILD, message: "Not Found" });

    return res.status(200).json({
      statusText: statusText.SUCCESS,
      data: task,
    });
  } catch (err) {
    return res.status(500).json({
      statusText: statusText.ERROR,
      message: "Internal server error",
    });
  }
};

const createTask = async (req, res) => {
  try {
    const { taskName, taskId, description } = req.body;

    //input values validation
    await tasksValidation.validate(req.body, { strict: true });

    // Find Last Task For Auto Increment To TaskId
    const lastTask = await tasksModel.findOne().sort({ taskId: -1 });

    // check if laskTask is found
    const isFound = lastTask ? lastTask.taskId + 1 : 1;

    const newTask = new tasksModel({
      taskName,
      taskId: isFound,
      description,
    });

    await newTask.save();
    return res.status(201).json({
      statusText: statusText.SUCCESS,
      data: newTask,
    });
  } catch (err) {
    return res.status(500).json({
      statusText: statusText.ERROR,
      message: "Internal server error",
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const task = await tasksModel.findOne({ taskId });

    if (!task)
      return res
        .status(404)
        .json({ statusText: statusText.FAILD, message: "Not Found" });

    await task.deleteOne();
    return res.status(200).json({
      statusText: statusText.SUCCESS,
      message: "Task deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      statusText: statusText.ERROR,
      message: "Internal server error",
    });
  }
};

const updateTask = async (req, res) => {
  try {

    await tasksValidation.validate(req.body, { strict: true });

    const taskId = req.params.taskId;
    
    const task = await tasksModel.findOne({ taskId });

    if (!task)
      return res
        .status(404)
        .json({ statusText: statusText.SUCCESS, message: "Not Found" });

    await task.updateOne({
      taskName: req.body.taskName,
      description: req.body.description,
    });

    const updatedTask = await tasksModel.findOne({ taskId });

    return res
      .status(200)
      .json({ statusText: statusText.SUCCESS, data: updatedTask });
  } catch (err) {
    return res.status(500).json({
      statusText: statusText.ERROR,
      message: "Internal server error",
    });
  }
};

export { getAllTasks, getTask, createTask, deleteTask, updateTask };
