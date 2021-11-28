import { axiosInstance } from "../axios";

export const getAvailableIntegrations = async () => {
  const response = await axiosInstance.get("/user/integrations", {
    headers: {
      token: "Bearer " + JSON.parse(localStorage.getItem("token") as string),
    },
  });
  return response.data;
};
