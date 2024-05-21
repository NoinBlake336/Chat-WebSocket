const express = require('express');
const { getUserSchema, updateUserSchema, createUserSchema } = require('./schema/user.schema');
const ControllerUser = require('./controller.user');
const validatorHandler = require('../../middlewares/validator.handler');
const controller = new ControllerUser();
const router = express.Router();

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     description: Retorna un usuario basado en su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 // Propiedades del usuario
 *       '404':
 *         description: Usuario no encontrado
 */
router.get('/:id', validatorHandler(getUserSchema, 'params'), async(req, res, next) => {
    try {
        const {id} = req.params;
        const user = await controller.findOne(id);
        res.status(200).json(user);
    } catch(err) {
        next(err);
    };
});

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Crea un nuevo usuario
 *     description: Crea un nuevo usuario con los datos especificados
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               username:
 *                 type: string
 *               image:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 // Propiedades del usuario creado
 */
router.post('/', validatorHandler(createUserSchema, 'body'), async(req, res, next) => {
    try {
        const body = req.body;
        const {name, username, image, email, password} = body;
        const newUser = await controller.create(name, username, image, email, password);
        res.status(201).json(newUser);
    } catch(err) {
        next(err);
    };
});

/**
 * @swagger
 * /api/user/{id}:
 *   patch:
 *     summary: Actualiza un usuario por ID
 *     description: Actualiza un usuario basado en su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Propiedades a actualizar del usuario
 *     responses:
 *       '201':
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 // Propiedades del usuario actualizado
 */
router.patch('/:id', validatorHandler(getUserSchema, 'params'), validatorHandler(updateUserSchema, 'body'), async(req, res, next) => {
    try {
        const {id} = req.params;
        const body = req.body;
        const updateUser = await controller.update(id, body);
        res.status(201).json(updateUser);
    } catch(err) {
        next(err);
    };
});

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Elimina un usuario por ID
 *     description: Elimina un usuario basado en su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Usuario eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 // Propiedades del usuario eliminado
 */
router.delete('/:id', validatorHandler(getUserSchema, 'params'), async(req, res, next) => {
    try {
        const {id} = req.params;
        const deleteUser = await controller.delete(id);
        res.status(200).json(deleteUser);
    } catch(err) {
        next(err);
    };
});

module.exports = router;
