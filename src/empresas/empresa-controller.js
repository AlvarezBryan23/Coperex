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