import mongoose, { Document, Schema, ObjectId as objectId } from "mongoose"
const ObjectId = mongoose.Types.ObjectId

export interface IFood extends Document {
  name: string
  ingredients: string
  category: string
  image: string
  price: number
  discountPercentage: number
  restaurant: objectId
  rating: number
  ratingsCount: number
  createAt: Date
  updatedAt: Date
}

const foodSchema = new Schema<IFood>({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  ingredients: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true
  },
  discountPercentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
    required: true
  },
  restaurant: {
    type: ObjectId,
    ref: 'Restaurant',
    required: true
  },
  rating: {
    type: Number,
    default: 0,
    required: true
  },
  ratingsCount: {
    type: Number,
    default: 0,
    required: true
  },
}, { 
  timestamps: true
})

foodSchema.methods.toJSON = function() {
  const food = this
  const foodObject = food.toObject()

  return foodObject
}

const Food = mongoose.model<IFood>('Food', foodSchema)

export default Food