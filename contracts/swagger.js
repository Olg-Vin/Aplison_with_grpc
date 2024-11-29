const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Определение настроек Swagger
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Template API', // Название вашего API
            version: '1.0.0', // Версия API
            description: 'API для управления шаблонами', // Описание API
        },
        tags: [
            {
                name: 'Template',
                description: 'API для работы с шаблонами'
            }
        ],
        responses: {
            200: {
                description: 'Успешная обработка запроса'
            },
            400: {
                description: 'Ошибка валидации'
            },
            404: {
                description: 'Ресурс не найден'
            },
            500: {
                description: 'Внутренняя ошибка сервера'
            }
        }
    },
    apis: ['./src/controllers/*.js'], // Путь к вашим контроллерам, где будет написана документация
};

// Создание swagger спецификации
const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = { swaggerSpec, swaggerUi };
