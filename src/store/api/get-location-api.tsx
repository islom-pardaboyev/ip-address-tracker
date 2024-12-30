import { api } from ".";
import { TOKEN } from "../../hook/useEnv";

export const getLocationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getLocation: builder.query({
      query: (ip) => `/${ip}?token=${TOKEN}`
    }),
  }),
});

export const { useGetLocationQuery } = getLocationApi;
