import Admin from "../admin/admin-model.js"

export const existeEmail = async(email) =>{
    const existe = await Admin.findOne({email})
    if(existe){
        throw new Error(`El email ${email} ya fue registrado previamente`)
    }
}

export const adminExist = async(id = " ")  =>{
    const existe = await Admin.findById(id)
    if(!existe){
        throw new Error("No existe un admin en la base de datos")
    }
}