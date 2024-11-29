const express = require('express');


const { swaggerSpec, swaggerUi } = require('./swagger'); // Импортируем настройку Swagger

const app = express();
const port = 3000;

// Подключаем Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Пример эндпоинта с документацией
app.get("/api/v1/getAllTemplate", async (req, res) => {
    /**
     * @swagger
     * tags:
     *   - name: Template
     *     description: API для работы с шаблонами
     *
     * /api/v1/getAllTemplate:
     *   get:
     *     summary: Получить список всех шаблонов
     *     tags:
     *       - Template
     *     responses:
     *       200:
     *         description: Успешная обработка запроса
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 templates:
     *                   type: array
     *                   items:
     *                     type: object
     *                     properties:
     *                       id:
     *                         type: integer
     *                       createdAt:
     *                         type: string
     *                         format: date-time
     *                       updatedAt:
     *                         type: string
     *                         format: date-time
     *       400:
     *         description: Ошибка валидации
     *       500:
     *         description: Внутренняя ошибка сервера
     */
    try {
        // Логика работы с данными, например, получение шаблонов из базы данных
        const templates = await getTemplatesFromDatabase();

        // Возвращаем успешный ответ
        return res.status(200).json({ templates });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Ошибка при получении шаблонов.' });
    }
});

// Пример функции для имитации получения шаблонов из базы данных
async function getTemplatesFromDatabase() {
    return [
        { id: 1, createdAt: new Date(), updatedAt: new Date() },
        { id: 2, createdAt: new Date(), updatedAt: new Date() }
    ];
}

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
