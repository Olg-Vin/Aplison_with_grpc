/**
 * DTO (Data Transfer Object) для описания структуры данных Template.
 * Используется для описания входных и выходных данных.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Template:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Уникальный идентификатор шаблона
 *           example: 1
 *         name:
 *           type: string
 *           description: Название шаблона
 *           example: My Template
 *         author:
 *           type: string
 *           description: Автор шаблона
 *           example: JohnDoe
 *         content:
 *           type: string
 *           description: Содержимое шаблона
 *           example: This is the content of the template.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Дата создания
 *           example: 2023-01-01T12:00:00Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Дата обновления
 *           example: 2023-01-02T12:00:00Z
 */
