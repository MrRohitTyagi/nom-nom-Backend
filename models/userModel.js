import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
  name: { type: String, required: [true, "Name is required"] },
  email: {
    type: String,
    required: [true, "Email is required"],
    // unique: [true, "Email already exists"],
  },
  desc: { type: String },
  picture: { type: String },
  password: { type: String, required: [true, "Password is required"] },
  address: {
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
