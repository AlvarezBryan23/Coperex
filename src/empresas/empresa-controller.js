"use strict"

import Empresas from "../empresas/empresa-model.js"
import { generateExcel} from "../reportes/reportesExcel.js"
import path from "path"

export const saveEmpresa = async(req, res) =>{
    try{
        const data = req.body
        
        const empresa = new Empresas({
            ...data,
           
        })

        await empresa.save();

        res.status(200).json({
            success: true,
            empresa
        })

    }catch(err){
        res.status(500).json({
            success: false,
            message: "Error al guardar la empresa",
            err
        })
    }
}

export const getEmpresas = async(req, res) =>{
    try{
        const {limit = 0, from = 0} = req.query
        const query = {status: true}

        const [ total, empresas ] = await Promise.all([
            Empresas.countDocuments(query),
            Empresas.find(query)
                    .skip(Number(from))
                    .skip(Number(limit))
        ])

        const filePath = await generateExcel(empresas);

        return res.status(200).json({
            success: true,
            total,
            empresas,
            filePath: `/reportesExcel/${path.basename(filePath)}`
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al listar las empresas",
            error: err.message
        })
    }
}

export const getEmpresasListar = async (req, res) => {
    const { limite = 5, desde = 0, filtro = '', orden} = req.query;
    const query = { status: true }

    // Validar y establecer el valor de orden
    const sortOrder = orden === '' ? -1 : 1;

    switch (filtro) {
        case 'trayectoria':
            query.trayectoria = { $exists: true };
            break;
        case 'tipoDeEmpresa':
            query.tipoDeEmpresa = { $exists: true };
            break;
        default:
            break;
    }

    const sort = { nombreEmpresa: sortOrder };

    try {
        const empresas = await Empresas.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .sort(sort);

        const total = await Empresas.countDocuments(query);

        res.status(200).json({
            success: true,
            total,
            empresas,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener las empresas',
            error: error.message
        });
    }
};