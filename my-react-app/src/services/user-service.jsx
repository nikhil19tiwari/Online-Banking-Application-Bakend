import {signupAxios,loginAxios,openAxios,
      depositeAxios,withdrawAxios,
      profileAxios,transferAxios,
      getAdminLoginPage,getVarifyAdmin,
      getAdminAccount, getDataPagination
} from "./helper";

// Function to sign up a user
export const signup = (user) => {
  return signupAxios
    .post("/v1/api/user/save", user)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error during signup:", error);
      throw error;
    });
};

// function to login user
export const login = (user) => {
  return loginAxios
    .post("/v1/api/user/login", user)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error during signup:", error);
      throw error;
    });
};

// function to openAccount

export const accountopen = (user) => {
  return openAxios
    .post("/v1/api/account/create", user)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error during signup:", error);
      throw error;
    });
};

// function to deposite Amount

export const depositamount = (user) => {
  return depositeAxios
    .post("/v1/api/transaction/deposit", user)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error during deposite:", error);
      throw error;
    });
};

// function to withdraw Amount

export const withdrawamount = (user) => {
  return withdrawAxios
    .post("/v1/api/transaction/withdraw", user)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error during deposite:", error);
      throw error;
    });
};

// function to check user profile
export const checkUserProfile = (user) => {
  return profileAxios
    .post("/v1/api/transaction/userDetails", user)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error during deposite:", error);
      throw error;
    });
};

//function to tranfer money

export const transferMoney = (user) => {
  return transferAxios
    .post("/v1/api/transaction/transfer", user)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error during deposite:", error);
      throw error;
    });
};

// function to getdata with pagination

import axios from 'axios';

export const getTransactionData = async (params) => {
  try {
    const response = await axios.get('http://localhost:8686/v1/api/dataResponse/getData', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching transaction data:', error);
    throw error;
  }
};

// function for Admin Login Page
export const adminLoginData = (user) => {
  return getAdminLoginPage
    .post("/v1/api/user/adminLogin", user)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error during deposite:", error);
      throw error;
    });
};

// function for varify admin
export const adminVarify = (otp) => {
  return getVarifyAdmin
    .post(`/v1/api/user/checkValid?otp=${otp}`) // Sending OTP as a query parameter
    .then((response) => response.data)
    .catch((error) => {
      const errorMessage = error.response?.data || "Something went wrong!";
      console.error("Error during OTP verification:", errorMessage);
      throw new Error(errorMessage);
    });
};

export const getAdminAccountDetails = (accountType) => {
  return axios
    .post(`http://localhost:8686/v1/api/account/getCustomer?accountType=${accountType}`)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};


export const approveOrRejectAccount = (accountNumber, action) => {
  const url = `http://localhost:8686/v1/api/account/approve?accountNumber=${accountNumber}&action=${action}`;
  
  return axios
    .post(url)
    .then((response) => response.data.message)
    .catch((error) => {
      console.error("Error in approval/rejection:", error.message);
      throw error;
    });
};
