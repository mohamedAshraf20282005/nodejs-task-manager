import tasksModel from "../model/tasks-model.mjs";

import statusText from "../util/statusText.mjs";

import tasksValidation from "../validation/tasks-validation.mjs";

const getAllTasks = async (req, res) => {
  try {
    const tasks = await tasksModel.find();

    if (!tasks) return res.status(404).json("No tasks found");

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

    if (!task) return res.status(404).json("Not found");

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
    try{
      const {taskName, description} = req.body;

      const newTask = new tasksModel({
        taskName,
        description
      })

      await newTask.save()
      return res.status(201).json({
        statusText:statusText.SUCCESS, 
        data:newTask
      })
    }catch(err){
        return res.status(500).json({
      statusText: statusText.ERROR,
      message: "Internal server error",
    });
    }
}

export { 
    getAllTasks, 
    getTask,
    createTask
 };
