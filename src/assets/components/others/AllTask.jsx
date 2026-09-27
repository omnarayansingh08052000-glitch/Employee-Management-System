import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const AllTask = () => {
  const [userData, setUserData] = useContext(AuthContext);

  return (
    <div className="bg-[#1c1c1c] p-5 rounded mt-t">
      <div className="bg-red-400 py-2 px-4 flex justify-between rounded mb-2">
        <h2 className="w-1/5 text-black font-bold ">Employee</h2>
        <h3 className="w-1/5 text-black font-bold">New Task</h3>
        <h5 className="w-1/5 text-black font-bold">Active task</h5>
        <h5 className="w-1/5 text-black font-bold">Completed</h5>
        <h5 className="w-1/5 text-black font-bold">failed</h5>
      </div>
      <div className="">
        {userData.map((elem, i) => {
          return (
            <div
              className="border border-emerald-500 py-2 px-4 flex justify-between rounded mb-2"
              key={i}
            >
              <h2 className="text-lg font-medium w-1/5 ">{elem.firstName}</h2>
              <h3 className="text-lg font-medium w-1/5 text-blue-800">
                {elem.taskNumbers.newTask}
              </h3>
              <h5 className="text-lg font-medium w-1/5  text-yellow-300">
                {elem.taskNumbers.active}
              </h5>
              <h5 className="text-lg font-medium w-1/5 text-green-800">
                {elem.taskNumbers.completed}
              </h5>
              <h5 className="text-lg font-medium w-1/5 text-red-800">
                {elem.taskNumbers.failed}
              </h5>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllTask;
