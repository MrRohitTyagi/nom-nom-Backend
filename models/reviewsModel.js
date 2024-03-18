import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  shop_id: { type: mongoose.Schema.Types.ObjectId, ref: "restraunt-model" },
  reviews: [
    {
      title: { type: String, required: true },
      desc: { type: String },
      pictures: [String],
      likes: Number,
      over_all_rating: Number,
      rating: {
        quality: Number,
        packaging: Number,
        taste: Number,
        
      },
    },
  ],
});

const reviewModel = mongoose.model("review-model", reviewSchema);
export default reviewModel;
