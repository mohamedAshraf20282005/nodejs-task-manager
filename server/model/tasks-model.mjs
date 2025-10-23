import {Schema, model} from "mongoose";

const tasksSchema = new Schema({
    taskName:String,
    description:String,
    taskDate:{
        type:Date,
        default:Date.now
    },
    taskId:{
        type:Number,
        default:1
    },
    taskAchievement:{
        type:Boolean,
        default:false
    }
})

const tasksModel = model('Task',tasksSchema);

export default tasksModel;