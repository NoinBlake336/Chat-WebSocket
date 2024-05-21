const express = require('express');
const router = express.Router();
const { getMessageSchema, createMessageSchema, updateMessageSchema } = require('./schema/message.schema');
const ControllerMessage = require('./controller.message');
const validatorHandler = require('../../middlewares/validator.handler');
const controller = new ControllerMessage();

/**
 * @swagger
 * /api/message:
 *   get:
 *     summary: Obtiene todos los mensajes
 *     description: Retorna una lista de todos los mensajes
 *     responses:
 *       '200':
 *         description: Lista de mensajes
 */
router.get('/', async(req, res, next) => {
    try {
        const messages = await controller.find();
        res.status(200).json(messages);
    } catch(err) {
        next(err);
    }
});

/**
 * @swagger
 * /api/message/{id}:
 *   get:
 *     summary: Obtiene un mensaje por ID
 *     description: Retorna un mensaje basado en su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del mensaje
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Mensaje encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 // Propiedades del mensaje
 *       '404':
 *         description: Mensaje no encontrado
 */
router.get('/:id', validatorHandler(getMessageSchema, 'params'), async(req, res, next) => {
    try {
        const {id} = req.params;
        const message = await controller.findOne(id);
        res.status(200).json(message);
    } catch(err) {
        next(err);
    }
});

/**
 * @swagger
 * /api/message:
 *   post:
 *     summary: Crea un nuevo mensaje
 *     description: Crea un nuevo mensaje con los datos especificados
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *               message:
 *                 type: string
 *               chat:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Mensaje creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 // Propiedades del mensaje creado
 */
router.post('/', validatorHandler(createMessageSchema, 'body'), async(req, res, next) => {
    try {
        const {user, message, chat} = req.body;
        const newMessage = await controller.create(user, message, chat); 
        res.status(201).json(newMessage);
    } catch(err) {
        next(err);
    }
});

/**
 * @swagger
 * /api/message/{id}:
 *   patch:
 *     summary: Actualiza un mensaje por ID
 *     description: Actualiza un mensaje basado en su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del mensaje
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Propiedades a actualizar del mensaje
 *     responses:
 *       '201':
 *         description: Mensaje actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 // Propiedades del mensaje actualizado
 */
router.patch('/:id', validatorHandler(getMessageSchema, 'params'), validatorHandler(updateMessageSchema, 'body'), async(req, res, next) => {
    try {
        const {id} = req.params;
        const body = req.body;
        const updateMessage = await controller.update(id, body);
        res.status(201).json(updateMessage); 
    } catch(err) {
        next(err);
    }
});

/**
 * @swagger
 * /api/message/{id}:
 *   delete:
 *     summary: Elimina un mensaje por ID
 *     description: Elimina un mensaje basado en su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del mensaje
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Mensaje eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 // Propiedades del mensaje eliminado
 */
router.delete('/:id', validatorHandler(getMessageSchema, 'params'), async(req, res, next) => {
    try {
        const {id} = req.params;
        const deleteMessage = await controller.delete(id);
        res.status(200).json(deleteMessage);
    } catch(err) {
        next(err);
    }
});

module.exports = router;
