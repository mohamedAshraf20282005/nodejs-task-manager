import {Schema, model} from "mongoose";

const RateSchema = Schema({
    rate:String
})

const userModel = model('Rate', RateSchema);

export default userModel;