import { useContext, useEffect, useState } from "react";
import Login from "./assets/components/Auth/Login";
import AdminDashboard from "./assets/components/Dashboard/AdminDashboard";
import EmployeeDashboard from "./assets/components/Dashboard/EmployeeDashboard";
import { AuthContext } from "./assets/context/AuthProvider";
import { setLocalStorage } from "./assets/utils/localStorage";
import Swal from "sweetalert2";

const App = () => {
  const [user, setUser] = useState(null);
  const [loggedInUserData, setLoggedInUserData] = useState(null);

  const [userData, setUserData] = useContext(AuthContext);

  useEffect(() => {
    //Run below two lines before runing whole application to store data in local storage
    // localStorage.clear();
    setLocalStorage();

    // Load the logged-in user's data from localStorage on initial load
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const parsedUser = JSON.parse(loggedInUser);
      setUser(parsedUser.role);
      setLoggedInUserData(parsedUser.data);
    }
  }, []);

  useEffect(() => {
    // Sync changes in userData to loggedInUserData
    if (user === "employee" && loggedInUserData) {
      const updatedUser = userData.find(
        (elem) => elem.email === loggedInUserData.email
      );
      if (updatedUser) {
        setLoggedInUserData(updatedUser);
        // Update localStorage to keep the data in sync across sessions
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ role: "employee", data: updatedUser })
        );
      }
    }
  }, [userData, user, loggedInUserData]);

  const handleLogin = (email, password) => {
    if (email === "admin@me.com" && password === "123") {
      setUser("admin");
      localStorage.setItem("loggedInUser", JSON.stringify({ role: "admin" }));
    } else if (userData) {
      const employee = userData.find(
        (e) => email === e.email && password === e.password
      );
      if (employee) {
        setUser("employee");
        setLoggedInUserData(employee);
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ role: "employee", data: employee })
        );
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Invalid Credentials!!!",
          confirmButtonColor: "#f27474",
        });
        return;
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Invalid Credentials!!!",
        confirmButtonColor: "#f27474",
      });
      return;
    }
  };

  return (
    <>
      {!user ? <Login handleLogin={handleLogin} /> : ""}
      {user === "admin" ? (
        <AdminDashboard changeUser={setUser} />
      ) : user === "employee" ? (
        <EmployeeDashboard changeUser={setUser} data={loggedInUserData} />
      ) : null}
    </>
  );
};

export default App;
