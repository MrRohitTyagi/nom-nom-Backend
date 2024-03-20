import shopModel from "../models/shopModel.js";

export const updateShop = async (req, res) => {
  const body = req.body;
  const shop_id = req.headers["shop_id"];
  //   return res.send(req.body);
  try {
    const shop = await shopModel.findByIdAndUpdate(shop_id, body, {
      new: true,
    });
    res.send({
      success: true,
      shop: shop,
      msg: "Restraunt details updated successfully",
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, msg: error?.message || "Something went wrong" });
  }
};
