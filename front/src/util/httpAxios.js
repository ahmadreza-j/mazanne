import httpAxios from "axios";
import serverUrl from "./serverUrl";

const axios = httpAxios.create({
  baseURL: serverUrl + "/api",
  // baseURL: "http://192.168.1.16:4000/api",
});

const onError = (error) => {
  console.log(error);
};

export const GET = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    onError(error);
  }
};

export const POST = async (url, data) => {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    onError(error);
  }
};

export const PUT = async (url, data) => {
  try {
    const response = await axios.put(url, data);
    return response.data;
  } catch (error) {
    onError(error);
  }
};

export const DELETE = async (url) => {
  try {
    const response = await axios.delete(url);
    return response.data;
  } catch (error) {
    onError(error);
  }
};
