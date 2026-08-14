import { apiClient } from "@/lib/axios/axios";
import apiEndpoint from "./endpoint.constants";

const dashboardServices = {
  getDashboard: (months?: string) =>
    apiClient.get(`${apiEndpoint.DASHBOARD}`, {
      params: {
        months,
      },
    }),
};

export default dashboardServices;
