import express from 'express';
import { getUser, updateUser } from '../controllers/userController.js';
import { uploadProfileImage } from '../middleware/uploadMiddleware.js';
import { handleUploadError } from '../middleware/errorHandler.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Manage user profile
 *
 * /api/users/{id}:
 *   get:
 *     summary: Get details of a single user (me)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   put:
 *     summary: Update an existing user (email cannot be changed, supports image upload)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User name (optional)
 *                 example: "Updated Name"
 *               age:
 *                 type: number
 *                 description: User age (optional)
 *                 example: 30
 *               profileImage:
 *                 type: string
 *                 format: binary
 *                 description: "Profile image file (optional, max 1MB, allowed: jpeg, jpg, png, gif, webp). Old image will be automatically deleted."
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdateInput'
 *           example:
 *             name: "Updated Name"
 *             age: 30
 *             profileImage: "https://example.com/new-avatar.jpg"
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request - validation error or file upload error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

router.get('/:id', getUser);
router.put('/:id', uploadProfileImage, handleUploadError, updateUser);

export default router;



