import mongoose from 'mongoose'
import Like from './Like'

const Item = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: String,
  imageId: String,
  createdAt: {
    type: Date,
    default: () => new Date()
  },
  userId: {
    type: String,
    required: true
  },
  likes: [Like]
})

export default Item
