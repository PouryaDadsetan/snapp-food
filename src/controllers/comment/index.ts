import { Router } from 'express'

import auth from '../../middlewares/auth'

import addComment from './addComment'
import getComment from './getComment'
import getCommentsByFoodId from './getCommentsByFoodId'
import editComment from './editComment'
import deleteComments from './deleteComments'

export const adminCommentRouter = Router()
export const userCommentRouter = Router()

/**
 * @swagger
 * tags:
 * - name: Comment | Admin
 *   description: comment routes for admin
 * - name: Comment | User
 *   description: comment routes for user
 */



/**
 * @swagger
 * /api/admin/food/comment/{commentId}:
 *   get:
 *     tags:
 *       - Comment | Admin
 *     summary: Get a comment by id
 *     description: Get a comment in full details by id
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: commentId
 *         in: path
 *         required: true
 *         description: The ID of the expected comment
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fetched comment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comment:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     user:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                         email:
 *                           type: string
 *                     food:
 *                       type: string
 *                     message:
 *                       type: string
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
adminCommentRouter.get('/:commentId', auth('admin'), getComment)



/**
 * @swagger
 * /api/admin/food/comment/foodId/{foodId}:
 *   get:
 *     tags:
 *       - Comment | Admin
 *     summary: Get expected food comments
 *     description: Get expected food comments
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: foodId
 *         in: path
 *         required: true
 *         description: The id of the food
 *         schema:
 *           type: string
 *       - name: limit
 *         in: query
 *         schema:
 *           type: number
 *         description: The number of items to return
 *       - name: skip
 *         in: query
 *         schema:
 *           type: number
 *         description: The number of items to skip before starting to collect the results
 *       - name: sortBy
 *         in: query
 *         schema:
 *           type: string
 *           enum: ['createdAt', 'updatedAt']
 *         description: The property to sort by
 *       - name: sortOrder
 *         in: query
 *         schema:
 *           type: string
 *           enum: ['asc', 'desc']
 *         description: The order to sort by
 *       - name: search
 *         in: query
 *         schema:
 *           type: string
 *         description: The expression to filter the message of results by
 *     responses:
 *       200:
 *         description: Fetched comments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comments: 
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       user:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                           email:
 *                             type: string
 *                       food:
 *                         type: string
 *                       message:
 *                         type: string
 *                       createdAt:
 *                         type: number
 *                       updatedAt:
 *                         type: number
 *       401:
 *         description: Not authorized 
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
adminCommentRouter.get('/foodId/:foodId', auth('admin'), getCommentsByFoodId)



//--------------------------------------------------------------------------------------------------------




/**
 * @swagger
 * /api/user/food/comment/foodId/{foodId}:
 *   post:
 *     tags:
 *       - Comment | User
 *     summary: Add a comment to a food
 *     description: Add a new comment to a food
 *     security:
 *       - userBearerAuth: []
 *     parameters:
 *       - name: foodId
 *         in: path
 *         required: true
 *         description: The ID of the food to add comment
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *             required:
 *               - message
 *     responses:
 *       200:
 *         description: Added comment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comment:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     user:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                         email:
 *                           type: string
 *                     food:
 *                       type: string
 *                     message:
 *                       type: string
 *                     createdAt:
 *                       type: number
 *                     updatedAt:
 *                       type: number
 *       404:
 *         description: Food not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Not authorized 
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
userCommentRouter.post('/foodId/:foodId', auth('user'), addComment)



/**
 * @swagger
 * /api/user/food/comment/{commentId}:
 *   patch:
 *     tags:
 *       - Comment | User
 *     summary: Edit current user's comment
 *     description: Edit currently logged in user's comment
 *     security:
 *       - userBearerAuth: []
 *     parameters:
 *       - name: commentId
 *         in: path
 *         required: true
 *         description: The id of the comment
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *             required:
 *               - message
 *     responses:
 *       200:
 *         description: Updated comment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comment:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     user:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                         email:
 *                           type: string
 *                     food:
 *                       type: string
 *                     message:
 *                       type: string
 *                     createdAt:
 *                       type: number
 *                     updatedAt:
 *                       type: number
 *       400:
 *         description: Unique fields required or no changes received
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Not authorized 
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
 *       422:
 *         description: Data validation error 
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
userCommentRouter.patch('/:commentId', auth('user'), editComment)



/**
 * @swagger
 * /api/user/food/comment/{commentId}:
 *   get:
 *     tags:
 *       - Comment | User
 *     summary: Get a comment
 *     description: Get a comment in full details by id
 *     parameters:
 *       - name: commentId
 *         in: path
 *         required: true
 *         description: The ID of the expected comment
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fetched comment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comment:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     user:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                         email:
 *                           type: string
 *                     food:
 *                       type: string
 *                     message:
 *                       type: string
 *                     createdAt:
 *                       type: number
 *                     updatedAt:
 *                       type: number
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
userCommentRouter.get('/:commentId', getComment)



/**
 * @swagger
 * /api/user/food/comment/foodId/{foodId}:
 *   get:
 *     tags:
 *       - Comment | User
 *     summary: Get expected food comments
 *     description: Get expected food comments
 *     parameters:
 *       - name: foodId
 *         in: path
 *         required: true
 *         description: The id of the food
 *         schema:
 *           type: string
 *       - name: limit
 *         in: query
 *         schema:
 *           type: number
 *         description: The number of items to return
 *       - name: skip
 *         in: query
 *         schema:
 *           type: number
 *         description: The number of items to skip before starting to collect the results
 *       - name: sortBy
 *         in: query
 *         schema:
 *           type: string
 *           enum: ['createdAt', 'updatedAt']
 *         description: The property to sort by
 *       - name: sortOrder
 *         in: query
 *         schema:
 *           type: string
 *           enum: ['asc', 'desc']
 *         description: The order to sort by
 *       - name: search
 *         in: query
 *         schema:
 *           type: string
 *         description: The expression to filter the message of results by
 *     responses:
 *       200:
 *         description: Fetched comments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comments: 
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       user:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                           email:
 *                             type: string
 *                       food:
 *                         type: string
 *                       message:
 *                         type: string
 *                       createdAt:
 *                         type: number
 *                       updatedAt:
 *                         type: number
 *       401:
 *         description: Not authorized 
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
userCommentRouter.get('/foodId/:foodId', getCommentsByFoodId)



/**
 * @swagger
 * /api/user/food/comment/delete:
 *   post:
 *     tags:
 *       - Comment | User
 *     summary: Delete a list of comments
 *     description: Delete a list of comments by passing an array of their id's  
 *     security:
 *       - userBearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idList:
 *                 type: array
 *                 items:
 *                   type: string
 *             required:
 *               - idList
 *     responses:
 *       200:
 *         description: The passed comments deleted
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
userCommentRouter.post('/delete', auth('user'), deleteComments)

