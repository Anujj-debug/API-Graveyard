import API from "../models/api.model.js";

export const createAPIService = async (apiData, userId) => {
  const existingAPI = await API.findOne({
    slug: apiData.slug,
  });

  if (existingAPI) {
    throw new Error("API already exists");
  }

  const api = await API.create({
    ...apiData,
    addedBy: userId,
  });

  return api;
};

export const getAllAPIsService = async (queryParams) => {
  const {
    search,
    category,
    officialStatus,
    page = 1,
    limit = 10,
  } = queryParams;

  const query = {};

  // Search
  if (search) {
    query.name = {
      $regex: search,
      $options: "i",
    };
  }

  // Filters
  if (category) {
    query.category = category;
  }

  if (officialStatus) {
    query.officialStatus = officialStatus;
  }

  const totalAPIs = await API.countDocuments(query);

  const apis = await API.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .sort({ createdAt: -1 });

  return {
    apis,
    pagination: {
      total: totalAPIs,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(totalAPIs / limit),
    },
  };
};

export const getSingleAPIService = async (apiId) => {
  const api = await API.findById(apiId).populate("addedBy", "username email");
  if (!api) {
    throw new Error("API not found");
  }
  return api;
};

export const getTrendingAPIsService =
  async () => {
    const apis = await API.find()
      .sort({
        reviewCount: -1,
        averageRating: -1,
      })
      .limit(10);

    return apis;
  };