const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {config} = require('../../config/config');

/**
 * @swagger
 * /api/auth:
 *   post:
 *     summary: Autentica a un usuario
 *     description: Inicia sesión de un usuario y genera un token de autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Usuario autenticado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: string
 *                 token:
 *                   type: string
 *       '401':
 *         description: Credenciales incorrectas
 */
router.post('/', passport.authenticate('local',{session:false}), async(req,res,next) => {
    try {
        const user = req.user;
        const payload = { sub: user.id };
        const token = jwt.sign(payload, config.secretKey, { expiresIn: '7min' });
        res.status(201).json({ user: user.id, token: token });
    } catch(err) {
        next(err);
    }
});

module.exports = router;
