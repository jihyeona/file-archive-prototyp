import mongoose from 'mongoose';

const File = mongoose.model('File', {
  description: {
    type: String,
  },
  userName: {
    type: String,
    required: true,
  },
  fileName: String,
  imageUrl: String,
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
});

export default File;
