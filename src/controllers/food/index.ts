import { Router } from 'express'

import auth from '../../middlewares/auth'
import upload from '../../middlewares/multer'

import addFood from './addFood'
import getFood from './getFood'
import getFoods from './getFoods'
import getFoodsByCategory from './getFoodsByCategory'
import getFoodsByRestaurantId from './getFoodsByRestaurantId'
import getFoodsOfCurrentAdmin from './getFoodsOfCurrentAdmin'
import editFood from './editFood'
import deleteFoods from './deleteFoods'

export const adminFoodRouter = Router()
export const userFoodRouter = Router()

/**
 * @swagger
 * tags:
 * - name: Food | Admin
 *   description: food routes for admin
 * - name: Food | User
 *   description: food routes for user
 */


/**
 * @swagger
 * /api/admin/food:
 *   post:
 *     tags:
 *       - Food | Admin
 *     summary: Add a food
 *     description: Add a new food
 *     security:
 *       - adminBearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               ingredients:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *               category:
 *                 type: string
 *               price:
 *                 type: string
 *               discountPercentage:
 *                 type: string
 *             required:
 *               - name
 *               - ingredients
 *               - image
 *               - category
 *               - price
 *               - discountPercentage
 *     responses:
 *       200:
 *         description: Added food
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 food:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     ingredients:
 *                       type: string
 *                     image:
 *                       type: string
 *                     category:
 *                       type: string
 *                     restaurant:
 *                       type: string
 *                     price:
 *                       type: string
 *                     discountPercentage:
 *                       type: string
 *                     rating:
 *                       type: number
 *                     ratingsCount:
 *                       type: number
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
adminFoodRouter.post('/', auth('admin'), upload, addFood)



/**
 * @swagger
 * /api/admin/food:
 *   get:
 *     tags:
 *       - Food | Admin
 *     summary: Get a list of foods
 *     description: Get a list of foods in full details by passing the desired query parameters
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
 *           enum: ['name', 'price', 'category', 'createdAt', 'updatedAt']
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
 *         description: The expression to filter the name of results by
 *     responses:
 *       200:
 *         description: The list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: number
 *                 foods: 
 *                   type: array
 *                   items: 
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       ingredients:
 *                         type: string
 *                       image:
 *                         type: string
 *                       category:
 *                         type: string
 *                       restaurant:
 *                         type: string
 *                       price:
 *                         type: string
 *                       discountPercentage:
 *                         type: string
 *                       rating:
 *                         type: number
 *                       ratingsCount:
 *                         type: number
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
adminFoodRouter.get('/', auth('admin'), getFoods)



/**
 * @swagger
 * /api/admin/food/current:
 *   get:
 *     tags:
 *       - Food | Admin
 *     summary: Get current admin's food
 *     description: Get currently logged in admin's food
 *     security:
 *       - adminBearerAuth: []
 *     responses:
 *       200:
 *         description: Fetched food
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 foods: 
 *                   type: array
 *                   items: 
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       ingredients:
 *                         type: string
 *                       image:
 *                         type: string
 *                       category:
 *                         type: string
 *                       restaurant:
 *                         type: string
 *                       price:
 *                         type: string
 *                       discountPercentage:
 *                         type: string
 *                       rating:
 *                         type: number
 *                       ratingsCount:
 *                         type: number
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
adminFoodRouter.get('/current', auth('admin'), getFoodsOfCurrentAdmin)



/**
 * @swagger
 * /api/admin/food/{foodId}:
 *   get:
 *     tags:
 *       - Food | Admin
 *     summary: Get a food by id
 *     description: Get a food in full details by id
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: foodId
 *         in: path
 *         required: true
 *         description: The ID of the expected food
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fetched food
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 food:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     ingredients:
 *                       type: string
 *                     image:
 *                       type: string
 *                     category:
 *                       type: string
 *                     restaurant:
 *                       type: string
 *                     price:
 *                       type: string
 *                     discountPercentage:
 *                       type: string
 *                     rating:
 *                       type: number
 *                     ratingsCount:
 *                       type: number
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
adminFoodRouter.get('/:foodId', auth('admin'), getFood)



/**
 * @swagger
 * /api/admin/food/{foodId}:
 *   patch:
 *     tags:
 *       - Food | Admin
 *     summary: Edit current admin's food
 *     description: Edit currently logged in admin's food
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: foodId
 *         in: path
 *         required: true
 *         description: The id of the food
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               ingredients:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *               category:
 *                 type: string
 *               price:
 *                 type: string
 *               discountPercentage:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated food
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 food:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     ingredients:
 *                       type: string
 *                     image:
 *                       type: string
 *                     category:
 *                       type: string
 *                     restaurant:
 *                       type: string
 *                     price:
 *                       type: string
 *                     discountPercentage:
 *                       type: string
 *                     rating:
 *                       type: number
 *                     ratingsCount:
 *                       type: number
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
adminFoodRouter.patch('/:foodId', auth('admin'), upload, editFood)



/**
 * @swagger
 * /api/admin/food/delete:
 *   post:
 *     tags:
 *       - Food | Admin
 *     summary: Delete a list of foods (God admin only)
 *     description: Delete a list of foods by passing an array of their id's  
 *     security:
 *       - adminBearerAuth: []
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
 *         description: The passed foods deleted
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
adminFoodRouter.post('/delete', auth('admin'), deleteFoods)



//--------------------------------------------------------------------------------------------------------



/**
 * @swagger
 * /api/user/food/{foodId}:
 *   get:
 *     tags:
 *       - Food | User
 *     summary: Get a food
 *     description: Get a food in full details by id
 *     parameters:
 *       - name: foodId
 *         in: path
 *         required: true
 *         description: The ID of the expected food
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fetched food
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 food:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     ingredients:
 *                       type: string
 *                     image:
 *                       type: string
 *                     category:
 *                       type: string
 *                     restaurant:
 *                       type: string
 *                     price:
 *                       type: string
 *                     discountPercentage:
 *                       type: string
 *                     rating:
 *                       type: number
 *                     ratingsCount:
 *                       type: number
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
userFoodRouter.get('/:foodId', getFood)



/**
 * @swagger
 * /api/user/food:
 *   get:
 *     tags:
 *       - Food | User
 *     summary: Get a list of foods
 *     description: Get a list of categories in full details by passing the desired query parameters
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
 *           enum: ['name', 'price', 'category', 'createdAt', 'updatedAt']
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
 *         description: The expression to filter the name of results by
 *     responses:
 *       200:
 *         description: The list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: number
 *                 foods: 
 *                   type: array
 *                   items: 
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       ingredients:
 *                         type: string
 *                       image:
 *                         type: string
 *                       category:
 *                         type: string
 *                       restaurant:
 *                         type: string
 *                       price:
 *                         type: string
 *                       discountPercentage:
 *                         type: string
 *                       rating:
 *                         type: number
 *                       ratingsCount:
 *                         type: number
 *                       createdAt:
 *                         type: number
 *                       updatedAt:
 *                         type: number
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
userFoodRouter.get('/', getFoods)



/**
 * @swagger
 * /api/user/food/category/{category}:
 *   get:
 *     tags:
 *       - Food | User
 *     summary: Get a list of foods by category
 *     description: Get a list of foods by category in full details by passing the desired query parameters
 *     parameters:
 *       - name: category
 *         in: path
 *         required: true
 *         description: The category to filter the foods by
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
 *           enum: ['name', 'price', 'category', 'createdAt', 'updatedAt']
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
 *         description: The expression to filter the name of results by
 *     responses:
 *       200:
 *         description: The list of foods
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: number
 *                 foods: 
 *                   type: array
 *                   items: 
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       ingredients:
 *                         type: string
 *                       image:
 *                         type: string
 *                       category:
 *                         type: string
 *                       restaurant:
 *                         type: string
 *                       price:
 *                         type: string
 *                       discountPercentage:
 *                         type: string
 *                       rating:
 *                         type: number
 *                       ratingsCount:
 *                         type: number
 *                       createdAt:
 *                         type: number
 *                       updatedAt:
 *                         type: number
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
userFoodRouter.get('/category/:category', getFoodsByCategory)




/**
 * @swagger
 * /api/user/food/restaurant/{restaurantId}:
 *   get:
 *     tags:
 *       - Food | User
 *     summary: Get current admin's food
 *     description: Get currently logged in admin's food
 *     parameters:
 *       - name: restaurantId
 *         in: path
 *         required: true
 *         description: The id of the restaurant
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fetched foods
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 foods: 
 *                   type: array
 *                   items: 
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       ingredients:
 *                         type: string
 *                       image:
 *                         type: string
 *                       category:
 *                         type: string
 *                       restaurant:
 *                         type: string
 *                       price:
 *                         type: string
 *                       discountPercentage:
 *                         type: string
 *                       rating:
 *                         type: number
 *                       ratingsCount:
 *                         type: number
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
userFoodRouter.get('/restaurant/:restaurantId', getFoodsByRestaurantId)

