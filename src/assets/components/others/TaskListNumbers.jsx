import React, { useEffect } from "react";

const TaskListNumbers = ({ data }) => {
  useEffect(() => {
    return () => {
      data;
    };
  }, [data]);
  return (
    <div className="flex screen justify-between gap-5 mt-10">
      <div className="rounded-xl py-6 px-9 w-[45%] bg-red-400">
        <h2 className="text-3xl font-semibold">{data.taskNumbers.newTask}</h2>
        <h3 className="text-3xl font-medium">New Task</h3>
      </div>
      <div className="rounded-xl py-6 px-9 w-[45%] bg-green-400">
        <h2 className="text-3xl font-semibold text-black">
          {data.taskNumbers.active}
        </h2>
        <h3 className="text-3xl font-medium text-black">Active Task</h3>
      </div>
      <div className="rounded-xl py-6 px-9 w-[45%] bg-yellow-400">
        <h2 className="text-3xl font-semibold">{data.taskNumbers.completed}</h2>
        <h3 className="text-3xl font-medium">completed</h3>
      </div>
      <div className="rounded-xl py-6 px-9 w-[45%] bg-blue-400">
        <h2 className="text-3xl font-semibold">{data.taskNumbers.failed}</h2>
        <h3 className="text-3xl font-medium">failed</h3>
      </div>
    </div>
  );
};

export default TaskListNumbers;
