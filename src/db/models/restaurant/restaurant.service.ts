import { ObjectId as objectId } from 'mongoose'

import Restaurant from './restaurant'
import Admin from '../admin/admin'
import { IResponse } from "../../../controllers/helper"
import { statusCodes, errorMessages } from "../../../utils/constants"
import filesHelper from '../../../utils/helpers/files'
import Food from '../food/food'

const addRestaurant = async (
  adminId: objectId,
  newRestaurant: { 
    name: string
    city: string
    address: string
    image: Express.Multer.File | undefined
    categories: string[]
    registrationNumber: string
  }
): Promise<IResponse> => {
  try {
    const { name, city, address, image, categories, registrationNumber } = newRestaurant

    // Checking for existing restaurant
    const existingRestaurant = await Restaurant.findOne({ admin: adminId }).exec()
    if(existingRestaurant) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.badRequest,
          message: errorMessages.adminService.existingRestaurant
        }
      }
    }

    // Saving the image
    let fileName: string = ''
    if(image) {
      fileName = filesHelper.saveFile(image)
    }

    // Creating the new restaurant
    const addedRestaurant = await Restaurant.create({
      name,
      city,
      address,
      image: fileName,
      categories,
      registrationNumber,
      admin: adminId
    })

    return {
      success: true,
      outputs: {
        restaurant: addedRestaurant
      }
    }

  } catch(error) {
    console.log('Error while creating the new restaurant: ', error)
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

const getRestaurant = async (restaurantId: string): Promise<IResponse> => {
  try {
    // Find and return the restaurant
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

    return {
      success: true,
      outputs: {
        restaurant
      }
    }

  } catch(error) {
    console.log('Error while getting the restaurant: ', error)
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

const getRestaurantOfCurrentAdmin = async (adminId: objectId): Promise<IResponse> => {
  try {
    // Find and return the restaurant
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

    return {
      success: true,
      outputs: {
        restaurant
      }
    }

  } catch(error) {
    console.log('Error while getting the restaurant: ', error)
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

const getRestaurants = async (
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

    // Fetch the restaurants
    const count = await Restaurant.countDocuments(filter)
    const restaurants = await Restaurant.find(filter, {}, queryOptions).exec()

    return {
      success: true,
      outputs: { 
        count,
        restaurants
      }
    }

  } catch(error) {
    console.log('Error while getting the restaurants: ', error)
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

const getRestaurantsByCity = async (
  city: string,
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

    const filter: { [key: string]: any } = { city }
    if(search) {
      filter.name = { $regex: search }
    }

    // Fetch the restaurants
    const count = await Restaurant.countDocuments(filter)
    const restaurants = await Restaurant.find(filter, {}, queryOptions).exec()

    return {
      success: true,
      outputs: { 
        count,
        restaurants
      }
    }

  } catch(error) {
    console.log('Error while getting the restaurants: ', error)
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

const getRestaurantsByCategory = async (
  city: string,
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

    const filter: { [key: string]: any } = { city, categories: category, isVerified: true }
    if(search) {
      filter.name = { $regex: search }
    }

    // Fetch the restaurants
    const count = await Restaurant.countDocuments(filter)
    const restaurants = await Restaurant.find(filter, {}, queryOptions).exec()

    return {
      success: true,
      outputs: { 
        count,
        restaurants
      }
    }

  } catch(error) {
    console.log('Error while getting the restaurants: ', error)
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

const editRestaurant = async (
  adminId: objectId,
  updates: { 
    name?: string
    city?: string
    address?: string
    image?: Express.Multer.File | undefined | string
    categories?: string[]
    registrationNumber?: string
  }
): Promise<IResponse> => {
  try {

    // Make sure the record exists
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

    // Not allowed to change registration number after verifying
    if(updates.registrationNumber && restaurant.isVerified) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.badRequest,
          message: errorMessages.restaurantService.changesNotAllowed
        }
      }
    }
    
    // Checking for availability
    if(updates.name) {
      const { name } = updates
      const restaurantWithExistingName = await Restaurant.findOne({ name }).exec()
      if(restaurantWithExistingName) {
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

    // Update the restaurant
    const updatedRestaurant = await Restaurant.findOneAndUpdate({ admin: adminId }, updates, { new: true }).exec()

    return {
      success: true,
      outputs: {
        restaurant: updatedRestaurant
      }
    }

  } catch(error) {
    console.log('Error while updating the restaurant: ', error)
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

const verifyRestaurant = async (isGodAdmin: boolean, restaurantId: string): Promise<IResponse> => {
  try {
    // Only godAdmin is allowed
    if(!isGodAdmin) {
      return {
        success: false,
        error: {
          message: errorMessages.shared.permissionsRequired,
          statusCode: statusCodes.forbidden
        }
      }
    }

    // Make sure the record exists
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

    // Update the restaurant
    const verifiedRestaurant = await Restaurant.findByIdAndUpdate(restaurantId, { isVerified: true }, { new: true }).exec()

    return {
      success: true,
      outputs: {
        restaurant: verifiedRestaurant
      }
    }

  } catch(error) {
    console.log('Error while verifying the restaurant: ', error)
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

const deleteRestaurants = async (isGodAdmin: boolean, idList: string): Promise<IResponse> => {
  try {
    // Only godAdmin is allowed
    if(!isGodAdmin) {
      return {
        success: false,
        error: {
          message: errorMessages.shared.permissionsRequired,
          statusCode: statusCodes.forbidden
        }
      }
    }

    for(const id of idList) {
      // Find and delete the restaurant
      const deletedRestaurant = await Restaurant.findByIdAndDelete(id)
        .populate('foods', '_id').exec()

      if(deletedRestaurant) {
        // Deleting the image of the deleted restaurant
        filesHelper.deleteFile(deletedRestaurant.image)

        // Deleting all foods of the deleted restaurant
        const foodIds = deletedRestaurant.foods.map((food) => food._id.toString())
        for(const foodId of foodIds) {
          // Find and delete the food
          const deletedFood = await Food.findByIdAndDelete(foodId).exec()
          if(deletedFood) {
            // Delete the potential image
            filesHelper.deleteFile(deletedFood.image)
          }
        }
      }
    }

    return {
      success: true
    }

  } catch(error) {
    console.log('Error while deleting the restaurants: ', error)
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
  addRestaurant,
  getRestaurant,
  getRestaurantOfCurrentAdmin,
  getRestaurants,
  getRestaurantsByCity,
  getRestaurantsByCategory,
  editRestaurant,
  verifyRestaurant,
  deleteRestaurants
}