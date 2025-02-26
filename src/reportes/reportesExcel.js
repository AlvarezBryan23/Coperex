import ExcelJS from 'exceljs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));

export const generateExcel = async (empresas) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Empresas');

    // Agregar encabezados
    worksheet.columns = [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Nombre', key: 'nombre', width: 30 },
        { header: 'Estado', key: 'estado', width: 10 },
    ];

    // Agregar filas
    empresas.forEach(empresa => {
        worksheet.addRow({
            id: empresa._id,
            nombre: empresa.nombre,
            estado: empresa.status ? 'Activo' : 'Inactivo'
        });
    });

    // Crear la carpeta si no existe
    const dir = join(CURRENT_DIR, 'reportesExcel');
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }

    // Guardar el archivo
    const filePath = join(dir, `empresas_${Date.now()}.xlsx`);
    await workbook.xlsx.writeFile(filePath);

    return filePath;
};