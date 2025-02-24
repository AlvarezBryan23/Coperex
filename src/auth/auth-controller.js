import Admin from "../admin/admin-model.js"
import { hash, verify } from "argon2"
import { generateJWT } from "../helpers/generate-jwt.js"

export const register = async(req, res) =>{
    try{
        const data = req.body

        const encryptedPassword = await hash(data.password)

        data.password = encryptedPassword

        const admin = await Admin.create(data)
        return res.status(201).json({
            message: "Admin has been, registered",
            name: admin.name,
            surname: admin.surname,
            email: admin.email
        })
    }catch(err){
        return res.status(500).json({
            message: "Admin restration failed",
            error: err.message
        })
    }
}

export const login = async(req, res) =>{
    const {email, username, password} = req.body
    try{
        const admin = await Admin.findOne({
            $or: [{email: email}, {username: username}]
        })

        if(!admin){
            return res.status(400).json({
                message: "Credenciales inválidas",
                error: "Username o email no existe"
            })
        }

        const validPassword = await verify(admin.password, password)

        if(!validPassword){
            return res.status(400).json({
                message: "Credenciales inválidas",
                error: "Contraseña incorrecta"
            })
        }

        const token = await generateJWT(admin.id)

        return res.status(200).json({
            message: "Inicio de sesión exitoso",
            adminDetails:{
                token: token
            }
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al iniciar sesión",
            error: err.message
        })
    }
}