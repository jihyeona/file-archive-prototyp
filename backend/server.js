import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'
import dotenv from 'dotenv'
import cloudinaryframework from 'cloudinary'
import multer from 'multer'
import cloudinaryStorage from 'multer-storage-cloudinary'
import Item from './models/Item'
import User from './models/User'
import Poll from './models/Poll'
import Like from './models/Like'

const cloudinary = cloudinaryframework.v2

dotenv.config()

cloudinary.config({
  cloud_name: 'dystmqbrf',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const storage = cloudinaryStorage({
  cloudinary,
  params: {
    folder: 'products',
    allowedFormats: ['jpg', 'png', 'jpeg'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
  },
})

const parser = multer({ storage })

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/pollAPI'
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.set('useCreateIndex', true)
mongoose.Promise = Promise

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())


const authenticateUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      accessToken: req.header('Authorization')
    })
    if (user) {
      req.user = user
      next()
    } else {
      res.status(401).json({ loggedOut: true, message: 'Please try logging in again' })
    }
  } catch (err) {
    res.status(403).json({ message: 'Access token is missing or wrong', errors: err })
  }

}

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

// this is the endpoint to fetch the info of existing users
app.get('/users', async (req, res) => {
  const exsitingUsers = await User.find().sort({ createdAt: 'asc' })
  if (exsitingUsers) {
    res.status(201).json(exsitingUsers)
  } else {
    res.status(401).json({ message: 'Could not find existing users' })
  }
})
// this is the endpoint to sign up new users
app.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body
    const user = new User({ name, email, password: bcrypt.hashSync(password) })
    const saved = await user.save()
    res.status(201).json({
      name: saved.name,
      userId: saved._id,
      accessToken: saved.accessToken,
      email: saved.email
    })
  } catch (err) {
    res.status(400).json({ message: 'Could not create user', errors: err.errors })
  }
})

app.post('/sessions', async (req, res) => {
  try {
    const { name, password } = req.body
    const user = await User.findOne({ name })
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(201).json({
        name: user.name,
        userId: user._id,
        accessToken: user.accessToken,
        profileImage: user.profileImage,
        email: user.email,
        message: 'You are logged in'
      })
    } else {
      res.status(404).json({ notFound: true })
    }
  } catch (err) {
    res.status(404).json({ notFound: true })
  }
})
// this is the endpoint to update profile image
app.put('/users/:id', authenticateUser)
app.put('/users/:id', parser.single('image'), async (req, res) => {
  try {
    const user = await User.findOneAndUpdate({ _id: req.user._id }, { profileImage: req.file.path }, { new: true })
    res.json(user)
  } catch (err) {
    res.status(400).json({ errors: err.errors })
  }
})
// this is the endpoint to fetch the info of existing polls
app.get('/polls', authenticateUser)
app.get('/polls', async (req, res) => {
  const ongoingPolls = await Poll.find().sort({ createdAt: 'desc' }).limit(20).exec()
  if (ongoingPolls) {
    res.status(201).json(ongoingPolls)
  } else {
    res.status(401).json({ message: 'Could not find ongoing polls' })
  }
})
// this is the endpoint to add new polls 
app.post('/polls', authenticateUser)
app.post('/polls', parser.single('pollimage'), async (req, res) => {
  try {
    const poll = new Poll({
      title: req.body.title,
      userId: req.body.userId,
      imageUrl: req.file.path,
      imageId: req.file.filename,
      items: []
    })
    const saved = await poll.save()
    res.status(201).json({
      title: saved.title,
      userId: saved.userId,
      imageUrl: saved.imageUrl,
      imageId: saved.imageId,
      pollId: saved._id,
      items: []
    })
  } catch (err) {
    res.status(400).json({ errors: err.errors })
  }
})

// this is the endpoint to fetch the info of an existing poll
app.get('/polls/:pollId', async (req, res) => {
  const { pollId } = req.params
  const poll = await Poll.findById(pollId)
  if (poll) {
    res.status(201).json(poll)
  } else {
    res.status(401).json({ message: `Could not find a poll by id ${pollId}` })
  }
})

