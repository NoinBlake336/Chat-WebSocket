const express = require('express');
const router = express.Router();
const validatorHandler = require('../../middlewares/validator.handler');
const { getChatSchema } = require('./schema/chats.schema'); 
const ControllerChat = require('./controller.chats');
const controller = new ControllerChat();

/**
 * @swagger
 * /api/chat/{id}:
 *   get:
 *     summary: Obtiene un chat por ID
 *     description: Retorna un chat basado en su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del chat
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Chat encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 // Propiedades del chat
 *       '404':
 *         description: Chat no encontrado
 */
router.get('/:id', validatorHandler(getChatSchema, 'params'), async(req, res, next) => {
    try {
        const {id} = req.params;
        const getChat = await controller.findOne(id);
        res.status(200).json(getChat);
    } catch(err) {
        next(err);
    };
});

/**
 * @swagger
 * /api/chat:
 *   post:
 *     summary: Crea un nuevo chat
 *     description: Crea un nuevo chat con los usuarios especificados
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *               member:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Chat creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 // Propiedades del chat creado
 */
router.post('/', async(req, res, next) => {
    try {
        const {user, member} = req.body;
        const newChat = await controller.create(user, member);
        res.status(201).json(newChat);
    } catch(err) {
        next(err);
    };
});

module.exports = router;
