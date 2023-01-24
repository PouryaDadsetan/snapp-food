import { ObjectId as objectId } from 'mongoose'

import Order from './order'
import { IResponse } from "../../../controllers/helper"
import { errorMessages, statusCodes } from "../../../utils/constants"
import User from '../user/user'
import Admin, { IAdmin } from '../admin/admin'
import Food from '../food/food'
import Restaurant, { IRestaurant } from '../restaurant/restaurant'

const addOrder = async (
  newOrder: {
    restaurant: string
    userId: string
    foods: {
      food: string
      count: number
    }[]
    address: string
    phoneToContact: string
  }
): Promise<IResponse> => {
  try {
    const { 
      restaurant: restaurantId,
      userId,
      foods,
      phoneToContact,
      address
    } = newOrder

    // Check if the restaurant and user exist
    const restaurant = await Restaurant.findById(restaurantId)
    if(!restaurant) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.notFound,
          message: errorMessages.restaurantService.noSuchRestaurant
        }
      }
    }

    const user = await User.findById(userId)
    if(!user) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.notFound,
          message: errorMessages.userService.noSuchUser
        }
      }
    }
    
    // Check if all the foods exist in the specified restaurant
    const existingFoods = []
    let allFoodsExist = true
    for(const food of foods) {
      const existingFood = await Food.findOne({ _id: food.food, restaurant: restaurantId }).exec()

      if(!existingFood) {
        allFoodsExist = false
        break
      }
      existingFoods.push({ food: existingFood, count: food.count })
    }
    
    if(!allFoodsExist) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.badRequest,
          message: errorMessages.foodService.notAllOrderFoodsMatch
        }
      }
    }

    const totalPrice = existingFoods.reduce((acm, food) => {
      return acm + food.food.price*food.count
    }, 0)
    const totalSum = existingFoods.reduce((acm, food) => {
      return acm + food.food.price * food.count * (100 - food.food.discountPercentage)/100
    }, 0)

    // Creating the new order
    let addedOrder = await Order.create({
      restaurant: restaurant._id,
      user: user._id,
      foods,
      address,
      phoneToContact,
      totalPrice,
      totalSum,
      state: 'preparing'
    })

    addedOrder = await addedOrder.populate('restaurant', '_id name image address rating ratingsCount')
    addedOrder = await addedOrder.populate('foods.food')
    
    return {
      success: true,
      outputs: {
        order: addedOrder
      }
    }

  } catch(error) {
    console.log('Error while creating the new order: ', error)
    return {
      success: false,
      error: {
        statusCode: statusCodes.ise,
        message: errorMessages.shared.ise
      }
    }
  }
}

// ----------------------------------------------------------------------------

const getOrder = async (orderId: string, ownerId: objectId): Promise<IResponse> => {
  try {

    // Make sure the order exists
    const order = await Order.findById(orderId)
      .populate('restaurant')
      .populate('foods.food')
    .exec()

    if(!order) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.notFound,
          message: errorMessages.shared.notFound
        }
      }
    }

    const restaurant = await Restaurant.findOne({ admin: ownerId })

    // Check for ownership
    const admin = await Admin.findById(ownerId).exec()
    const user = await User.findById(ownerId).exec()
    
    if(admin) {
      if(admin._id.toString() !== restaurant?.admin.toString()) {
        return {
          success: false,
          error: {
            statusCode: statusCodes.forbidden,
            message: errorMessages.shared.permissionsRequired
          }
        }
      }
    } else if(user) {
      if(user._id.toString() !== order.user.toString()) {
        return {
          success: false,
          error: {
            statusCode: statusCodes.forbidden,
            message: errorMessages.shared.permissionsRequired
          }
        }
      }
    } else {
      // Technically impossible
      return {
        success: false,
        error: {
          statusCode: statusCodes.unauthorized,
          message: errorMessages.shared.unauthorized
        }
      }
    }

    return {
      success: true,
      outputs: {
        order
      }
    }
  } catch(error) {
    console.log('Error while getting the order: ', error)
    return {
      success: false,
      error: {
        statusCode: statusCodes.ise,
        message: errorMessages.shared.ise
      }
    }
  }
}

// ----------------------------------------------------------------------------

const getOrdersOfCurrentAdmin = async (
  adminId: objectId,
  options: {
    limit?: number
    skip?: number
    sortBy?: string
    sortOrder?: string
    search?: string
  }
): Promise<IResponse> => {
  try {
    // Find the current admin's restaurant
    const restaurant = await Restaurant.findOne({ admin: adminId }).exec()
    if(!restaurant) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.notFound,
          message: errorMessages.shared.notFound
        }
      }
    }

    const { limit, skip, sortBy, sortOrder, search } = options

    // Create and fill the query options object
    const queryOptions: { [key: string]: any } = {}
    
    if(limit) {
      queryOptions['limit'] = limit
    }
    if(skip) {
      queryOptions['skip'] = skip
    }
    if(sortBy) {
      queryOptions['sort'] = {}
      queryOptions['sort'][`${sortBy}`] = sortOrder || 'asc'
    }

    const filter: { [key: string]: any } = { restaurant: restaurant._id }
    if(search) {
      filter.state = search
    }
    
    // Fetch the orders
    const count = await Order.countDocuments(filter)
    const orders = await Order.find(filter, {}, queryOptions)
      .populate('foods.food')
    .exec()

    return {
      success: true,
      outputs: { 
        count,
        orders
      }
    }
  } catch(error) {
    console.log('Error while getting the orders: ', error)
    return {
      success: false,
      error: {
        statusCode: statusCodes.ise,
        message: errorMessages.shared.ise
      }
    }
  }
}

