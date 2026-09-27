import React, { useEffect } from "react";
import AcceptTask from "./AcceptTask";
import NewTask from "./NewTask";
import CompleteTask from "./CompleteTask";
import FailedTask from "./FailedTask";

const TaskList = ({ data }) => {
  return (
    <div
      id="tasklist"
      className="h-[55%] flex items-center justify-start gap-5 flex-nowrap w-full py-5  mt-10 overflow-x-auto"
    >
      {data.tasks.map((elem, ind) => {
        if (elem.newTask) {
          return <NewTask key={ind} data={elem} user={data} />;
        }
        if (elem.active) {
          return <AcceptTask key={ind} data={elem} user={data} />;
        }

        if (elem.completed) {
          return <CompleteTask key={ind} data={elem} user={data} />;
        }
        if (elem.failed) {
          return <FailedTask key={ind} data={elem} user={data} />;
        }
      })}
    </div>
  );
};

export default TaskList;
