import express from 'express';
import { signUp, signIn, resetPassword } from '../controllers/authController.js';
import { uploadProfileImage } from '../middleware/uploadMiddleware.js';
import { handleUploadError } from '../middleware/errorHandler.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication
 *
 * /api/auth/signup:
 *   post:
 *     summary: Sign up a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *           example:
 *             email: "john.doe@example.com"
 *             password: "password123"
 *             name: "John Doe"
 *             age: 28
 *             profileImage: "https://example.com/avatar.jpg"
 *     responses:
 *       201:
 *         description: User signed up successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 token:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request - validation error
 *
 * /api/auth/signin:
 *   post:
 *     summary: Sign in an existing user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *           example:
 *             email: "john.doe@example.com"
 *             password: "password123"
 *     responses:
 *       200:
 *         description: User signed in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 token:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request - validation error
 *       401:
 *         description: Invalid credentials
 *
 * /api/auth/reset-password:
 *   post:
 *     summary: Reset password with email and new password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *           example:
 *             email: "john.doe@example.com"
 *             password: "newpassword123"
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Bad request - validation error
 *       404:
 *         description: User not found
 */

router.post('/signup', uploadProfileImage, handleUploadError, signUp);
router.post('/signin', signIn);
router.post('/reset-password', resetPassword);

export default router;



