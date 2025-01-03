import express from 'express';
import User from './userModel';
import asyncHandler from 'express-async-handler';
const router = express.Router(); // eslint-disable-line
import jwt from 'jsonwebtoken';

// Get all users
router.get('/', async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

// register(Create)/Authenticate User
router.post('/', asyncHandler(async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ success: false, msg: 'Username and password are required.' });
        }
        if (req.query.action === 'register') {
            await registerUser(req, res);
        } else {
            await authenticateUser(req, res);
        }
    } catch (error) {
        // Log the error and return a generic error message
        console.error(error);
        res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
}));
// Update a user
router.put('/:id', async (req, res) => {
  if (req.body._id) delete req.body._id;
  const result = await User.updateOne({
      _id: req.params.id,
  }, req.body);
  if (result.matchedCount) {
      res.status(200).json({ code:200, msg: 'User Updated Sucessfully' });
  } else {
      res.status(404).json({ code: 404, msg: 'Unable to Update User' });
  }
});

async function registerUser(req, res) {
    // Add input validation logic here
    await User.create(req.body);
    res.status(201).json({ success: true, msg: 'User successfully created.' });
}

async function authenticateUser(req, res) {
    const user = await User.findByUserName(req.body.username);
    if (!user) {
        return res.status(401).json({ success: false, msg: 'Authentication failed. User not found.' });
    }

    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
        const token = jwt.sign({ username: user.username }, process.env.SECRET);
        res.status(200).json({ success: true, token: 'BEARER ' + token });
    } else {
        res.status(401).json({ success: false, msg: 'Wrong password.' });
    }
}


router.get('/favorites', authenticate, asyncHandler(async (req, res) => {
    const userId = req.user._id; 
  
    const user = await User.findById(userId).populate('favouriteMovies');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    res.status(200).json(user.favouriteMovies);
  }));
  

router.post('/favorites', authenticate, asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { movieId } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (user.favouriteMovies.includes(movieId)) {
    return res.status(400).json({ message: 'Movie already in favorites' });
  }

  user.favouriteMovies.push(movieId);
  await user.save();

  res.status(201).json({ message: 'Movie added to favorites', favouriteMovies: user.favouriteMovies });
}));

router.get('/playlists', authenticate, asyncHandler(async (req, res) => {
    const userId = req.user._id;
  
    const user = await User.findById(userId).populate('playlists');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    res.status(200).json(user.playlists);
  }));

router.post('/playlists', authenticate, asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { movieId } = req.body;
  
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    if (user.playlists.includes(movieId)) {
      return res.status(400).json({ message: 'Movie already in playlists' });
    }
  
    user.playlists.push(movieId);
    await user.save();
  
    res.status(201).json({ message: 'Movie added to playlists', playlists: user.playlists });
  }));



router.delete('/favorites/:movieId', asyncHandler(async (req, res) => {
    const userId = req.user._id; 
    const { movieId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const index = user.favouriteMovies.indexOf(movieId);
    if (index === -1) {
        return res.status(404).json({ message: 'Movie not in favorites' });
    }

    user.favouriteMovies.splice(index, 1); 
    await user.save();

    res.status(200).json({ message: 'Movie removed from favorites', favouriteMovies: user.favouriteMovies });
}));


router.delete('/playlists/:movieId', asyncHandler(async (req, res) => {
    const userId = req.user._id; 
    const { movieId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const index = user.playlists.indexOf(movieId);
    if (index === -1) {
        return res.status(404).json({ message: 'Movie not in playlists' });
    }

    user.playlists.splice(index, 1); 
    await user.save();

    res.status(200).json({ message: 'Movie removed from playlists', playlists: user.playlists });
}));

export default router;
