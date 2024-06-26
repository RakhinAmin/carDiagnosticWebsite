// Importing necessary modules from the React and React Router libraries
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Importing components and pages for the application
import Nav from "./components/navigation/Nav";
import HomePage from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import LoginPage from "./pages/login/Login";
import RegisterPage from "./pages/register/Register";
import ResetPasswordPage from "./pages/resetPassword/ResetPassword";
import ResetPasswordPageConfirm from "./pages/resetPassword/ConfirmResetPassword";
import ActivatePage from "./pages/activateAccount/ActivateAccount";
import NotFoundPage from "./pages/notFound/NotFound";
import { Questions } from "./pages/questions/Questions";

// Main component representing the entire application
function App() {
  return (
    <>
      {/* Router component to manage navigation and rendering of components based on routes (URL's) */}
      <Router>
        {/* Navigation component rendered at the top of the application */}
        <Nav />

        {/* Routes component to define different routes and their corresponding components */}
        <Routes>
          {/* Route for the home page */}
          <Route path="/" element={<HomePage />} />

          <Route path="/questions" element={<Questions />} />

          {/* Route for the login page */}
          <Route path="/login" element={<LoginPage />} />

          {/* Route for the registration page */}
          <Route path="/register" element={<RegisterPage />} />

          {/* Route for activating a user account */}
          <Route path="/activate/:uid/:token" element={<ActivatePage />} />

          {/* Route for the reset password page */}
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* Route for confirming the reset password */}
          <Route
            path="/password/reset/confirm/:uid/:token"
            element={<ResetPasswordPageConfirm />}
          />

          {/* Route for the user dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Route for handling any undefined or non-existent routes */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>

      {/* ToastContainer for displaying notifications in the application */}
      <ToastContainer />
    </>
  );
}

// Exporting the main App component
export default App;
