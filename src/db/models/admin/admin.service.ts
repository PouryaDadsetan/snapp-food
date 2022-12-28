import Admin, { IAdmin } from "./admin"
import { IResponse } from "../../../controllers/helper"
import { statusCodes, errorMessages } from "../../../utils/constants"
import { encrypt, decrypt } from "../../../utils/helpers/encryption"
import { generateToken } from "../../../utils/helpers/token"
import mongoose, { ObjectId as objectId } from "mongoose"
const ObjectId = mongoose.Types.ObjectId

const addAdmin = async (
  currentAdminIsGodAdmin: boolean,
  newAdmin: {
    email: string
    password: string
    phone: string
    name: string
  }
): Promise<IResponse> => {

  try {
    const { email, password, phone, name } = newAdmin

    // checking godAdmin permissions
    if(!currentAdminIsGodAdmin) {
      return {
        success: false,
        error: {
          message: errorMessages.adminService.godAdminRoleRequired,
          statusCode: statusCodes.badRequest
        }
      }
    }

    // checking email availability
    const existingAdminWithThisEmail = await Admin.findOne({ email }).exec()

    if(existingAdminWithThisEmail) {
      return {
        success: false,
        error: {
          message: errorMessages.adminService.emailAlreadyTaken,
          statusCode: statusCodes.badRequest
        }
      }
    }

    // checking phone availability
    const existingAdminWithThisPhone = await Admin.findOne({ phone }).exec()

    if(existingAdminWithThisPhone) {
      return {
        success: false,
        error: {
          message: errorMessages.adminService.phoneAlreadyTaken,
          statusCode: statusCodes.badRequest
        }
      }
    }

    const createdAdmin = await Admin.create({
      email,
      password: encrypt(password),
      phone,
      name
    })

    return {
      success: true,
      outputs: {
        admin: createdAdmin
      }
    }
  } catch(error) {
    console.log('Error while creating new admin: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//-------------------------------------------

const createGodAdmin = async (
  godAdmin: {
    email: string,
    password: string,
    phone: string,
    name: string
  }
  ): Promise<IResponse> => {

  try {
    const { email, password, phone, name } = godAdmin
    // checking godAdmin existence
    const existingGodAdmin = await Admin.findOne({ isGodAdmin: true }).exec()
    if(existingGodAdmin) {
      return {
        success: false,
        error: {
          message: errorMessages.adminService.godAdminAlreadyExists,
          statusCode: statusCodes.badRequest
        }
      }
    }

    const createdGodAdmin = await Admin.create({
      isGodAdmin: true,
      email,
      password: encrypt(godAdmin.password),
      phone,
      name,
      isVerified: true
    })
    
    return {
      success: true,
      outputs: {
        godAdmin: createdGodAdmin
      }
    }
  } catch(error) {
    console.log('Error while creating new admin: ', error)

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

const login = async (
  email: string, 
  password: string
): Promise<IResponse> => {
  try {
    const admin = await Admin.findOne({ email }).exec()
    
    if(!admin || password !== decrypt(admin.password)) {
      return {
        success: false,
        error: {
          message: errorMessages.adminService.incorrectCredentials,
          statusCode: statusCodes.badRequest
        }
      }
    }

    const token = generateToken(admin._id, "admin")

    return {
      success: true,
      outputs: {
        admin,
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

//---------------------------------------------

const forgetPassword = async (email: string): Promise<IResponse> => {
  try {
    const admin = await Admin.findOne({ email }).exec()

    if(!admin) {
      return {
        success: false,
        error: {
          message: errorMessages.adminService.emailNotFound,
          statusCode: statusCodes.notFound
        }
      }
    }

    // TODO: send an email

    return {
      success: true
    }

  } catch(error) {
    console.log('Error while password recovery: ', error)

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

const changePassword = async (adminId: string, oldPassword: string, newPassword: string): Promise<IResponse> => {
  try {
    // Checking old password to be correct
    const admin = await Admin.findById(adminId).exec()
    if(!admin || oldPassword !== decrypt(admin.password)) {
      return {
        success: false,
        error: {
          message: errorMessages.adminService.incorrectPassword,
          statusCode: statusCodes.badRequest
        }
      }
    }

    await Admin.findByIdAndUpdate(adminId, { $set: { password: encrypt(newPassword) }}).exec()

    return {
      success: true
    }

  } catch(error) {
    console.log('Error while changing password: ', error)

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

const getAdmin = async (
  currentAdminIsGodAdmin: boolean,
  adminId: string
): Promise<IResponse> => {
  try {
    // checking godAdmin permissions
    if(!currentAdminIsGodAdmin) {
      return {
        success: false,
        error: {
          message: errorMessages.adminService.godAdminRoleRequired,
          statusCode: statusCodes.badRequest
        }
      }
    }

    const admin = await Admin.findById(adminId)
    if(!admin) {
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
        admin
      }
    }

  } catch(error) {
    console.log('Error while getting admin: ', error)

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

const getCurrentAdmin = async (adminId: string): Promise<IResponse> => {
  try {
    const admin = await Admin.findById(adminId)
    if(!admin) {
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
        admin
      }
    }

  } catch(error) {
    console.log('Error while getting current admin: ', error)

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

const editCurrentAdmin = async (
  adminId: string,
  adminUpdates: {
    email?: string
    phone?: string
    name?: string
  }
): Promise<IResponse> => {

  try {

    // checking adminUpdates object to not be empty
    if(Object.keys(adminUpdates).length == 0) {
      return {
        success: false,
        error: {
          message: errorMessages.shared.noChanges,
          statusCode: statusCodes.badRequest
        }
      }
    }

    // checking email availability
    if(adminUpdates.email) {
      const existingAdminWithThisEmail = await Admin.findOne({ email: adminUpdates.email }).exec()

      if(existingAdminWithThisEmail) {
        return {
          success: false,
          error: {
            message: errorMessages.adminService.emailAlreadyTaken,
            statusCode: statusCodes.badRequest
          }
        }
      }
    }

    // checking phone availability
    if(adminUpdates.phone) {
      const existingAdminWithThisPhone = await Admin.findOne({ phone: adminUpdates.phone }).exec()
    
      if(existingAdminWithThisPhone) {
        return {
          success: false,
          error: {
            message: errorMessages.adminService.phoneAlreadyTaken,
            statusCode: statusCodes.badRequest
          }
        }
      }
    }
    
    const updatedAdmin = await Admin.findByIdAndUpdate(adminId, adminUpdates, { new: true }).exec()

    if(!updatedAdmin) {
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
        admin: updatedAdmin
      }
    }
  } catch(error) {
    console.log('Error while updating current admin: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//----------------------------------------------------------------

const deleteAdmins = async (
  currentAdminIsGodAdmin: boolean, 
  idList: string[]
): Promise<IResponse> => {
  try {
    // checking godAdmin permissions
    if(!currentAdminIsGodAdmin) {
      return {
        success: false,
        error: {
          message: errorMessages.adminService.godAdminRoleRequired,
          statusCode: statusCodes.badRequest
        }
      }
    }

    const filter = {
      _id : { $in: idList },
      isGodAdmin: false
    }

    const admins = await Admin.find(filter)

    // deleting admins
    for(const admin of admins) {
      await Admin.findByIdAndDelete(admin._id).exec()
      // TODO: Delete restaurant of deleted admin
    }

    return {
      success: true
    }

  } catch(error) {
    console.log('Error while deleting admins: ', error)

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

const getAdmins = async (
  currentAdminIsGodAdmin: boolean,
  options: {
    limit?: number,
    skip?: number,
    sortBy?: string,
    sortOrder?: string,
    search?: string
  }
): Promise<IResponse> => {
  try {
    // checking godAdmin permissions
    if(!currentAdminIsGodAdmin) {
      return {
        success: false,
        error: {
          message: errorMessages.adminService.godAdminRoleRequired,
          statusCode: statusCodes.badRequest
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

    const filter: { [key: string]: any } = {}
    if(search) {
      filter.name = { $regex: search }
    }
    
    // Fetch the admins
    const count = await Admin.countDocuments(filter)
    const admins = await Admin.find(filter, {}, queryOptions).exec()

    return {
      success: true,
      outputs: { 
        count,
        admins
      }
    }

  } catch(error) {
    console.log('Error while getting admins: ', error)

    return {
      success: false,
      error: {
        message: errorMessages.shared.ise,
        statusCode: statusCodes.ise
      }
    }
  }
}

//----------------------------------------------------------

export default {
  addAdmin,
  createGodAdmin,
  login,
  getAdmins,
  getAdmin,
  getCurrentAdmin,
  editCurrentAdmin,
  deleteAdmins,
  forgetPassword,
  changePassword
}