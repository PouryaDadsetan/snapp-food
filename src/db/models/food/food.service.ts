import { ObjectId as objectId } from 'mongoose'

import { IResponse } from "../../../controllers/helper"
import { statusCodes, errorMessages } from "../../../utils/constants"
import Restaurant from '../restaurant/restaurant'
import Comment from '../comment/comment'
import Food from './food'
import filesHelper from '../../../utils/helpers/files'

const addFood = async (
  adminId: objectId,
  newFood: { 
    name: string
    ingredients: string
    category: string
    image: Express.Multer.File | undefined
    price: number
    discountPercentage: number
  }
): Promise<IResponse> => {
  try {
    const { name, ingredients, category, image, price, discountPercentage } = newFood

    // Finding admin restaurant
    const restaurant = await Restaurant.findOne({ admin: adminId }).exec()
    if(!restaurant) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.badRequest,
          message: errorMessages.foodService.adminHasNoRestaurant
        }
      }
    }

    // Checking for availability
    const existingFood = await Food.findOne({ name, restaurant: restaurant._id }).exec()
    if(existingFood) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.badRequest,
          message: errorMessages.shared.nameMustBeUnique
        }
      }
    }

    // Saving the image
    let fileName: string = ''
    if(image) {
      fileName = filesHelper.saveFile(image)
    }

    // Creating the new food
    const addedFood = await Food.create({
      name,
      ingredients,
      category,
      image: fileName,
      price,
      discountPercentage,
      restaurant: restaurant._id
    })

    return {
      success: true,
      outputs: {
        food: addedFood
      }
    }

  } catch(error) {
    console.log('Error while creating the new food: ', error)
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

const getFood = async (foodId: string): Promise<IResponse> => {
  try {
    // Find and return the food
    const food = await Food.findById(foodId).exec()
    if(!food) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.notFound,
          message: errorMessages.shared.notFound
        }
      }
    }

    return {
      success: true,
      outputs: { food }
    }

  } catch(error) {
    console.log('Error while getting the food: ', error)
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

const getFoods = async (
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

    const filter: { [key: string]: any } = {}
    if(search) {
      filter.name = { $regex: search }
    }

    // Fetch the foods
    const count = await Food.countDocuments(filter)
    let foods = await Food.find(filter, {}, queryOptions).exec()

    return {
      success: true,
      outputs: { 
        count,
        foods
      }
    }

  } catch(error) {
    console.log('Error while getting the foods: ', error)
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

const getFoodsByRestaurantId = async (restaurantId: string): Promise<IResponse> => {
  try {
    // Checking if restaurant exists
    const restaurant = await Restaurant.findById(restaurantId).exec()
    if(!restaurant) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.notFound,
          message: errorMessages.shared.notFound
        }
      }
    }
  
    const foods = await Food.find({ restaurant: restaurantId }).exec()

    return {
      success: true,
      outputs: {
        foods
      }
    }

  } catch(error) {
    console.log('Error while getting the foods by restaurantId: ', error)
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

const getFoodsOfCurrentAdmin = async (adminId: string): Promise<IResponse> => {
  try {
    // Finding admin restaurant
    const restaurant = await Restaurant.findOne({ admin: adminId }).exec()
    if(!restaurant) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.badRequest,
          message: errorMessages.foodService.adminHasNoRestaurant
        }
      }
    }
  
    const foods = await Food.find({ restaurant: restaurant._id }).exec()

    return {
      success: true,
      outputs: {
        foods
      }
    }

  } catch(error) {
    console.log('Error while getting the foods by restaurantId: ', error)
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

const getFoodsByCategory = async (
  category: string,
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

    const filter: { [key: string]: any } = { category }
    if(search) {
      filter.name = { $regex: search }
    }

    // Fetch the foods
    const count = await Food.countDocuments(filter)
    let foods = await Food.find(filter, {}, queryOptions).exec()

    return {
      success: true,
      outputs: { 
        count,
        foods
      }
    }

  } catch(error) {
    console.log('Error while getting the foods by category: ', error)
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

const editFood = async (
  adminId: string,
  foodId: string, 
  updates: { 
    name?: string
    ingredients?: string
    category?: string
    image?: Express.Multer.File | undefined | string
    price?: number
    discountPercentage?: number
  }
): Promise<IResponse> => {
  try {
    // Finding admin restaurant
    const restaurant = await Restaurant.findOne({ admin: adminId }).exec()
    if(!restaurant) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.badRequest,
          message: errorMessages.foodService.adminHasNoRestaurant
        }
      }
    }

    // Make sure the record exists
    const food = await Food.findOne({ _id: foodId, restaurant: restaurant._id }).exec()
    if(!food) {
      return {
        success:false,
        error: {
          statusCode: statusCodes.notFound,
          message: errorMessages.shared.notFound
        }
      }
    }

    // Make sure there are changes in updates
    if((Object.keys(updates)).length === 0) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.badRequest,
          message: errorMessages.shared.noChanges
        }
      }
    }

    // Checking for availability
    if(updates.name) {
      const { name } = updates
      const existingFood = await Food.findOne({ name, restaurant: restaurant._id }).exec()
      if(existingFood && existingFood._id.toString() ==! foodId) {
        return {
          success: false,
          error: {
            statusCode: statusCodes.badRequest,
            message: errorMessages.shared.nameMustBeUnique
          }
        }
      }
    }

    // Saving the image in the database
    if(updates.image) {
      filesHelper.deleteFile(restaurant.image)
      const fileName = filesHelper.saveFile(updates.image as Express.Multer.File)
      updates.image = fileName
    }

    // Update the food
    const updatedFood = await Food.findByIdAndUpdate(foodId, updates, { new: true }).exec()
    return {
      success: true,
      outputs: {
        food: updatedFood
      }
    }

  } catch(error) {
    console.log('Error while updating the food: ', error)
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

const deleteFoods = async (adminId: string, idList: string): Promise<IResponse> => {
  try {
    // Finding admin restaurant
    const restaurant = await Restaurant.findOne({ admin: adminId }).exec()
    if(!restaurant) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.badRequest,
          message: errorMessages.foodService.adminHasNoRestaurant
        }
      }
    }
    for(const id of idList) {
      // Find and delete the food
      const deletedFood = await Food.findOneAndDelete({ _id: id, restaurant: restaurant._id })
        .populate('comments', '_id').exec()
      if(deletedFood) {
        // Delete comments of the deleted food
        for(const comment of deletedFood.comments) {
          await Comment.findByIdAndDelete(comment._id).exec()
        }
        // Delete the potential image
        filesHelper.deleteFile(deletedFood.image)
      }
    }

    return {
      success: true
    }
    
  } catch(error) {
    console.log('Error while deleting the foods: ', error)
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
  addFood,
  getFood,
  getFoods,
  getFoodsByRestaurantId,
  getFoodsOfCurrentAdmin,
  getFoodsByCategory,
  editFood,
  deleteFoods
}