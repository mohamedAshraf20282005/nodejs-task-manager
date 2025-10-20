import {object,string,number} from 'yup';

const tasksValidation = object({
    taskName:string().required(),
    description:string(),
    taskId:number().required(),
})

export default tasksValidation;