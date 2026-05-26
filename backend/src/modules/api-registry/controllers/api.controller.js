import { createAPIService, getAllAPIsService, getSingleAPIService } from "../services/api.service.js";

export const createAPI = async (req, res) => {
  try {
    const api = await createAPIService(
      req.body,
      req.user.userId
    );

    res.status(201).json({
      message: "API created successfully",
      api,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getAllAPIs = async (req, res) => {
  try {
    const data = await getAllAPIsService(
      req.query
    );

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getSingleAPI = async (
  req,
  res
) => {
  try {
    const api = await getSingleAPIService(
      req.params.id
    );
    res.status(200).json(api);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};