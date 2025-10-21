import express from 'express';

import connectionDb from './connectionDb.mjs';

import tasksRouter from './server/router/tasks-router.mjs';

import cors from 'cors'

const app = express();
const port = 4001;

app.use(express.json())

app.use('/', tasksRouter)

const start = async  () => {
    try{  
        await connectionDb() 
        app.listen(port,console.log("Server Is Working"))
    }catch(err){
        console.log(err)
    }
}

start()