import express from 'express';

import {createTask, getAllTasks, getTask} from '../controller/tasks-controller.mjs';

const router = express.Router();

router.get('/getAllTasks',getAllTasks)

router.get('/getTask/:taskName',getTask)

router.post('/createTask',createTask)

export default router;
