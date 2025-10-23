import {object,string} from 'yup';

const tasksValidation = object({
    taskName:string().required(),
    description:string(),
})

export default tasksValidation;