import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
  name: { trim: true, type: String, required: [true, "Name is required"] },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exists"],
    trim: true,
  },
  shop_id: { type: Schema.Types.ObjectId, ref: "restraunt-model" },
  desc: { trim: true, type: String },
  picture: { trim: true, type: String },
  password: {
    trim: true,
    type: String,
    required: [true, "Password is required"],
  },
  address: {
    city: { type: String },
    state: { type: String },
    postcode: { type: String },
    country: { type: String },
    display_name: { type: String },
    lat: { type: Number },
    lon: { type: Number },
  },
  isDarkTheme: {
    type: Boolean,
    default: false,
  },

  createdAT: {
    type: Date,
    default: Date.now,
  },
  //   orders: [],
});

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;

    next();
  } catch (error) {
    console.error("Error in pre-save hook:", error);
    next(error); // Pass any errors to the next middleware
  }
});
// const modelWatcher = userModel.watch();
// modelWatcher.on("change", (data) => {
//   console.log("data", data);
// });

const userModel = mongoose.model("user-model", userSchema);
export default userModel;
