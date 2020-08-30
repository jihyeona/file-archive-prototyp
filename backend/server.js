import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cloudinaryframework from 'cloudinary';
import multer from 'multer';
import cloudinaryStorage from 'multer-storage-cloudinary';
import File from './models/File';

const cloudinary = cloudinaryframework.v2;

dotenv.config();

cloudinary.config({
  cloud_name: 'dystmqbrf',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = cloudinaryStorage({
  cloudinary,
  params: {
    folder: 'uploads',
    allowedFormats: ['jpg', 'png', 'jpeg', 'pdf', 'xml'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
  },
});

const parser = multer({ storage });

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/fileAPI';
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);
mongoose.Promise = Promise;

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world');
});

// this is the endpoint to fetch the info of existing files
app.get('/files', async (req, res) => {
  const existingFiles = await File.find()
    .sort({ createdAt: 'desc' })
    .limit(5)
    .exec();
  if (existingFiles) {
    res.status(201).json(existingFiles);
  } else {
    res.status(401).json({ message: 'Could not find existing files' });
  }
});

// this is the endpoint to add a new file
app.post('/files', parser.single('fileimage'), async (req, res) => {
  try {
    const file = new File({
      description: req.body.description,
      userName: req.body.userName,
      imageUrl: req.file.path,
      imageId: req.file.filename,
    });
    const saved = await file.save();
    res.status(201).json({
      description: saved.description,
      userName: saved.userName,
      imageUrl: saved.imageUrl,
      imageId: saved.imageId,
      uploadId: saved._id,
    });
  } catch (err) {
    res.status(400).json({ errors: err.errors });
  }
});

// this is the endpoint to fetch the info of an existing file
app.get('/files/:uploadId', async (req, res) => {
  const { uploadId } = req.params;
  const file = await File.findById(uploadId);
  if (file) {
    res.status(201).json(file);
  } else {
    res
      .status(401)
      .json({ message: `Could not find a file by id ${uploadId}` });
  }
});

// this is the endpoint to delete a file
app.delete('files/:uploadId', async (req, res) => {
  try {
    const { uploadId } = req.params;
    const deletedFile = await File.findOneAndDelete({ _id: uploadId });
    res.status(201).json(deletedFile);
  } catch (err) {
    res.status(400).json({ errors: err.errors });
  }
});

// this is the endpoint to update password
// app.put('/password/:userId', authenticateUser);
// app.put('/password/:userId', async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const { oldPassword, newPassword } = req.body;
//     const user = await User.findOne({ _id: userId });
//     console.log(user);
//     if (user && bcrypt.compareSync(oldPassword, user.password)) {
//       console.log('comparing the password...');
//       const newUser = await User.findOneAndUpdate(
//         { _id: userId },
//         { password: bcrypt.hashSync(newPassword) },
//         { new: true }
//       );
//       res.json(newUser);
//     } else {
//       res.status(404).json({ notFound: true });
//     }
//   } catch (err) {
//     res.status(400).json({ err: err });
//   }
// });

// use this for renaming the files
// app.put('/files/:id', parser.single('image'), async (req, res) => {
//   try {
//     const user = await User.findOneAndUpdate(
//       { _id: req.user._id },
//       { profileImage: req.file.path },
//       { new: true }
//     );
//     res.json(user);
//   } catch (err) {
//     res.status(400).json({ errors: err.errors });
//   }
// });

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
