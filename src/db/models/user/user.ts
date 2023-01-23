import mongoose, { Schema, Document, ObjectId as objectId } from "mongoose"

const ObjectId = mongoose.Types.ObjectId

export interface IUser extends Document {
  name: string
  email: string
  phone: string
  password: string
  addresses: string[]
  isVerified: boolean
  createdAt: Date
  updatedAt: Date
}

const userSchema = new Schema<IUser>({
  name: { 
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  phone: {
    type: String
  },
  password: { 
    type: String,
    required: true
  },
  addresses: [{
    type: String
  }],
  isVerified: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  timestamps: true
})

userSchema.methods.toJSON = function() {
  const user = this
  const userObject = user.toObject()

  // Converting timestamps to unix time
  // if(userObject.createAt) {
  //   userObject.createdAt = Math.floor(new Date(userObject.createdAt).getTime() / 1000)
  // }
  // if(userObject.updatedAt) {
  //   userObject.updatedAt = Math.floor(new Date(userObject.updatedAt).getTime() / 1000)
  // }

  // Deleting user password
  delete userObject.password

  return userObject
}

const User = mongoose.model<IUser>("User", userSchema)

export default User
