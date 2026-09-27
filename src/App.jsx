import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import ProtectedRoute from "./component/ProtectedRoutes.jsx";
import ResetPassword from "./Pages/ResetPassword.jsx";
import ForgotPassword from "./Pages/ForgetPassword.jsx";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
};

export default App;
