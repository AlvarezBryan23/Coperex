import xlsx from 'xlsx';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

class ReportesExcel {
    constructor() {
        // Establecer el directorio de salida en 'saveReportes' dentro del directorio principal del proyecto
        this.outputDir = path.join(__dirname, '../../saveReportes');
        
        // Verificar si el directorio de salida existe, y crearlo si no existe
        if (!fs.existsSync(this.outputDir)) {
            fs.mkdirSync(this.outputDir);
        }
    }

    generateExcel(data, fileName) {
        // Convertir los datos a una hoja de cálculo
        const ws = xlsx.utils.json_to_sheet(data);
        
        // Crear un nuevo libro de trabajo y agregar la hoja de cálculo
        const wb = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');

        // Generar la ruta del archivo para el archivo Excel
        const filePath = path.join(this.outputDir, `${fileName}.xlsx`);
        
        // Escribir el libro de trabajo en el archivo
        xlsx.writeFile(wb, filePath);

        return filePath;
    }

    openExcel(filePath) {
        // Ejecutar un comando de shell para abrir el archivo Excel
        exec(`start excel "${filePath}"`, (err) => {
            if (err) {
                console.error('Error al abrir el archivo:', err);
            }
        });
    }

    generateAndOpenExcel(data, fileName) {
        // Generar el archivo Excel y obtener la ruta del archivo
        const filePath = this.generateExcel(data, fileName);
        
        // Abrir el archivo Excel generado
        this.openExcel(filePath);
    }
}

export default ReportesExcel;