// this is the endpoint to add new items under a poll 
app.post('/polls/:pollId', authenticateUser)
app.post('/polls/:pollId', parser.single('itemimage'), async (req, res) => {
  try {
    const { pollId } = req.params
    const poll = await Poll.findOneAndUpdate(
      { _id: pollId },
      {
        $push: {
          items: {
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.file.path,
            imageId: req.file.filename,
            itemId: req.body._id,
            userId: req.body.userId,
            likes: []
          }
        }
      },
      { new: true, upsert: true })
    res.status(201).json(poll)
  } catch (err) {
    res.status(400).json({ errors: err.errors })
  }
})
// this is the endpoint to delete a poll with a pollId and userId.
app.delete('/polls/:pollId/:pollCreatorId', authenticateUser)
app.delete('/polls/:pollId/:pollCreatorId', async (req, res) => {
  try {
    const { pollId, pollCreatorId } = req.params
    const deletedPoll = await Poll.findOneAndDelete(
      { '_id': pollId, 'userId': pollCreatorId, }
    )
    res.status(201).json(deletedPoll)
  } catch (err) {
    res.status(400).json({ errors: err.errors })
  }
})

// this is the endpoint to push a like under an item. 
app.post('/items/:itemId', authenticateUser)
app.post('/items/:itemId', async (req, res) => {
  try {
    const { itemId } = req.params
    const poll = await Poll.findOneAndUpdate(
      { 'items._id': itemId },
      {
        $push: {
          'items.$.likes': {
            'userId': req.body.loggedInUserId
          }
        }
      },
      { new: true, upsert: true })
    res.status(201).json(poll)
  } catch (err) {
    res.status(400).json({ errors: err.errors })
  }
})

// this is the endpoint to delete an item.
app.delete('/items/:itemId', authenticateUser)
app.delete('/items/:itemId', async (req, res) => {
  try {
    const { itemId } = req.params
    const item = await Poll.findOneAndUpdate(
      { 'items._id': itemId },
      {
        $pull: {
          'items': {
            '_id': itemId
          }
        }
      },
      { new: true }
    )
    res.status(201).json(item)
  } catch (err) {
    res.status(400).json({ errors: err.errors })
  }
})

// this is the endpoint to get all the items that user has liked. 
app.get('/likes/:userId', authenticateUser)
app.get('/likes/:userId', async (req, res) => {
  try {
    const { userId } = req.params
    const likedItems = await Poll.aggregate([
      {
        $match: {
          'items.likes.userId': userId
        }
      }, {
        $project: {
          'items.likes': 1,
          'items.name': 1,
          'items.description': 1,
          'items.imageUrl': 1
        }
      }, {
        $unwind: {
          path: '$items'
        }
      }, {
        $match: {
          'items.likes.userId': userId
        }
      }
    ])
    if (likedItems) {
      res.status(201).json(likedItems)
    } else {
      res.status(404).json({ notFound: true })
    }
  } catch (err) {
    res.status(400).json({ errors: err.errors })
  }
})

// this is the endpoint to delete the like with a specific userId.
app.delete('/:pollId/:itemId/likes/:userId', authenticateUser)
app.delete('/:pollId/:itemId/likes/:userId', async (req, res) => {
  try {
    const { pollId, userId, itemId } = req.params
    const like = await Poll.findOneAndUpdate(
      { '_id': pollId, 'items._id': itemId, },
      {
        $pull: {
          'items.$.likes': {
            'userId': userId
          }
        }
      },
      { new: true }
    )
    res.status(201).json(like)
  } catch (err) {
    res.status(400).json({ errors: err.errors })
  }
})

// this is the endpoint to update password
app.put('/password/:userId', authenticateUser)
app.put('/password/:userId', async (req, res) => {
  try {
    const { userId } = req.params
    const { oldPassword, newPassword } = req.body
    const user = await User.findOne({ _id: userId })
    console.log(user)
    if (user && bcrypt.compareSync(oldPassword, user.password)) {
      console.log('comparing the password...')
      const newUser = await User.findOneAndUpdate({ _id: userId }, { password: bcrypt.hashSync(newPassword) }, { new: true })
      res.json(newUser)
    } else {
      res.status(404).json({ notFound: true })
    }
  } catch (err) {
    res.status(400).json({ err: err })
  }
})

app.get('/users/:id/secret', authenticateUser)
app.get('/users/:id/secret', (req, res) => {
  const secretMessage = `This is profile page for ${req.user.name}.`
  res.status(201).json({ secretMessage });
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