// ----------------------------------------------------------------------------

const getOrdersOfCurrentUser = async (
  userId: objectId,
  options: {
    limit?: number
    skip?: number
    sortBy?: string
    sortOrder?: string
    search?: string
  }
): Promise<IResponse> => {
  try {
    const { limit, skip, sortBy, sortOrder, search } = options

    // Create and fill the query options object
    const queryOptions: { [key: string]: any } = {}
    
    if(limit) {
      queryOptions['limit'] = limit
    }
    if(skip) {
      queryOptions['skip'] = skip
    }
    if(sortBy) {
      queryOptions['sort'] = {}
      queryOptions['sort'][`${sortBy}`] = sortOrder || 'asc'
    }
    
    const filter: { [key: string]: any } = { user: userId }
    if(search) {
      filter.state = search
    }
    
    // Fetch the orders
    const count = await Order.countDocuments(filter)
    const orders = await Order.find(filter, {}, queryOptions)
      .populate('restaurant', '_id name image address rating ratingsCount')
      .populate('foods.food')
    .exec()

    return {
      success: true,
      outputs: { 
        count,
        orders
      }
    }
  } catch(error) {
    console.log('Error while getting the orders: ', error)
    return {
      success: false,
      error: {
        statusCode: statusCodes.ise,
        message: errorMessages.shared.ise
      }
    }
  }
}

// ----------------------------------------------------------------------------

const updateOrderState = async (orderId: string, adminId: objectId, newState: string): Promise<IResponse> => {
  try {
    // Make sure the admin exists
    const restaurant = await Restaurant.findOne({ admin: adminId }).exec()

    if(!restaurant) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.forbidden,
          message: errorMessages.shared.permissionsRequired
        }
      }
    }

    // Check existence and ownership of the order
    const order = await Order.findOne({ _id: orderId, restaurant: restaurant._id })
      .populate('restaurant')
    .exec()

    if(!order) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.notFound,
          message: errorMessages.shared.notFound
        }
      }
    }
    

    // Check if the state update is valid
    const validStates: { [key: string]: string[] } = {
      preparing : ['delivering'],
      delivering : ['delivered', 'canceled'],
      delivered : [],
      canceled : []
    }
    
    const currentState = order.state
    if(!validStates[currentState].includes(newState)) {
      return  {
        success: false,
        error: {
          statusCode: statusCodes.badRequest,
          message: errorMessages.orderService.invalidState
        } 
      }
    }

    // Update the order
    const updatedOrder = await Order
      .findByIdAndUpdate(orderId, { state: newState }, { new: true })
        .populate('restaurant', '_id name image address rating ratingsCount')
        .populate('foods.food')
      .exec()

    return {
      success: true,
      outputs: {
        updatedOrder
      }
    }

  } catch(error) {
    console.log('Error while updating the order: ', error)
    return {
      success: false,
      error: {
        statusCode: statusCodes.ise,
        message: errorMessages.shared.ise
      }
    }
  }
}

// ----------------------------------------------------------------------------

const rateOrder = async (
    orderId: string, 
    userId: objectId, 
    ratings: {
      food: string
      rating: number
    }[]
  ): Promise<IResponse> => {
  try {
    // Check existence and ownership of the order
    const order = await Order.findOne({ _id: orderId, user: userId }).exec()
    if(!order) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.notFound,
          message: errorMessages.shared.notFound
        }
      }
    }

    const restaurant = await Restaurant.findById(order?.restaurant).exec()

    // Apply the ratings
    // For foods
    const validRatings = []
    for(const rating of ratings) {
      let isFoodPresentInOrder = false
      for(const food of order.foods) {
        if(food.food.toString() == rating.food) isFoodPresentInOrder = true
      }

      if(isFoodPresentInOrder) {
        validRatings.push(rating.rating)
        const food = await Food.findById(rating.food).exec()
        if(food) {
          const newRating = (food.rating * food.ratingsCount + rating.rating) / (food.ratingsCount + 1)
          await Food.findByIdAndUpdate(rating.food, { rating: newRating, ratingsCount: food.ratingsCount + 1 }, { new: true}).exec()
        }
      }
    }

    // For restaurant
    const total = ratings.reduce((acm, rating) => {
      return acm + rating.rating
    }, 0)
    if(restaurant) { // For type error
      const newRatingsCount = restaurant.ratingsCount + validRatings.length
      const newRating = (restaurant.rating*restaurant.ratingsCount + total) / newRatingsCount
      await Restaurant.findByIdAndUpdate(restaurant._id, { rating: newRating, ratingsCount: newRatingsCount }, { new: true }).exec()
    }

    await Order.findByIdAndUpdate(orderId, { isRated: true }).exec()

    return {
      success: true
    }

  } catch(error) {
    console.log('Error while rating the order: ', error)
    return {
      success: false,
      error: {
        statusCode: statusCodes.ise,
        message: errorMessages.shared.ise
      }
    }
  }
}



export default {
  addOrder,
  getOrder,
  getOrdersOfCurrentAdmin,
  getOrdersOfCurrentUser,
  updateOrderState,
  rateOrder
}