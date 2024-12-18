import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./Navbar";
import News from "./News";
import Insights from "./Insights";
import "./styles.css";
import Finances from "./Finances";
import Footer from "./Footer";
import AddIncome from "./AddIncome";
import Homepage from "./Homepage";
import SignUpForm from "./authentication/SignUpForm";
import SignInForm from "./authentication/SignInForm";
import { Link } from "react-router-dom";

export default function App() {
  // Store data in local storage
  const [data, setData] = useState(() => {
    const localValue = localStorage.getItem("items");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(data));
  }, [data]);

  // Add new data (income or expenditure)
  function handleAddData(newData) {
    setData((prevData) => [...prevData, newData]);
  }

  // Toggle the AddIncome modal
  const [showAddIncome, setShowAddIncome] = useState(false);

  {
    /* Logged in State */
  }
  const [loggedIn, setLoggedIn] = useState(() => {
    return localStorage.getItem("loggedIn") === "true";
  });

  const handleLogin = (status) => {
    setLoggedIn(status);
    localStorage.setItem("loggedIn", status);
  };

  const handleSignOut = () => {
    setLoggedIn(false);
    localStorage.removeItem("loggedIn");
  };

  return (
    <Router>
      <div className="App">
        {/* Navbar */}
        <Navbar loggedIn={loggedIn} onSignOut={handleSignOut} />

        {/* Main Content */}
        {loggedIn ? (
          <>
            <Routes>
              <Route path="/" element={<Homepage data={data} />} />
              <Route
                path="/finances"
                element={<Finances data={data} setData={setData} />}
              />
              <Route path="/news" element={<News />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/signup" element={<Navigate to="/" />} />
              <Route path="/signin" element={<Navigate to="/" />} />
            </Routes>

            {/* Add Button */}
            <button
              className="btn btn-primary position-fixed bottom-0 start-0 m-3"
              onClick={() => setShowAddIncome(true)}
            >
              +
            </button>
            <AddIncome
              show={showAddIncome}
              handleClose={() => setShowAddIncome(false)}
              handleAddData={handleAddData}
            />

            {/* Footer */}
            <Footer />
          </>
        ) : (
          <Routes>
            {/* Paths for sign up and sign in pages */}
            <Route path="/signup" element={<SignUpForm />} />
            <Route
              path="/signin"
              element={<SignInForm onLogin={handleLogin} />}
            />
            <Route path="*" element={<Navigate to="/signup" />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}
