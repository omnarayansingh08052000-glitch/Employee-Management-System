import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const AcceptTask = ({ data, user }) => {
  const [userData, setUserData] = useContext(AuthContext);

  const handleComplete = () => {
    const updatedUserData = userData.map((elem) => {
      if (user.firstName === elem.firstName) {
        return {
          ...elem,
          taskNumbers: {
            ...elem.taskNumbers,
            completed: elem.taskNumbers.completed + 1,
            active: elem.taskNumbers.active - 1,
          },
          tasks: elem.tasks.map((task) => {
            if (task.title === data.title) {
              return {
                ...task,
                completed: true,
                active: false,
                newTask: false,
              };
            }
            return task; // Return unchanged tasks
          }),
        };
      }
      return elem; // Return unchanged user data for other elements
    });

    setUserData(updatedUserData);
  };
  const handleFailed = () => {
    const updatedUserData = userData.map((elem) => {
      if (user.firstName === elem.firstName) {
        return {
          ...elem,
          taskNumbers: {
            ...elem.taskNumbers,
            failed: elem.taskNumbers.failed + 1,
            active: elem.taskNumbers.active - 1,
          },
          tasks: elem.tasks.map((task) => {
            if (task.title === data.title) {
              return { ...task, failed: true, active: false, newTask: false };
            }
            return task; // Return unchanged tasks
          }),
        };
      }
      return elem; // Return unchanged user data for other elements
    });

    setUserData(updatedUserData);
  };

  return (
    <div className="h-full w-[300px] bg-red-400 rounded-xl p-5 flex-shrink-0">
      <div className="flex justify-between items-center">
        <h3 className="bg-red-600 text-sm px-3 py-1 rounded">
          {data.category}
        </h3>
        <h4 className="text-sm">{data.date}</h4>
      </div>
      <h2 className="mt-5 text-2xl font-semibold">{data.title}</h2>
      <p className="text-sm mt-2">{data.description}</p>
      <div className="flex justify-between mt-4">
        <button
          className="bg-green-500 py-1 px-2 text-sm rounded-md"
          onClick={handleComplete}
        >
          Mark as Completed
        </button>
        <button
          className="bg-red-500 py-1 px-2 text-sm rounded-md"
          onClick={handleFailed}
        >
          Mark as Failed
        </button>
      </div>
    </div>
  );
};

export default AcceptTask;
