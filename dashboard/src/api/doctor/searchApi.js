import { api } from "../axios";

export const globalSearch = async ({
  query,
  type = "all",
  page = 1,
  limit = 10,
}) => {
  const res = await api.get("/api/global/search", {
    params: {
      q: query,
      type,
      page,
      limit,
    },
  });

  return res.data;
};