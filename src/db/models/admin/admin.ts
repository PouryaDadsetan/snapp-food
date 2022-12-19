import mongoose, { Schema, Document, ObjectId as objectId } from "mongoose"

export interface IAdmin extends Document {
  isGodAdmin: boolean
  email: string
  phone: string
  password: string
  name: string
  createdAt: Date
  updatedAt: Date
}

const adminSchema = new Schema<IAdmin>({
  isGodAdmin: {
    type: Boolean,
    default: false,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  phone: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: { 
    type: String,
    required: true
  },
}, {
  timestamps: true
})

adminSchema.methods.toJSON = function() {
  const admin = this
  const adminObject = admin.toObject()
  
  // Deleting user password
  delete adminObject.password

  return adminObject
}


const Admin = mongoose.model<IAdmin>("Admin", adminSchema)

export default Admin
