import Admin from "../admin/admin-model.js"

export const existeEmail = async(email) =>{
    const existe = await Admin.findOne({email})
    if(existe){
        throw new Error(`El email ${email} ya fue registrado previamente`)
    }
}