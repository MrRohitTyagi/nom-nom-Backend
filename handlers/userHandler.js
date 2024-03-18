import userModel from "../models/userModel.js";


export const getUserByToken = async (req, res) => {
  try {
    const user_id = req.headers["user_id"];
    const user = await userModel.findById(user_id).select("-password -__v");
    return res.send({ user });
  } catch (error) {
    console.log("error", error);

    return res.status(500).send({
      success: false,
      msg: error?.message || "Something went wrong",
    });
  }
};
export const updateUser = async (req, res) => {
  try {
    const user_id = req.headers["user_id"];
    // return res.send({ body: req.body, user_id });

    const updatedUser = await userModel
      .findByIdAndUpdate(user_id, req.body, {
        new: true,
      })
      .select("-password -__v");
    return res.send({ msg: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.log("error", error);
    return res.status(500).send({
      success: false,
      msg: error?.message || "Something went wrong",
    });
  }
};
