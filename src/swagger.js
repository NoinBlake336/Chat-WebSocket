const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Ejemplo',
      version: '1.0.0',
      description: 'Documentación de la API de Ejemplo',
    },
  },
  apis: ['./components/**/*.js'], // Ruta donde se encuentran las definiciones de tus rutas
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
