import './App.css'
import { RegistrationPage } from './components/registration'
import {
  createBrowserRouter,
  BrowserRouter as Router,
  RouterProvider,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Submit from './components/submit';
import { ToastContainer } from 'react-toastify';
import Login from './components/login';
import { useEffect, useState } from 'react';
import Profile from './components/submit';
import { auth } from "./components/firebase";



// const router = createBrowserRouter([
//   {
//     path: "/",
//     element:<RegistrationPage/>,
//   },
//   {
//     path: "about",
//     element: <Submit/>,
//   },
// ]);

function App() {

  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });

  return (
    <>
      <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route
                path="/"
                element={user ? <Navigate to="/profile" /> : <Login />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
            <ToastContainer />
          </div>
        </div>
      </div>
    </Router>
    </>
  )
}

export default App
