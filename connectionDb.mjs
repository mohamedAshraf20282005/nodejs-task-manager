import mongoose from "mongoose";

import 'dotenv/config'

const connectionDb =  
     mongoose.connect(process.env.MONGO_URL).then( () => console.log("Db Is Working"))

export default connectionDb;
    