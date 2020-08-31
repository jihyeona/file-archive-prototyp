import mongoose from 'mongoose';

const Message = mongoose.model('Message', {
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
});

export default Message;
