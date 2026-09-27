import React, { useEffect, useState } from "react";

const Header = ({ data, changeUser }) => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (!data) {
      setUserName("Admin");
    } else {
      setUserName(data.firstName);
    }
  }, [data]);

  const handleLogOut = () => {
    localStorage.setItem("loggedInUser", "");
    changeUser("");
    // window.location.reload();
  };

  return (
    <div className="flex items-end justify-between">
      <h1 className="text-2xl font-medium">
        Hello <br />{" "}
        <span className="text-3xl font-semibold">{userName} 👋</span>
      </h1>
      <button
        onClick={handleLogOut}
        className="bg-red-500 text-white text-lg font-medium px-5 py-2 rounded-sm"
      >
        Log Out
      </button>
    </div>
  );
};

export default Header;
