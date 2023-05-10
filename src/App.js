import React from "react";
import './index.css';
import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Signup } from "./pages/Signup";
import { ExpenseTracker } from "./pages/Expensetracker";
import { ForgotPassword } from "./pages/Forgotpassword";
import { CreateExpense } from "./pages/CreateExpense";
import { Navbar } from "./components/Navbar";
import { LandingPage } from "./pages/LandingPage";
import { Footer } from "./components/Footer";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App () {

  return (
    <>
      <Navbar />
      <Routes>
        <Route index path='/' element={<LandingPage />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/forgot-password' element={<ForgotPassword />} />
        <Route exact path='/dashboard' element={<Dashboard />} />
        <Route exact path='/expense-tracker' element={<ExpenseTracker />} />
        <Route exact path='/create-expenseform'
          element={
            <ProtectedRoute>
              <CreateExpense />
            </ProtectedRoute>} 
          />
      </Routes>
      <Footer />
    </>
  )
};

export default App;