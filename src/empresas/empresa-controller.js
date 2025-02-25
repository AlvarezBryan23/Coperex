"use strict"

import Empresas from "../empresas/empresa-model.js"
import Admin from "../admin/admin-model.js"

export const saveEmpresa = async(req, res) =>{
    try{
        const data = req.body
        const admin = await Admin.findOne({id: data._id});

        if(!admin){
            return res.status(404).json({
                success: false,
                message: "Admin no encontrado"
            });
        }

        const empresa = new Empresas({
            ...data,
            keep: admin._id
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

        return res.status(200).json({
            success: true,
            total,
            empresas
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al listar las empresas",
            error: err.message
        })
    }
}