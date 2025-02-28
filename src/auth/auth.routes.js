import { Router } from "express";
import { login } from "./auth-controller.js";
import { loginValidator } from "../middlewares/check-validator.js";

const router = Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Iniciar sesión como administrador
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - username
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo electrónico del administrador
 *               username:
 *                 type: string
 *                 description: Nombre de usuario del administrador
 *               password:
 *                 type: string
 *                 description: Contraseña del administrador
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 adminDetails:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *       400:
 *         description: Credenciales inválidas
 *       500:
 *         description: Error al iniciar sesión
 */
router.post("/login", loginValidator, login);

export default router;