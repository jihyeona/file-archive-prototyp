import mongoose from 'mongoose'

const Like = mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: () => new Date()
  }
})

export default Like
