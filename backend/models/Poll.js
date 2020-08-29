import mongoose from 'mongoose'
import Item from './Item'

const Poll = mongoose.model('Poll', {
  title: {
    type: String,
    required: true,
    unique: true
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
  items: [Item]
})


export default Poll

