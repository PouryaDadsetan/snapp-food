import mongoose, { Document, Schema, ObjectId as objectId } from "mongoose"
const ObjectId = mongoose.Types.ObjectId

interface IRestaurant extends Document {
  name: string
  city: string
  address: string
  image: string
  categories: string[]
  registrationNumber: string
  rating: number
  ratingsCount: number
  admin: objectId
  isVerified: boolean
  foods: { // Virtual field
    _id: objectId
  }[]
  createAt: Date
  updatedAt: Date
}

const restaurantSchema = new Schema<IRestaurant>({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true
  },
  // This is going to be the name(s) of the stored file(s)
  image: {
    type: String,
    default: ''
  },
  categories: [{
    type: String,
    required: true
  }],
  registrationNumber: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    default: 0
  },
  ratingsCount: {
    type: Number,
    required: true,
    default: 0
  },
  admin: {
    type: ObjectId,
    ref: 'Admin',
    required: true
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false
  }
}, { 
  timestamps: true
})

restaurantSchema.virtual('foods', {
  ref: 'Food',
  localField: '_id',
  foreignField: 'restaurant'
})

const Restaurant = mongoose.model<IRestaurant>('Restaurant', restaurantSchema)

export default Restaurant