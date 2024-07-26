import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";
import { useAuthStore } from "./context/store";

export default function App() {
  const { user, validateToken } = useAuthStore();

  useEffect(() => {
    validateToken();
  }, []);

  console.log(user);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to={"/"} />}
        />
      </Routes>
    </Router>
  );
}
