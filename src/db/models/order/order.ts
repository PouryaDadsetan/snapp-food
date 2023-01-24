import mongoose, { Document, Schema, ObjectId as objectId } from "mongoose"
const ObjectId = mongoose.Types.ObjectId

interface IOrder extends Document {
  restaurant: objectId
  user: objectId
  foods: {
    food: objectId
    count: number
  }[]
  address: string
  phoneToContact: string
  totalPrice: number
  totalSum: number
  state: string
  isRated: boolean
  createAt: Date
  updatedAt: Date
}

const orderSchema = new Schema<IOrder>({
  restaurant: {
    type: ObjectId,
    required: true,
    ref: 'Restaurant'
  },
  user: {
    type: ObjectId,
    required: true,
    ref: 'User'
  },
  foods: [{
    food: {
      type: ObjectId,
      required: true,
      ref: 'Food'
    },
    count: {
      type: Number,
      required: true
    }
  }],
  address: {
    type: String,
    required: true
  },
  phoneToContact: {
    type: String,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  totalSum: {
    type: Number,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  isRated: {
    type: Boolean,
    required: true,
    default: false
  }
}, { 
  timestamps: true
})

const Order = mongoose.model<IOrder>('Order', orderSchema)

export default Order