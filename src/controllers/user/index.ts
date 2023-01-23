import { Router } from 'express'

import auth from "../../middlewares/auth"
import login from './login'
import signup from './signup'
import getCurrentUser from './getCurrentUser'
import editUser from './editUser'
import changePassword from './changePassword'
import deleteUser from './deleteUser'

export const userRouter = Router()


/**
 * @swagger
 * components:
 *  securitySchemes:
 *    userBearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    adminBearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 */


/**
 * @swagger
 * tags:
 * - name: User
 *   description: User routes
 */



/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     tags:
 *       - User
 *     summary: Sign up user
 *     description: Sign up user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *               - name
 *     responses:
 *       200:
 *         description: Sign up was successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     phone:
 *                       type: boolean
 *                     name:
 *                       type: boolean
 *                     email:
 *                       type: string
 *                     addresses:
 *                       type: array
 *                       items:
 *                         type: string
 *                     isVerified:
 *                       type: boolean
 *                     createdAt:
 *                       type: number
 *                     updatedAt:
 *                       type: number
 *                 token:
 *                   type: string
 *       400:
 *         description: The email is already taken
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
userRouter.post('/signup', signup)



/**
 * @swagger
 * /api/user/login:
 *   post:
 *     tags:
 *       - User
 *     summary: Login user
 *     description: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login was successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     phone:
 *                       type: boolean
 *                     name:
 *                       type: boolean
 *                     email:
 *                       type: string
 *                     addresses:
 *                       type: array
 *                       items:
 *                         type: string
 *                     isVerified:
 *                       type: boolean
 *                     createdAt:
 *                       type: number
 *                     updatedAt:
 *                       type: number
 *                 token:
 *                   type: string
 *       400:
 *         description: Incorrect credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
userRouter.post('/login', login)



/**
 * @swagger
 * /api/user:
 *   get:
 *     tags:
 *       - User
 *     summary: get current user
 *     description: get current user
 *     security:
 *       - userBearerAuth: []
 *     responses:
 *       200:
 *         description: A user object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     phone:
 *                       type: boolean
 *                     name:
 *                       type: boolean
 *                     email:
 *                       type: string
 *                     addresses:
 *                       type: array
 *                       items:
 *                         type: string
 *                     isVerified:
 *                       type: boolean
 *                     createdAt:
 *                       type: number
 *                     updatedAt:
 *                       type: number
 *       401:
 *         description: Not authorized 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
userRouter.get('/', auth('user'), getCurrentUser)



/**
 * @swagger
 * /api/user:
 *   patch:
 *     tags:
 *       - User
 *     summary: Edit current user
 *     description: Edit current user
 *     security:
 *       - userBearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               addresses:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: A user object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     phone:
 *                       type: boolean
 *                     name:
 *                       type: boolean
 *                     email:
 *                       type: string
 *                     addresses:
 *                       type: array
 *                       items:
 *                         type: string
 *                     isVerified:
 *                       type: boolean
 *                     createdAt:
 *                       type: number
 *                     updatedAt:
 *                       type: number
 *       401:
 *         description: Not authorized 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Unique fields required or no changes received or special permission required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       422:
 *         description: Data validation error 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
userRouter.patch('/', auth('user'), editUser)



/**
 * @swagger
 * /api/user/change_password:
 *   post:
 *     tags:
 *       - User
 *     summary: Change user password
 *     description: Change user password
 *     security:
 *       - userBearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *             required:
 *               - oldPassword
 *               - newPassword
 *     responses:
 *       200:
 *         description: Changing the password was successful
 *       400:
 *         description: Incorrect credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
userRouter.post('/change_password', auth('user'), changePassword)



/**
 * @swagger
 * /api/user:
 *   delete:
 *     tags:
 *       - User
 *     summary: Delete current user
 *     description: Delete current user
 *     security:
 *       - userBearerAuth: []
 *     responses:
 *       200:
 *         description: User deleting was successful
 *       401:
 *         description: Not authorized 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
userRouter.delete('/', auth('user'), deleteUser)

