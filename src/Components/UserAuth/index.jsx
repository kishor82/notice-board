/* eslint-disable jsx-a11y/anchor-is-valid */
import { useRef, useState } from "react";
import { useAuth } from "../../utils/AuthProvider";
import "./userAuth.css";
export const UserAuth = () => {
  const inputEl = useRef(null);
  const { onLogin, companies, departments } = useAuth();
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [registerData, setRegisterData] = useState({
    email: "",
    company: "",
    department: "",
    password: "",
    confirm_password: "",
  });
  const toggleForm = () => {
    const container = inputEl.current;
    container.classList.toggle("active");
  };

  const handleLoginChange = (e) => {
    setLoginData(() => {
      return { ...loginData, [e.target.name]: e.target.value };
    });
  };

  const handleRegisterChange = (e) => {
    setRegisterData(() => {
      return {
        ...registerData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log({ loginData });
    onLogin();
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log({ registerData });
    toggleForm();
  };
  return (
    <section>
      <div ref={inputEl} className="container">
        <div className="user signinBx">
          <div className="imgBx">
            <img
              src="https://raw.githubusercontent.com/WoojinFive/CSS_Playground/master/Responsive%20Login%20and%20Registration%20Form/img1.jpg"
              alt=""
            />
          </div>
          <div className="formBx">
            <form>
              <h2>Sign In</h2>
              <input
                type="text"
                name="username"
                required
                value={loginData.username}
                onChange={handleLoginChange}
                placeholder="Username"
              />
              <input
                type="password"
                name="password"
                required
                value={loginData.password}
                onChange={handleLoginChange}
                placeholder="Password"
              />
              <button
                type="button"
                name=""
                value=""
                onClick={handleLoginSubmit}
              >
                Login
              </button>
              <p className="signup">
                Don't have an account ?
                <a href="#" onClick={toggleForm}>
                  Sign Up.
                </a>
              </p>
            </form>
          </div>
        </div>
        <div className="user signupBx">
          <div className="formBx">
            <form>
              <h2>Create an account</h2>
              <input
                type="email"
                required
                name="email"
                onChange={handleRegisterChange}
                placeholder="Email Address"
              />
              <select
                value={registerData.company}
                onChange={handleRegisterChange}
                name="company"
              >
                <option value="" disabled hidden>
                  Company
                </option>
                {companies.map((company, index) => (
                  <option key={index} value={company}>
                    {company}
                  </option>
                ))}
              </select>
              <select
                value={registerData.department}
                onChange={handleRegisterChange}
                name="department"
              >
                <option value="" disabled hidden>
                  Department
                </option>
                {departments.map((dept, index) => (
                  <option key={`dept-${index}`} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              <input
                type="password"
                name="password"
                required
                placeholder="Create Password"
                onChange={handleRegisterChange}
              />
              <input
                type="password"
                name="confirm_password"
                required
                placeholder="Confirm Password"
                onChange={handleRegisterChange}
              />
              <button type="button" onClick={handleRegisterSubmit}>
                Sign Up
              </button>
              <p className="signup">
                Already have an account ?
                <a href="#" onClick={toggleForm}>
                  Sign in.
                </a>
              </p>
            </form>
          </div>
          <div className="imgBx">
            <img
              src="https://raw.githubusercontent.com/WoojinFive/CSS_Playground/master/Responsive%20Login%20and%20Registration%20Form/img2.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};
