import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Profile from "./Pages/Profile";
// import Lynk_Creation_Form from "./Pages/Lynk_Creation_Form";
import Home from "./Pages/Home";
import SignUpPage from "./Pages/SignUpPage";
import Feed from "./Pages/Feed";
import LoginPage from "./Pages/Login";
import Logout from "./Pages/Logout";
import ResetPassword from "./Pages/Reset_PW";
import ProtectedRoute from "./Components/Protectedroute";
const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SignUp" element={<SignUpPage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Logout" element={<Logout />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/Feed" element={<Feed />} />
          </Route>
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          {/* <Route path="/Lynk/Profile" element={<Profile />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
