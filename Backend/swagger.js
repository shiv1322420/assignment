const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Users API',
      version: '1.0.0',
      description: 'A simple API for managing records',
    },
  },
  apis: ['./routes/*.js'],
};

module.exports = swaggerJSDoc(options);
