import Axios, { AxiosInstance } from "axios";

const baseURL = "https://api.spacexdata.com/v4/";

export const httpClient: AxiosInstance = Axios.create({ baseURL });
