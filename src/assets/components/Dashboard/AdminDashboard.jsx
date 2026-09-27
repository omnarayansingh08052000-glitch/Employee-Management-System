import React from "react";
import Header from "../others/Header";
import Createtask from "../others/Createtask";
import AllTask from "../others/AllTask";

const AdminDashboard = ({ changeUser }) => {
  return (
    <div className="h-screen w-full p-10">
      <Header changeUser={changeUser} />
      <Createtask />
      <AllTask />
    </div>
  );
};

export default AdminDashboard;
