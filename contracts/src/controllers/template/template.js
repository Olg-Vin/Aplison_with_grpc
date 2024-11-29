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
app.get("/api/v1/getAllTemplate1", async (req, res) => {
    // Реализация эндпоинта
});
