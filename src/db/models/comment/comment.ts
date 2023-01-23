import mongoose, { Document, Schema, ObjectId as objectId } from "mongoose"
const ObjectId = mongoose.Types.ObjectId

export interface IComment extends Document {
  food: objectId
  user: objectId
  message: string
  createAt: Date
  updatedAt: Date
}

const commentSchema = new Schema<IComment>({
  food: {
    type: ObjectId,
    required: true,
    ref: 'Food'
  },
  user: {
    type: ObjectId,
    required: true,
    ref: 'User'
  },
  message: {
    type: String,
    required: true,
  },
}, { 
  timestamps: true
})

commentSchema.methods.toJSON = function() {
  const comment = this
  const commentObject = comment.toObject()

  return commentObject
}

const Comment = mongoose.model<IComment>('Comment', commentSchema)

export default Comment