import axios from "../utils/axiosConfig";

export const getNowShowing = () => {
  return axios.get("/movies?status=showing");
};

export const getComingSoon = () => {
  return axios.get("/movies?status=coming");
};