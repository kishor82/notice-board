import axios from "axios";
import { toast } from "react-toastify";
import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const getAuthenticateUser = async() => {
   try {
      return await axios.get("/api/auth");
   } catch (error) {
     throw error;
   }
}
const getCompanies = async () => {
  try {
   return await axios.get("/api/company/data");
   
  } catch (error) {
    toast.error("Something Went Wrong!");
  }
}

const getDepartments = async () => {
  try {
    const data = await axios.get("/api/department/data");
    return data;
  } catch (error) {
    toast.error("something Wend Wrong!");
  }
}

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [departments, setDepartments] = useState([]);


  useEffect(() => {
    (async () => {
      const companies = await getCompanies();
      const token = await getAuthenticateUser();
      const departments = await getDepartments();
      setToken(token.data);
      setCompanies(companies.data.data);
      setDepartments(departments.data.data)
    })()
  }, []);

  const permission = {
    Admin: "All",
    User: "Read Only",
    "User/w": "Read/Write",
  };
  const roles = ["Admin", "User", "User/w"];

  const handleLogin = async () => {
  try{
    const token = await getAuthenticateUser();
    setToken(token.data);
    const origin = location.state?.from?.pathname || "/dashboard";
    navigate(origin);
  }catch(error) {
    setToken(null);
  }
    
  };

  const handleLogout = async () => {

    const data = await axios.get("/api/logout");
    toast.success(data.data);
    
    setToken(null);
  };

  const value = {
    token,
    companies,
    departments,
    permission,
    roles,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
