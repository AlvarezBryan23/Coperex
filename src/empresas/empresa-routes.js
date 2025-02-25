import { Router } from "express";
import { agregarEmpresaValidator } from "../middlewares/empresa-validator.js";
import { saveEmpresa, getEmpresas } from "./empresa-controller.js";

const router = Router();

router.post("/addEmpresa", agregarEmpresaValidator, saveEmpresa)

router.get("/", getEmpresas)

export default router;