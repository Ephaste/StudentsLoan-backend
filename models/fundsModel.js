
import mongoose from "mongoose";
const fundsSchema = mongoose.Schema({
name: {
        type: String,
        required: [true, "please add a name"]
    },
regno:{
    type: String,
    // minLength: [10, "Id mus be over 10 charcters"],
    // maxLength: [30, "Password must be more than 30 characters"],
},
shares:{
    type: Number,
    required: [true, "please add shares"]

},
fundOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },

phone: String,
amount:{
    type: Number,
    required: true,
},
received:{
    type: String,
    default: "no",
},
},
);
export const Fund = mongoose.model("Fund", fundsSchema);