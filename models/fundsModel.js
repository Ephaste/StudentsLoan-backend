
import mongoose from "mongoose";
const fundsSchema = mongoose.Schema({
name: {
        type: String,
        required: [true, "please add a name"]
    },
nId:{
    type: String,
    // minLength: [10, "Id mus be over 10 charcters"],
    // maxLength: [30, "Password must be more than 30 characters"],
    default: "2000"
},
shares:{
    type: String,
    required: [true, "please add shares"]

},
number: String,
amount:{
    type: String,
    required: true,
},
},
);
export const Funds = mongoose.model("Funds", fundsSchema);