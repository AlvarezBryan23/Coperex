import jwt from "jsonwebtoken"
import Admin from "../admin/admin-model.js"

export const validateJWT = async(req, res, next) =>{
    try{
        let token = req.body.token || req.query.token || req.headers["authorization"]

        if(!token){
            return res.status(400).json({
                success: false,
                message: "No existe token en la validación"
            })
        }

        token = token.replace(/^Bearer\s+/, "")

        const { uid } = jwt.verify(token, process.env.SECRET_KEY)

        const admin = await Admin.findById(uid)

        if(!admin){
            return res.status(400).json({
                success: false,
                message: "El admin no existe en la base de datos"
            })
        }

        if(admin.status === false){
            return res.status(400).json({
                success: false,
                message: "El admin esta"
            })
        }

        req.admin = admin,
        next()
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al validar el token",
            error: err.message
        })
    }
}