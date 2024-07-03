import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "please add a name"],
        match: [/^(?!\d+$).{1,}$/, "Name must not be only numbers"]
    },
    email: {  
        type: String,
        required: [true, "Please add an email"],
        unique: true,
        trim: true,
        match: [
            /^(?!\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Please enter a valid email"
        ]
    },
    password:  {
        type: String,
        required: [true, "please add a password"],
        minLength: [6, "Password must be up to 6 characters"],
    },
    photo: {
        type: String,
        required: [true, "please add a photo"],
        default: "https://tse1.mm.bing.net/th?id=OIP.OONzqxQcoTwq0WsIEp_EmQHaHC&pid=Api&P=0&h=220"
    },
    phone: {
        type: String,
        required: [true, "please add a phone number"],
        match: [/^\+?[0-9]+$/, "Phone number must be digits only, with an optional leading '+'"]
    },
    regno: {
        type: String,
    },
    role: {
        type: String,
        default: "member"
    },
    approved: {
        type: String,
        default: "no",
    }
},
{
    timestamps: true,
});

// Encrypt password before saving to DB
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        return next();
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
});

export const User = mongoose.model("User", userSchema);
