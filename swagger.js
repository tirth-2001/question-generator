const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./controller/**/*.js']

const doc = {
    info: {
        version: '2.0.1',
        title: `Question Generator API`,
        description: 'API Documentation',
    },
    host: 'localhost:8080',
    basePath: '/',
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [{
        name: 'Question',
        description: 'Endpoints',
    }, ],

    definitions: {
        User: {
            question: 'What is the speed of light',
            subject: 'Physics',
            topic: 'Waves',
            difficulty: 'Easy',
            marks: 5,
        },
    },
}

swaggerAutogen(outputFile, endpointsFiles, doc)