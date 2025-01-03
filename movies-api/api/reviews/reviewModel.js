import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movies', required: true }, 
  author: { type: String, required: true },
  rating: { type: String, required: true },
  content: { type: String, required: true },
});

ReviewSchema.statics.findByReviewId = function (id) {
  return this.findOne({ id: id });
};

export default mongoose.model('Review', ReviewSchema);