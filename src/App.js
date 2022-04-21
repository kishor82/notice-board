import { UserAuth } from "./Components/UserAuth";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./utils/AuthProvider";
import { ProtectedRoute, LoginRoute } from "./utils/ProtectedRoutes";
import { Dashboard } from "./Components/Dashboard";
import { Admin } from "./Components/Admin";
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="login"
            element={
              <LoginRoute>
                <UserAuth />
              </LoginRoute>
            }
          />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="colored"
        pauseOnHover
      />
    </Router>
  );
}

export default App;
