import express from 'express';
import User from './userModel';
import Review from '../reviews/reviewModel';
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

router.post('/favorites',  async (req, res) => {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ code: 404, msg: 'User not found.' });
    }
    if (!user.favouriteMovies) {
        user.favouriteMovies = [];
    }

    user.favouriteMovies.push(req.body.movieId);
    await user.save();
    res.status(201).json({ code: 201, msg: 'Movie added to favorites.' });
    
  });

router.get('/favorites',  async (req, res) => {
    const user = req.user;

    if (!user) {
        return res.status(404).json({ code: 404, msg: 'User not found.' });
    }

    res.status(200).json(user.favouriteMovies);
    });

router.delete('/favorites',  async (req, res) => {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ code: 404, msg: 'User not found.' });
    }
    if (!user.favouriteMovies) {
        return res.status(404).json({ code: 404, msg:"Favourites not found."})
    }

    user.favouriteMovies = user.favouriteMovies.filter((movieId) => movieId !== req.body.movieId);
    await user.save();
    res.status(200).json({ code: 200, msg: 'Movie removed from favorites.' });
    
  });

router.post('/playlist',  async (req, res) => {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ code: 404, msg: 'User not found.' });
    }
    if (!user.playlist) {
        user.playlist = [];
    }

    user.playlist.push(req.body.movieId);
    await user.save();
    res.status(201).json({ code: 201, msg: 'Movie added to playlist.' });
    
  });

router.get('/playlist',  async (req, res) => {
    const user = req.user;

    if (!user) {
        return res.status(404).json({ code: 404, msg: 'User not found.' });
    }

    res.status(200).json(user.playlist);
    });

router.delete('/playlist',  async (req, res) => {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ code: 404, msg: 'User not found.' });
    }
    if (!user.playlist) {
        return res.status(404).json({ code: 404, msg:"Playlist not found."})
    }

    user.playlist = user.playlist.filter((movieId) => movieId !== req.body.movieId);
    await user.save();
    res.status(200).json({ code: 200, msg: 'Movie removed from playlist.' });
    
  });

  router.post('/reviews',  async (req, res) => {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ code: 404, msg: 'User not found.' });
    }
    if (!user.reviews) {
        user.reviews = [];
    }
    const author = req.body.author;
    const movieId = req.body.movieId;
    const rating = req.body.rating;
    const content = req.body.content;

    if (!movieId || !content || !author || !rating) {
        return res.status(400).json({ code: 400, msg: 'Need movieId , content, author and rating' });
      }

    const reviewData ={
        userId: user._id,
        author: author,
        movieId: movieId,
        rating: rating,
        content: content
    }
    const newReview = await Review.create(reviewData);
    user.reviews.push(newReview._id);
    await user.save();
    res.status(201).json({ code: 201, msg: 'Review added successfully.' });
    
  });

  router.get('/reviews/:id',  async (req, res) => {
    const user = req.user;
    const reviewId = req.params.id;
    if (!user) {
        return res.status(404).json({ code: 404, msg: 'User not found.' });
    }

    const review = await Review.findById(reviewId);
    if (!review) {
        return res.status(404).json({ code: 404, msg: 'Review not found.' });
    }
    res.status(200).json({ code: 200, msg: 'Review fetched successfully.', review });
    });

router.get('/reviews',  async (req, res) => {
    const user = req.user;

    if (!user) {
        return res.status(404).json({ code: 404, msg: 'User not found.' });
    }

    const reviews = await Review.find({ userId: user._id });
    if (!reviews.length) {
        return res.status(404).json({ code: 404, msg: 'No reviews found for this user.' });
    }
    res.status(200).json({ code: 200, msg: 'Review fetched successfully.', reviews });
    });
    
router.delete('/reviews/:id', async (req, res) => {

    const user = req.user; 
    const reviewId = req.params.id; 
        
    if (!user) {
        return res.status(404).json({ code: 404, msg: 'User not found.' });
    }

    const deletedReview = await Review.findByIdAndDelete(reviewId);
    if (!deletedReview) {
        return res.status(404).json({ code: 404, msg: 'Review not found in database.' });
    }

    user.reviews = user.reviews.filter((id) => id.toString() !== reviewId);
    await user.save(); 

    res.status(200).json({ code: 200, msg: 'Review removed successfully.' });
    });   

export default router;
