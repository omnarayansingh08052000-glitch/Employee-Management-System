import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const NewTask = ({ data, user }) => {
  const [userData, setUserData] = useContext(AuthContext);

  const handleSubmit = () => {
    const updatedUserData = userData.map((elem) => {
      if (user.firstName === elem.firstName) {
        return {
          ...elem,
          taskNumbers: {
            ...elem.taskNumbers,
            newTask: elem.taskNumbers.newTask - 1,
            active: elem.taskNumbers.active + 1,
          },
          tasks: elem.tasks.map((task) => {
            if (task.title === data.title) {
              return { ...task, active: true, newTask: false };
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
    <div className="h-full w-[300px] bg-blue-400 rounded-xl p-5 flex-shrink-0">
      <div className="flex justify-between items-center">
        <h3 className="bg-red-600 text-sm px-3 py-1 rounded">
          {data.category}
        </h3>
        <h4 className="text-sm">{data.date}</h4>
      </div>
      <h2 className="mt-5 text-2xl font-semibold">{data.title}</h2>
      <p className="text-sm mt-2">{data.description}</p>
      <div className="mt-4">
        <button
          className="w-full bg-green-600 rounded-xl"
          onClick={handleSubmit}
        >
          Accept Task
        </button>
      </div>
    </div>
  );
};

export default NewTask;
