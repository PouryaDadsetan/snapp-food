import { ObjectId as objectId } from 'mongoose'

import { IResponse } from "../../../controllers/helper"
import { statusCodes, errorMessages } from "../../../utils/constants"
import Restaurant from '../restaurant/restaurant'
import Comment from './comment'
import filesHelper from '../../../utils/helpers/files'
import Food from '../food/food'

const addComment = async (
  newComment: { 
    foodId: string
    userId: string
    message: string
  }
): Promise<IResponse> => {
  try {
    const { foodId, userId, message } = newComment

    // Finding food
    const food = await Food.findById(foodId).exec()
    if(!food) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.badRequest,
          message: errorMessages.commentService.foodNotFound
        }
      }
    }

    // Creating the new comment
    let addedComment = await Comment.create({
      food: foodId,
      user: userId,
      message
    })
    addedComment = await addedComment.populate('user', 'name email')

    return {
      success: true,
      outputs: {
        comment: addedComment
      }
    }

  } catch(error) {
    console.log('Error while creating the new comment: ', error)
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

const getComment = async (commentId: string): Promise<IResponse> => {
  try {
    // Find and return the comment
    const comment = await Comment.findById(commentId)
      .populate('user', 'name email').exec()

    if(!comment) {
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
      outputs: { comment }
    }

  } catch(error) {
    console.log('Error while getting the comment: ', error)
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

const getCommentsByFoodId = async (
  foodId: string,
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

    const filter: { [key: string]: any } = { food: foodId }
    if(search) {
      filter.message = { $regex: search }
    }

    // Fetch the comments
    const count = await Comment.countDocuments(filter)
    let comments = await Comment.find(filter, {}, queryOptions)
      .populate('user', 'name email').exec()

    return {
      success: true,
      outputs: { 
        count,
        comments
      }
    }

  } catch(error) {
    console.log('Error while getting the comments by food id: ', error)
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

const editComment = async (
  userId: string,
  commentId: string, 
  updates: { 
    message?: string
  }
): Promise<IResponse> => {
  try {
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

    // Make sure the record exists and update the comment
    const updatedComment = await Comment.findOneAndUpdate({ _id: commentId, user: userId }, updates, { new: true })
      .populate('user', 'name email').exec()

    if(!updatedComment) {
      return {
        success:false,
        error: {
          statusCode: statusCodes.notFound,
          message: errorMessages.shared.notFound
        }
      }
    }

    return {
      success: true,
      outputs: {
        comment: updatedComment
      }
    }

  } catch(error) {
    console.log('Error while updating the comment: ', error)
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

const deleteComments = async (userId: string, idList: string): Promise<IResponse> => {
  try {
    for(const id of idList) {
      // Find and delete the comment
      await Comment.findOneAndDelete({ _id: id, user: userId }).exec()
    }

    return {
      success: true
    }
    
  } catch(error) {
    console.log('Error while deleting the comments: ', error)
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
  addComment,
  getComment,
  getCommentsByFoodId,
  editComment,
  deleteComments
}