const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Chat API',
      version: '1.0.0',
      description: 'Documentacion de Chat Online ',
    },
  },
  apis: ['./src/components/**/*.js'], // Ruta donde se encuentran las definiciones de tus rutas
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
