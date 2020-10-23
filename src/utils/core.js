import axios from "axios"; // http helper lib

require("dotenv").config();

export const HTTP = axios.create({
  // change URL to your base endpoint!
  baseURL: process.env.API_URL
  // headers: {
  //   Authorization: 'Bearer {token}'
  // }
});

export const ApiMethod = "GetDataProps";
