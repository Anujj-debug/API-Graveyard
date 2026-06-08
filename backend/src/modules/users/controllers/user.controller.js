import { getProfileService } from "../services/user.service.js";

export const getProfile = async (req, res) => {
  try {
    const profile = await getProfileService(req.params.id);

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
