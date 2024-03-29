import axios from "axios";
import { baseUrl } from "./baseUrl.jsx";

const publicHttp = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default publicHttp;
