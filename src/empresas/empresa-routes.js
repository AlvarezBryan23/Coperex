import { Router } from "express";
import { agregarEmpresaValidator, updateEmpresaValidator } from "../middlewares/empresa-validator.js";
import { saveEmpresa, getEmpresas, getEmpresasListar, updateEmpresa } from "./empresa-controller.js";

const router = Router();

/**
 * @swagger
 * /addEmpresa:
 *   post:
 *     summary: Add a new empresa
 *     tags: [Empresas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreEmpresa:
 *                 type: string
 *               tipoDeEmpresa:
 *                 type: string
 *               industria:
 *                 type: string
 *               ubicacion:
 *                 type: string
 *               phone:
 *                 type: string
 *               trayectoria:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               impacto:
 *                 type: string
 *     responses:
 *       200:
 *         description: Empresa added successfully
 *       500:
 *         description: Error adding empresa
 */
router.post("/addEmpresa", agregarEmpresaValidator, saveEmpresa)

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all empresas
 *     tags: [Empresas]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of empresas to return
 *       - in: query
 *         name: from
 *         schema:
 *           type: integer
 *         description: Number of empresas to skip
 *     responses:
 *       200:
 *         description: List of empresas
 *       500:
 *         description: Error retrieving empresas
 */
router.get("/", getEmpresas)

/**
 * @swagger
 * /list:
 *   get:
 *     summary: List empresas with sorting options
 *     tags: [Empresas]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of empresas to return
 *       - in: query
 *         name: from
 *         schema:
 *           type: integer
 *         description: Number of empresas to skip
 *       - in: body
 *         name: listarOrden
 *         schema:
 *           type: string
 *         description: Sorting criteria
 *     responses:
 *       200:
 *         description: List of empresas with sorting
 *       500:
 *         description: Error retrieving empresas
 */
router.get("/list", getEmpresasListar)

/**
 * @swagger
 * /updateEmpresa/{id}:
 *   put:
 *     summary: Update an existing empresa
 *     tags: [Empresas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the empresa to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreEmpresa:
 *                 type: string
 *               tipoDeEmpresa:
 *                 type: string
 *               industria:
 *                 type: string
 *               ubicacion:
 *                 type: string
 *               phone:
 *                 type: string
 *               trayectoria:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               impacto:
 *                 type: string
 *     responses:
 *       200:
 *         description: Empresa updated successfully
 *       500:
 *         description: Error updating empresa
 */
router.put("/updateEmpresa/:id", updateEmpresaValidator, updateEmpresa)

export default router;