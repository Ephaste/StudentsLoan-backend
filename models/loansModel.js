
import mongoose from "mongoose";
const loansSchema = mongoose.Schema({
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
loanOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
loan:{
    type: String,

},
months:{
    type: String,
},
paymentWay:{
    type: String,
},
amount:{
    type: Number,
},
status:{
    type: String,
    default: "pending",
},
},
);
export const Loan =mongoose.model("Loan", loansSchema);