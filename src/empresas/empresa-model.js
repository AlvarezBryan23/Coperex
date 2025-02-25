import { Schema, model} from "mongoose";

const empresaSchema = Schema({
    nombreEmpresa:{
        type: String,
        required: [true, "Name is required"],
        maxLength: [30, "Name cannot exced 30 characters"]
    },
    tipoDeEmpresa:{
        type: String,
        required: [true, "El tipo es requerido"],
        maxLength: [25, "El tipo de empresa no puede exceder los 25 caracteres"]
    },
    industria:{
        type:String,
        required: true,
        unique: true
    },
    ubicacion:{
        type: String,
        required: true,
        unique: true
    },
    email: {
        type:String,
        required: [true, "Email is required"],
        unique: true
    },
    phone: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 8
    },
    trayectoria:{
        type: String,
        required: [true, "trayectoria is required"],
        unique: true
    },
    descripcion:{
        type:String,
        required: [true, "La descripcion es requerida"],
        maxLength: [200, "La descripcion no puede exceder los 200 caracteres"]
    },
    keep:{
        type: Schema.Types.ObjectId,
        ref: 'admin',
        default: true
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

export default model("Empresa", empresaSchema)