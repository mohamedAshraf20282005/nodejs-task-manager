import express from 'express';

import {createTask, deleteTask, getAllTasks, getTask, updateTask} from '../controller/tasks-controller.mjs';

const router = express.Router();

router.get('/getAllTasks',getAllTasks)

router.get('/getTask/:taskName',getTask)

router.post('/createTask',createTask)

router.delete('/deleteTask/:taskId',deleteTask)

router.patch('/updateTask/:taskId',updateTask)

export default router;
