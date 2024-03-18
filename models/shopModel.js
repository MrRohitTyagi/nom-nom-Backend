import mongoose, { Schema } from "mongoose";

const shopSchema = new Schema({
  name: { trim: true, type: String, required: [true, "Name is required"] },
  desc: { trim: true, type: String, default: "" },
  picture: { type: [String], default: [] },
  address: {
    city: { type: String },
    state: { type: String },
    postcode: { type: String },
    country: { type: String },
    display_name: { type: String },
    lat: { type: Number },
    lon: { type: Number },
  },
  statusRN: {
    type: String,
    required: true,
    default: "step-1",
    enum: ["step-1", "step-2", "step-3"],
  },
  isOpen: Boolean,
  timing: { opensAt: String, closesAt: String },
  menu: Schema.Types.Mixed,
  averageCTC: String,
  offers: [{ code: String, desc: String, discount: Number }],
  // {
  //   groupname: [
  //     {
  //       title: String,
  //       desc: String,
  //       isVeg: Boolean,
  //       price: Number,
  //       picture: String,
  //     },
  //   ],
  // },

  createdAT: {
    type: Date,
    default: Date.now,
  },
});

// const modelWatcher = shopModel.watch();
// modelWatcher.on("change", (data) => {
//   console.log("data", data);
// });

const shopModel = mongoose.model("restraunt-model", shopSchema);
export default shopModel;
