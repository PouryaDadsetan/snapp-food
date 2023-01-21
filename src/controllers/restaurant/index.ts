import { Router } from 'express'

import auth from '../../middlewares/auth'
import upload from '../../middlewares/multer'

import addRestaurant from './addRestaurant'
import getRestaurant from './getRestaurant'
import getRestaurantOfCurrentAdmin from './getRestaurantOfCurrentAdmin'
import getRestaurants from './getRestaurants'
import getRestaurantsByCategory from './getRestaurantsByCategory'
import editRestaurant from './editRestaurant'
import verifyRestaurant from './verifyRestaurant'
import deleteRestaurants from './deleteRestaurants'

export const adminRestaurantRouter = Router()
export const userRestaurantRouter = Router()

/**
 * @swagger
 * tags:
 * - name: Restaurant | Admin
 *   description: restaurant routes for admin
 * - name: Restaurant | User
 *   description: restaurant routes for user
 */


/**
 * @swagger
 * /api/admin/restaurant:
 *   post:
 *     tags:
 *       - Restaurant | Admin
 *     summary: Add a restaurant
 *     description: Add a new restaurant
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
 *               city:
 *                 type: string
 *               address:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *               registrationNumber:
 *                 type: string
 *             required:
 *               - name
 *               - city
 *               - address
 *               - categories
 *               - registrationNumber
 *     responses:
 *       200:
 *         description: Added restaurant
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 restaurant:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     city:
 *                       type: string
 *                     address:
 *                       type: string
 *                     image:
 *                       type: string
 *                     categories:
 *                       type: array
 *                       items:
 *                         type: string
 *                     registrationNumber:
 *                       type: string
 *                     rating:
 *                       type: number
 *                     ratingsCount:
 *                       type: number
 *                     admin:
 *                       type: string
 *                     isVerified:
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
adminRestaurantRouter.post('/', auth('admin'), upload, addRestaurant)



/**
 * @swagger
 * /api/admin/restaurant/current:
 *   get:
 *     tags:
 *       - Restaurant | Admin
 *     summary: Get current admin's restaurant
 *     description: Get currently logged in admin's restaurant
 *     security:
 *       - adminBearerAuth: []
 *     responses:
 *       200:
 *         description: Fetched restaurant
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 restaurant:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     city:
 *                       type: string
 *                     address:
 *                       type: string
 *                     image:
 *                       type: string
 *                     categories:
 *                       type: array
 *                       items:
 *                         type: string
 *                     registrationNumber:
 *                       type: string
 *                     rating:
 *                       type: number
 *                     ratingsCount:
 *                       type: number
 *                     admin:
 *                       type: string
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
adminRestaurantRouter.get('/current', auth('admin'), getRestaurantOfCurrentAdmin)



/**
 * @swagger
 * /api/admin/restaurant/{restaurantId}:
 *   get:
 *     tags:
 *       - Restaurant | Admin
 *     summary: Get a restaurant by id
 *     description: Get a restaurant in full details by id
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: restaurantId
 *         in: path
 *         required: true
 *         description: The ID of the expected restaurant
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fetched restaurant
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 restaurant:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     city:
 *                       type: string
 *                     address:
 *                       type: string
 *                     image:
 *                       type: string
 *                     categories:
 *                       type: array
 *                       items:
 *                         type: string
 *                     registrationNumber:
 *                       type: string
 *                     rating:
 *                       type: number
 *                     ratingsCount:
 *                       type: number
 *                     admin:
 *                       type: string
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
adminRestaurantRouter.get('/:restaurantId', auth('admin'), getRestaurant)



/**
 * @swagger
 * /api/admin/restaurant/city/{city}:
 *   get:
 *     tags:
 *       - Restaurant | Admin
 *     summary: Get a list of restaurants
 *     description: Get a list of restaurants in full details by passing the desired query parameters
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: city
 *         in: path
 *         required: true
 *         description: The city whose restaurants are to be fetched
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
 *           enum: ['rating', 'createdAt', 'updatedAt']
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
 *                 restaurants: 
 *                   type: array
 *                   items: 
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       city:
 *                         type: string
 *                       address:
 *                         type: string
 *                       image:
 *                         type: string
 *                       categories:
 *                         type: array
 *                         items:
 *                           type: string
 *                       registrationNumber:
 *                         type: string
 *                       rating:
 *                         type: number
 *                       ratingsCount:
 *                         type: number
 *                       admin:
 *                         type: string
 *                       isVerified:
 *                         type: boolean
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
adminRestaurantRouter.get('/city/:city', auth('admin'), getRestaurants)



/**
 * @swagger
 * /api/admin/restaurant/current:
 *   patch:
 *     tags:
 *       - Restaurant | Admin
 *     summary: Edit current admin's restaurant
 *     description: Edit currently logged in admin's restaurant
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
 *               city:
 *                 type: string
 *               address:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *               registrationNumber:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated restaurant
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 restaurant:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     city:
 *                       type: string
 *                     address:
 *                       type: string
 *                     image:
 *                       type: string
 *                     categories:
 *                       type: array
 *                       items:
 *                         type: string
 *                     registrationNumber:
 *                       type: string
 *                     rating:
 *                       type: number
 *                     ratingsCount:
 *                       type: number
 *                     admin:
 *                       type: string
 *                     isVerified:
 *                       type: boolean
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
adminRestaurantRouter.patch('/current', auth('admin'), upload, editRestaurant)



/**
 * @swagger
 * /api/admin/restaurant/delete:
 *   post:
 *     tags:
 *       - Restaurant | Admin
 *     summary: Delete a list of restaurants (God admin only)
 *     description: Delete a list of restaurants by passing an array of their id's  
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
 *         description: The passed restaurants deleted
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
adminRestaurantRouter.post('/delete', auth('admin'), deleteRestaurants)



/**
 * @swagger
 * /api/admin/restaurant/{restaurantId}:
 *   post:
 *     tags:
 *       - Restaurant | Admin
 *     summary: Verify a restaurant by id (God admin only)
 *     description: Verify a restaurant by passing the related id
 *     security:
 *       - adminBearerAuth: []
 *     parameters:
 *       - name: restaurantId
 *         in: path
 *         required: true
 *         description: The ID of the expected restaurant
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Verified restaurant
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 restaurant:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     city:
 *                       type: string
 *                     address:
 *                       type: string
 *                     image:
 *                       type: string
 *                     categories:
 *                       type: array
 *                       items:
 *                         type: string
 *                     registrationNumber:
 *                       type: string
 *                     rating:
 *                       type: number
 *                     ratingsCount:
 *                       type: number
 *                     admin:
 *                       type: string
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
adminRestaurantRouter.post('/:restaurantId', auth('admin'), verifyRestaurant)



//--------------------------------------------------------------------------------------------------------



/**
 * @swagger
 * /api/user/restaurant/{restaurantId}:
 *   get:
 *     tags:
 *       - Restaurant | User
 *     summary: Get a restaurant
 *     description: Get a restaurant in full details by id
 *     parameters:
 *       - name: restaurantId
 *         in: path
 *         required: true
 *         description: The ID of the expected restaurant
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fetched restaurant
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 restaurant:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     city:
 *                       type: string
 *                     address:
 *                       type: string
 *                     image:
 *                       type: string
 *                     categories:
 *                       type: array
 *                       items:
 *                         type: string
 *                     registrationNumber:
 *                       type: string
 *                     rating:
 *                       type: number
 *                     ratingsCount:
 *                       type: number
 *                     admin:
 *                       type: string
 *                     isVerified:
 *                       type: boolean
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
userRestaurantRouter.get('/:restaurantId', getRestaurant)



/**
 * @swagger
 * /api/user/restaurant:
 *   get:
 *     tags:
 *       - Restaurant | User
 *     summary: Get a list of categories
 *     description: Get a list of categories in full details by passing the desired query parameters
 *     parameters:
 *       - name: city
 *         in: path
 *         required: true
 *         description: The city whose restaurants are to be fetched
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
 *           enum: ['rating', 'createdAt', 'updatedAt']
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
 *                 restaurants: 
 *                   type: array
 *                   items: 
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       city:
 *                         type: string
 *                       address:
 *                         type: string
 *                       image:
 *                         type: string
 *                       categories:
 *                         type: array
 *                         items:
 *                           type: string
 *                       registrationNumber:
 *                         type: string
 *                       rating:
 *                         type: number
 *                       ratingsCount:
 *                         type: number
 *                       admin:
 *                         type: string
 *                       isVerified:
 *                         type: boolean
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
userRestaurantRouter.get('/', getRestaurants)



/**
 * @swagger
 * /api/user/restaurant/city/{city}/category/{category}:
 *   get:
 *     tags:
 *       - Restaurant | User
 *     summary: Get a list of restaurants by category
 *     description: Get a list of restaurants by category in full details by passing the desired query parameters
 *     parameters:
 *       - name: city
 *         in: path
 *         required: true
 *         description: The city whose restaurants are to be fetched
 *         schema:
 *           type: string
 *       - name: category
 *         in: path
 *         required: true
 *         description: The category to filter the restaurants by
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
 *           enum: ['rating', 'createdAt', 'updatedAt']
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
 *                 restaurants: 
 *                   type: array
 *                   items: 
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       city:
 *                         type: string
 *                       address:
 *                         type: string
 *                       image:
 *                         type: string
 *                       categories:
 *                         type: array
 *                         items:
 *                           type: string
 *                       registrationNumber:
 *                         type: string
 *                       rating:
 *                         type: number
 *                       ratingsCount:
 *                         type: number
 *                       admin:
 *                         type: string
 *                       isVerified:
 *                         type: boolean
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
userRestaurantRouter.get('/city/:city/category/:category', getRestaurantsByCategory)

