import { body, param } from "express-validator"

import { validarCampos } from "./validar-campos.js"
import { validateJWT } from "./valida-jwt.js"
import {handleErrors} from "./handle-errors.js"

export const agregarEmpresaValidator = [
    validateJWT,
    body("nombreEmpresa").notEmpty().withMessage("El nombre es requerido"),
    body("tipoDeEmpresa").notEmpty().withMessage("El tipo de empresa es requerido"),
    body("ubicacion").notEmpty().withMessage("La ubicacion es requerida"),
    body("email").notEmpty().withMessage("El email es requerido"),
    body("email").isEmail().withMessage("No es un correo válido"),
    body("trayectoria").notEmpty().withMessage("La trayectoria es requerida"),
    validarCampos,
    handleErrors  
]