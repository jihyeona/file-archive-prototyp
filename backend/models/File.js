import mongoose from 'mongoose';

const File = mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  imageUrl: String,
  imageId: String,
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
});

export default File;
