const express = require('express');
const router = express.Router();
const validatorHandler = require('../../middlewares/validator.handler');
const { addAFriendRequestSchema, getFriendRequestSchema, updateFriendRequestSchema } = require('./schema/friendRequest.schema');
const ControllerFriendRequest = require('./controller.friendsRequest');
const controller = new ControllerFriendRequest();

/**
 * @swagger
 * /api/friend-request:
 *   post:
 *     summary: Envía una solicitud de amistad
 *     description: Envia una solicitud de amistad de un usuario a otro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               username:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Solicitud de amistad enviada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 // Propiedades de la solicitud de amistad enviada
 */
router.post('/', validatorHandler(addAFriendRequestSchema, 'body'), async(req, res, next) => {
    try {
        const {id, username} = req.body;
        const newFriendsRequest = await controller.sendRequest(id, username);
        res.status(201).json(newFriendsRequest);
    } catch(err) {
        next(err);
    }
});

/**
 * @swagger
 * /api/friend-request/{id}:
 *   patch:
 *     summary: Actualiza el estado de una solicitud de amistad
 *     description: Actualiza el estado de una solicitud de amistad (aceptar o rechazar)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la solicitud de amistad
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Estado de la solicitud de amistad actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 // Propiedades de la solicitud de amistad actualizada
 */
router.patch('/:id', validatorHandler(getFriendRequestSchema, 'params'), validatorHandler(updateFriendRequestSchema, 'body'), async(req, res, next) => {
    try {
        const {id} = req.params;
        const {status} = req.body;
        const respondRequest = await controller.updateStatusFriendRequest(id, status);
        res.status(200).json(respondRequest);
    } catch(err) {
        next(err);
    };
});

/**
 * @swagger
 * /api/friend-request/{id}:
 *   delete:
 *     summary: Elimina una solicitud de amistad
 *     description: Elimina una solicitud de amistad basada en su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la solicitud de amistad
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Solicitud de amistad eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 // Propiedades de la solicitud de amistad eliminada
 */
router.delete('/:id', validatorHandler(getFriendRequestSchema, 'params'), async(req, res, next) => {
    try {
        const {id} = req.params;
        const deleteRequest = await controller.deleteRequest(id);
        res.status(200).json(deleteRequest);
    } catch(err) {
        next(err);
    };
});

module.exports = router;
