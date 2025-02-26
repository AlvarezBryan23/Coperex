import { body } from "express-validator"
import { validarCampos } from "./validar-campos.js"

export const loginValidator = [
    body("email").optional().isEmail().withMessage("Ingrese un correo válido"),
    body("username").optional().isString().withMessage("Ingrese un username válido"),
    body("password").isLength({min: 8}).withMessage("La contraseña debe tener 8 caracteres"),
    validarCampos
]