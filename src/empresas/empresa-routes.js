import { Router } from "express";
import { agregarEmpresaValidator } from "../middlewares/empresa-validator.js";
import { saveEmpresa } from "./empresa-controller.js";

const router = Router();

router.post("/addEmpresa", agregarEmpresaValidator, saveEmpresa)

export default router;