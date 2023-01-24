import { Router } from 'express'

import auth from '../../middlewares/auth'
import upload from '../../middlewares/multer'

import addOrder from './addOrder'
import getOrder from './getOrder'
import getOrdersOfCurrentAdmin from './getOrdersOfCurrentAdmin'
import getOrdersOfCurrentUser from './getOrdersOfCurrentUser'
import updateOrderState from './updateOrderState'
import rateOrder from './rateOrder'

export const adminOrderRouter = Router()
export const userOrderRouter = Router()

/**
 * @swagger
 * tags:
 * - name: Order | Admin
 *   description: order routes for admin
 * - name: Order | User
 *   description: order routes for user
 */



/**
 * @swagger
 * /api/admin/order/current:
 *   get:
 *     tags:
 *       - Order | Admin
 *     summary: Get orders of current admin
 *     description: Get orders of current admin in full details
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
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
 *           enum: ['totalSum', 'createdAt', 'updatedAt']
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
 *           enum: ['preparing', 'delivering', 'delivered', 'canceled']
 *         description: The expression to filter the state of results by
 *     responses:
 *       200:
 *         description: Fetched orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orders:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       restaurant:
 *                         type: string
 *                       user:
 *                         type: string
 *                       foods:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties: 
 *                             food: 
 *                               type: object
 *                               properties:
 *                                 _id:
 *                                   type: string
 *                                 name:
 *                                   type: string
 *                                 ingredients:
 *                                   type: string
 *                                 image:
 *                                   type: string
 *                                 category:
 *                                   type: string
 *                                 restaurant:
 *                                   type: string
 *                                 price:
 *                                   type: string
 *                                 discountPercentage:
 *                                   type: string
 *                                 rating:
 *                                   type: number
 *                                 ratingsCount:
 *                                   type: number
 *                                 createdAt:
 *                                   type: number
 *                                 updatedAt:
 *                                   type: number
 *                             count: 
 *                               type: number
 *                       address:
 *                         type: string
 *                       phoneToContact:
 *                         type: string
 *                       totalPrice:
 *                         type: number
 *                       totalSum:
 *                         type: number
 *                       state:
 *                         type: string
 *                       isRated:
 *                         type: boolean
 *                       createdAt:
 *                         type: number
 *                       updatedAt:
 *                         type: number
 *                 count:
 *                   type: number
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
adminOrderRouter.get('/current', auth('admin'), getOrdersOfCurrentAdmin)



/**
 * @swagger
 * /api/admin/order/{orderId}:
 *   get:
 *     tags:
 *       - Order | Admin
 *     summary: Get an order by id
 *     description: Get an order by id in full details by id
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: orderId
 *         in: path
 *         required: true
 *         description: The ID of the expected order
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fetched order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 order:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     restaurant:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                         address:
 *                           type: string
 *                         image:
 *                           type: string
 *                         rating:
 *                           type: number
 *                         ratingsCount:
 *                           type: number
 *                     user:
 *                       type: string
 *                     foods:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties: 
 *                           food: 
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               name:
 *                                 type: string
 *                               ingredients:
 *                                 type: string
 *                               image:
 *                                 type: string
 *                               category:
 *                                 type: string
 *                               restaurant:
 *                                 type: string
 *                               price:
 *                                 type: string
 *                               discountPercentage:
 *                                 type: string
 *                               rating:
 *                                 type: number
 *                               ratingsCount:
 *                                 type: number
 *                               createdAt:
 *                                 type: number
 *                               updatedAt:
 *                                 type: number
 *                           count: 
 *                             type: number
 *                     address:
 *                       type: string
 *                     phoneToContact:
 *                       type: string
 *                     totalPrice:
 *                       type: number
 *                     totalSum:
 *                       type: number
 *                     state:
 *                       type: string
 *                     isRated:
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
adminOrderRouter.get('/:orderId', auth('admin'), getOrder)



/**
 * @swagger
 * /api/admin/order/state/{orderId}:
 *   patch:
 *     tags:
 *       - Order | Admin
 *     summary: Update an order's state
 *     description: Update an order's state by passing id of the order
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: orderId
 *         in: path
 *         required: true
 *         description: The ID of the expected order
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newState:
 *                 type: string
 *                 oneOf: ['preparing', 'delivering', 'delivered', 'canceled']
 *     responses:
 *       200:
 *         description: Updated order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 restaurant:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     address:
 *                       type: string
 *                     image:
 *                       type: string
 *                     rating:
 *                       type: number
 *                     ratingsCount:
 *                       type: number
 *                 user:
 *                   type: string
 *                 foods:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties: 
 *                       food: 
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           ingredients:
 *                             type: string
 *                           image:
 *                             type: string
 *                           category:
 *                             type: string
 *                           restaurant:
 *                             type: string
 *                           price:
 *                             type: string
 *                           discountPercentage:
 *                             type: string
 *                           rating:
 *                             type: number
 *                           ratingsCount:
 *                             type: number
 *                           createdAt:
 *                             type: number
 *                           updatedAt:
 *                             type: number
 *                       count: 
 *                         type: number
 *                 address:
 *                   type: string
 *                 phoneToContact:
 *                   type: string
 *                 totalPrice:
 *                   type: number
 *                 totalSum:
 *                   type: number
 *                 state:
 *                   type: string
 *                 isRated:
 *                   type: boolean
 *                 createdAt:
 *                   type: number
 *                 updatedAt:
 *                   type: number
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
adminOrderRouter.patch('/state/:orderId', auth('admin'), updateOrderState)



//--------------------------------------------------------------------------------------------------------



/**
 * @swagger
 * /api/user/order/{restaurantId}:
 *   post:
 *     tags:
 *       - Order | User
 *     summary: Add an order
 *     description: Add a new order
 *     security:
 *       - userBearerAuth: []
 *     parameters:
 *       - name: restaurantId
 *         in: path
 *         required: true
 *         description: The ID of the expected restaurant
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               foods:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties: 
 *                     food:
 *                       type: string
 *                     count:
 *                       type: number
 *               address:
 *                 type: string
 *               phoneToContact:
 *                 type: string
 *             required:
 *               - foods
 *               - address
 *               - phoneToContact
 *     responses:
 *       200:
 *         description: Added order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 order:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     restaurant:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                         address:
 *                           type: string
 *                         image:
 *                           type: string
 *                         rating:
 *                           type: number
 *                         ratingsCount:
 *                           type: number
 *                     user:
 *                       type: string
 *                     foods:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties: 
 *                           food: 
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               name:
 *                                 type: string
 *                               ingredients:
 *                                 type: string
 *                               image:
 *                                 type: string
 *                               category:
 *                                 type: string
 *                               restaurant:
 *                                 type: string
 *                               price:
 *                                 type: string
 *                               discountPercentage:
 *                                 type: string
 *                               rating:
 *                                 type: number
 *                               ratingsCount:
 *                                 type: number
 *                               createdAt:
 *                                 type: number
 *                               updatedAt:
 *                                 type: number
 *                           count: 
 *                             type: number
 *                     address:
 *                       type: string
 *                     phoneToContact:
 *                       type: string
 *                     totalPrice:
 *                       type: number
 *                     totalSum:
 *                       type: number
 *                     state:
 *                       type: string
 *                     isRated:
 *                       type: boolean
 *                     createdAt:
 *                       type: number
 *                     updatedAt:
 *                       type: number
 *       400:
 *         description: Unique fields required
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
userOrderRouter.post('/:restaurantId', auth('user'), addOrder)



/**
 * @swagger
 * /api/user/order/current:
 *   get:
 *     tags:
 *       - Order | User
 *     summary: Get orders of current user
 *     description: Get orders of current user in full details
 *     security:
 *       - userBearerAuth: []
 *     parameters:
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
 *           enum: ['totalSum', 'createdAt', 'updatedAt']
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
 *           enum: ['preparing', 'delivering', 'delivered', 'canceled']
 *         description: The expression to filter the state of results by
 *     responses:
 *       200:
 *         description: Fetched order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orders:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       restaurant:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           address:
 *                             type: string
 *                           image:
 *                             type: string
 *                           rating:
 *                             type: number
 *                           ratingsCount:
 *                             type: number
 *                       user:
 *                         type: string
 *                       foods:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties: 
 *                             food: 
 *                               type: object
 *                               properties:
 *                                 _id:
 *                                   type: string
 *                                 name:
 *                                   type: string
 *                                 ingredients:
 *                                   type: string
 *                                 image:
 *                                   type: string
 *                                 category:
 *                                   type: string
 *                                 restaurant:
 *                                   type: string
 *                                 price:
 *                                   type: string
 *                                 discountPercentage:
 *                                   type: string
 *                                 rating:
 *                                   type: number
 *                                 ratingsCount:
 *                                   type: number
 *                                 createdAt:
 *                                   type: number
 *                                 updatedAt:
 *                                   type: number
 *                             count: 
 *                               type: number
 *                       address:
 *                         type: string
 *                       phoneToContact:
 *                         type: string
 *                       totalPrice:
 *                         type: number
 *                       totalSum:
 *                         type: number
 *                       state:
 *                         type: string
 *                       isRated:
 *                         type: boolean
 *                       createdAt:
 *                         type: number
 *                       updatedAt:
 *                         type: number
 *                 count:
 *                   type: number
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
userOrderRouter.get('/current', auth('user'), getOrdersOfCurrentUser)



/**
 * @swagger
 * /api/user/order/{orderId}:
 *   get:
 *     tags:
 *       - Order | User
 *     summary: Get an order by id
 *     description: Get an order by id in full details by id
 *     security:
 *       - userBearerAuth: []
 *     parameters:
 *       - name: orderId
 *         in: path
 *         required: true
 *         description: The ID of the expected order
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fetched order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 order:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     restaurant:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                         address:
 *                           type: string
 *                         image:
 *                           type: string
 *                         rating:
 *                           type: number
 *                         ratingsCount:
 *                           type: number
 *                     user:
 *                       type: string
 *                     foods:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties: 
 *                           food: 
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               name:
 *                                 type: string
 *                               ingredients:
 *                                 type: string
 *                               image:
 *                                 type: string
 *                               category:
 *                                 type: string
 *                               restaurant:
 *                                 type: string
 *                               price:
 *                                 type: string
 *                               discountPercentage:
 *                                 type: string
 *                               rating:
 *                                 type: number
 *                               ratingsCount:
 *                                 type: number
 *                               createdAt:
 *                                 type: number
 *                               updatedAt:
 *                                 type: number
 *                           count: 
 *                             type: number
 *                     address:
 *                       type: string
 *                     phoneToContact:
 *                       type: string
 *                     totalPrice:
 *                       type: number
 *                     totalSum:
 *                       type: number
 *                     state:
 *                       type: string
 *                     isRated:
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
userOrderRouter.get('/:orderId', auth('user'), getOrder)



/**
 * @swagger
 * /api/user/order/rate/{orderId}:
 *   post:
 *     tags:
 *       - Order | User
 *     summary: Rate an order
 *     description: Rate an order by passing id of the order
 *     security:
 *       - userBearerAuth: []
 *     parameters:
 *       - name: orderId
 *         in: path
 *         required: true
 *         description: The ID of the expected order
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ratings:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties: 
 *                     food:
 *                       type: string
 *                     rating:
 *                       type: number
 *             required:
 *               - ratings
 *     responses:
 *       200:
 *         description: Order rated successfully
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
userOrderRouter.post('/rate/:orderId', auth('user'), rateOrder)

