import { body, param } from "express-validator"

import { validarCampos } from "./validar-campos.js"
import { validateJWT } from "./valida-jwt.js"
import {handleErrors} from "./handle-errors.js"
import { empresaExist } from "../helpers/db-validator.js"

export const agregarEmpresaValidator = [
    validateJWT,
    body("nombreEmpresa").notEmpty().withMessage("El nombre es requerido"),
    body("tipoDeEmpresa").notEmpty().withMessage("El tipo de empresa es requerido"),
    body("ubicacion").notEmpty().withMessage("La ubicacion es requerida"),
    body("trayectoria").notEmpty().withMessage("La trayectoria es requerida"),
    validarCampos,
    handleErrors  
]

export const updateEmpresaValidator = [
    param("id", "No es un ID válido").isMongoId(),
    param("id").custom(empresaExist),
    validarCampos,
    handleErrors
]