import user_model from "../models/user.model.js";

export async function user_data_controller(req, res) {
  const userId = req.user._id || req.user.id;
  try {
    const foundUser = await user_model.findById(userId);

    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ username: foundUser.username, name: foundUser.name });
  } catch (error) {
    console.log(`:${error}`);
  }
}
