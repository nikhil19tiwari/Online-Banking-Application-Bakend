import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./LandingPage/Home";
import SignUpPage from "./UserService/SignUpPage";
import LoginPage from "./UserService/LoginPage";
import UserInterface from "./UserService/UserInterface";
import AccountOpen from "./UserDash.jsx/AccountOpen";
import OpenSuccess from "./UserDash.jsx/OpenSuccess";
import DepositePage from "./UserDash.jsx/DepositePage";
import DepositeSuccess from "./UserDash.jsx/DepositeSuccess";
import Withdraw from "./UserDash.jsx/Withdraw";
import WithdrawSuccess from "./UserDash.jsx/WithdrawSuccess";
import UserProfile from "./UserDash.jsx/UserProfile";
import UserSuccess from "./UserDash.jsx/UserSuccess";
import UserTranfer from "./UserDash.jsx/UserTransfer";
import TransferSuccess from "./UserDash.jsx/TransferSuccess";
import Pagination from "./UserService/Pagination";
import Contact from "./LandingPage/Contact";
import AdminLogin from "./UserService/AdminLogin";
import VarifyOtp from "./UserService/Varify";
import AdminDash from "./UserService/AdminDash";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />{" "}
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<UserInterface />} />
          <Route path="/AccountOpen" element={<AccountOpen />} />
          <Route path="/OpenSuccess" element={<OpenSuccess />} />
          <Route path="/deposit" element={<DepositePage />} />
          <Route path="/DepositeSuccess" element={<DepositeSuccess />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/WithdrawSuccess" element={<WithdrawSuccess />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/userPro" element={<UserSuccess />} />
          <Route path="/transfer" element={<UserTranfer />} />
          <Route path="/TranferSuccess" element={<TransferSuccess />} />
          <Route path="/page" element={<Pagination />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/adminlogin" element={<AdminLogin />}/>
          <Route path="/varify" element={<VarifyOtp />}/>
          <Route path = "/admindashboard" element={<AdminDash />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
