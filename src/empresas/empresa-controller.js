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
    try {
        const { limit = 2, from = 0} = req.query;
        const query = { status: true };

        const [total, empresas] = await Promise.all([
            Empresas.countDocuments(query),
            Empresas.find(query)
                .skip(Number(from))
                .limit(Number(limit))
        ]);

        const filePath = await generateExcel(empresas);

        return res.status(200).json({
            success: true,
            total,
            empresas,
            filePath: `/reportesExcel/${path.basename(filePath)}`
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al listar las empresas",
            error: err.message
        });
    }
}


export const getEmpresasListar = async (req, res) => {
    try {
        const { limit = 10, from = 0 } = req.query;
        const { listarOrden } = req.body; // Recibe el criterio de orden desde raw o form-data
        const query = { status: true };

        let ordenOptions = {}; // Objeto para definir el ordenamiento

        switch (listarOrden) {
            case 'trayectoria': 
            ordenOptions = { trayectoria: -1 }; // Ordena por trayectoria (descendente)
                break;
            case 'tipoDeEmpresa': 
            ordenOptions = { tipoDeEmpresa: 1 }; // Ordena por tipo de empresa (ascendente)
                break;
            case 'A-Z': 
            ordenOptions = { nombreEmpresa: 1 }; // Ordena por nombre (A-Z)
                break;
            case 'Z-A': 
            ordenOptions = { nombreEmpresa: -1 }; // Ordena por nombre (Z-A)
                break;
            default: 
            ordenOptions = { createdAt: -1 }; // Orden por defecto (más recientes primero)
        }

        const [total, empresas] = await Promise.all([
            Empresas.countDocuments(query),
            Empresas.find(query)
                .sort(ordenOptions) // Aplica la ordenación
                .skip(Number(from))
                .limit(Number(limit))
        ]);

        return res.status(200).json({
            success: true,
            total,
            empresas
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al listar las empresas",
            error: err.message
        });
    }
};

export const updateEmpresa = async(req, res) =>{
    try{
        const {id} = req.params
        const data = req.body

        const empresa = await Empresas.findByIdAndUpdate(id, data, {new: true})

        res.status(200).json({
            success: true,
            message: "Tu empresa se actualizo",
            empresa
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Error a actualizar la empresa",
            error: err.message
        })
    }
}