import axios from "axios";

// axios.defaults.headers.common[
//   "Authorization"
// ] = `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`;

export const nextServer = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});
