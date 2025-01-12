import axios from "axios";

// Correct base URLs for your APIs
const BASE_URL = "http://localhost:8686"; // For user API
const ACCOUNT_URL = "http://localhost:1111";

// Axios instance for general user-related API
const signupAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Axios for login
const loginAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Axios for account open form
const openAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Axios for deposite money
const depositeAxios = axios.create({
  baseURL: ACCOUNT_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Axios for withdraw money
const withdrawAxios = axios.create({
  baseURL: ACCOUNT_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Axios for check user Profile

const profileAxios = axios.create({
  baseURL: ACCOUNT_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

//Axios for transfer Money

const transferAxios = axios.create({
  baseURL: ACCOUNT_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});


//Axios for geting data with pagination

const getDataPagination = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

//Axios for admin login page
const getAdminLoginPage = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Axios for varify admin is correct
const getVarifyAdmin = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Axios for varify admin is correct
const getAdminAccount = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});



export {
  signupAxios,
  loginAxios,
  openAxios,
  depositeAxios,
  withdrawAxios,
  profileAxios,
  transferAxios,
  getDataPagination,
  getAdminLoginPage,
  getVarifyAdmin,
  getAdminAccount,
};
