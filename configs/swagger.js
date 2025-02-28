import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Administracion de Coperex API",
            version: "1.0.0",
            description: "API para los administradores para generar empresas y guardarlas con excel",
            contact: {
                name: "Bryan Alvarez",
                email: "balvarez-2023244@kinal.edu.gt"
            }
        },
        servers: [
            {
                url: "http://localhost:3007/Coperex/v1" // Asegúrate de que el puerto sea correcto
            }
        ]
    },
    apis: [
        "./src/auth/*.js",
        "./src/empresas/*.js",
    ]
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export { swaggerDocs, swaggerUi };