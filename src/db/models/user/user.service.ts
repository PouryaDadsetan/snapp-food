import User, { IUser } from "./user"
import { IResponse } from "../../../controllers/helper"
import { statusCodes, errorMessages } from "../../../utils/constants"
import { generateToken } from "../../../utils/helpers/token"
import mongoose, { ObjectId as objectId } from "mongoose"
import { decrypt, encrypt } from "../../../utils/helpers/encryption"
const ObjectId = mongoose.Types.ObjectId

const signup = async (email: string, password: string): Promise<IResponse> => {
  try {
    // Checking email availability
    const existingUserWithThisEmail = await User.findOne({ email }).exec()
    if(existingUserWithThisEmail) {
      return {
        success: false,
        error: {
          statusCode: statusCodes.badRequest,
          message: errorMessages.userService.emailAlreadyTaken
        }
      }
    }
    // Creating new user
    const newUser = {
      email,
      password: encrypt(password)
    }
    const createdUser = await User.create(newUser)

    const token = generateToken(createdUser._id, "user")

    // TODO: send activation email
    return {
      success: true,
      outputs: {
        user: createdUser,
        token
      }
    }

  } catch(error) {
    console.log('Error while user sign up: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//------------------------------------------------

const login = async (email: string, password: string): Promise<IResponse> => {
  try {
    const user = await User.findOne({ email }).exec()

    if(!user || password !== decrypt(user.password)) {
      return {
        success: false,
        error: {
          message: errorMessages.userService.incorrectCredentials,
          statusCode: statusCodes.badRequest
        }
      }
    }

    const token = generateToken(user._id, "user")

    return {
      success: true,
      outputs: {
        user,
        token
      }
    }

  } catch(error) {
    console.log('Error while logging in: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//-----------------------------------------------------------

// const logout = async (token: string): Promise<IResponse> => {
//   try {
//     // popping old token from tokens list
//     await User.findOneAndUpdate({ tokens: token }, { $pull: { tokens: token }}).exec()

//     return {
//       success: true
//     }

//   } catch(error) {
//     console.log('Error while logging out: ', error)

//     return {
//       success: false,
//       error: {
//         message: errorMessages.shared.ise,
//         statusCode: statusCodes.ise
//       }
//     }
//   }
// }

//--------------------------------------------------

const getUser = async (userId: objectId): Promise<IResponse> => {
  try {
    const user = await User.findById(userId).exec()

    if(!user) {
      return {
        success: false,
        error: {
          message: errorMessages.shared.notFound,
          statusCode: statusCodes.notFound
        }
      }
    }

    return {
      success: true,
      outputs: {
        user
      }
    }

  } catch(error) {
    console.log('Error while getting user: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//----------------------------------------

const editUser = async (
  userId: string,
  updates: {
    name?: string
    email?: string
    phone?: string
    addresses?: string[]
    isVerified?: boolean
  }
): Promise<IResponse> => {

  try {
    // checking updates object to not be empty
    if(Object.keys(updates).length == 0) {
      return {
        success: false,
        error: {
          message: errorMessages.shared.noChanges,
          statusCode: statusCodes.badRequest
        }
      }
    }

    // checking email availability
    if(updates.email) {
      const existingUserWithThisEmail = await User.findOne({ email: updates.email }).exec()

      if(existingUserWithThisEmail) {
        return {
          success: false,
          error: {
            message: errorMessages.userService.emailAlreadyTaken,
            statusCode: statusCodes.badRequest
          }
        }
      }
    }

    // Setting isVerified to true if phone exists
    if(updates.phone) {
      updates.isVerified = true
    }
    
    // Updating user
    const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true }).exec()

    if(!updatedUser) {
      return {
        success: false,
        error: {
          message: errorMessages.shared.notFound,
          statusCode: statusCodes.badRequest
        }
      }
    }

    return {
      success: true,
      outputs: {
        user: updatedUser
      }
    }
  } catch(error) {
    console.log('Error while updating an admin: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//---------------------------------------------

const changePassword = async (userId: string, oldPassword: string, newPassword: string): Promise<IResponse> => {
  try {
    // Checking old password to be correct
    const user = await User.findById(userId).exec()
    if(!user || oldPassword !== decrypt(user.password)) {
      return {
        success: false,
        error: {
          message: errorMessages.userService.incorrectPassword,
          statusCode: statusCodes.badRequest
        }
      }
    }
    // Updating user password
    await User.findByIdAndUpdate(userId, { $set: { password: encrypt(newPassword) }}).exec()

    return {
      success: true
    }

  } catch(error) {
    console.log('Error while changing user password: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//----------------------------------------

const deleteUser = async (userId: string): Promise<IResponse> => {
  try {
    await User.findByIdAndDelete(userId)

    return {
      success: true
    }
    
  } catch(error) {
    console.log('Error while deleting user: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

export default {
  signup,
  login,
  getUser,
  editUser,
  changePassword,
  deleteUser
}