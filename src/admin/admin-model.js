import { Schema, model } from "mongoose";

const adminSchema = Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
        maxLength:[30, "Name cannot exced 30 characters"]
    },
    surname: {
        type: String,
        required: [true, "Surname is required"],
        maxLength: [30, "Name cannot exced 30 characters"]
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minLength: 8
    },
    email:{
        type: String,
        required: [true, "Email is required"]
    },
    phone:{
        type: String,
        required: true,
        minLength: 8,
        maxLength: 8
    },
    role:{
        type: String,
        required: true,
        enum: ["ADMIN_ROLE"],
        default: "ADMIN_ROLE"
    },
    status:{
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timeStamps: true
})

adminSchema.methods.toJSON = function(){
    const {password, _id, ...admin} = this.toObject()
    admin.uid = _id
    return admin
}

export default model("Admin", adminSchema)