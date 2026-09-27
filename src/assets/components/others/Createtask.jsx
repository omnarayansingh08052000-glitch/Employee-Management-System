import React, { useContext, useState } from "react";
import NewTask from "../TaskList/NewTask";
import { AuthContext } from "../../context/AuthProvider";
import Swal from "sweetalert2";

const Createtask = () => {
  const [userData, setUserData] = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the assigned person exists in the userData
    const assignedUser = userData.find((elem) => elem.firstName === assignTo);

    if (!assignedUser) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "No employee found with the given name.",
        confirmButtonColor: "#f27474",
      });
      return; // Exit the function
    }

    // Create the new task object
    const task = {
      title,
      date,
      category,
      description,
      active: false,
      newTask: true,
      failed: false,
      completed: false,
    };

    // Update userData with the new task
    const updatedUserData = userData.map((elem) => {
      if (assignTo === elem.firstName) {
        return {
          ...elem,
          tasks: [...elem.tasks, task], // Add the new task directly
          taskNumbers: {
            ...elem.taskNumbers,
            newTask: elem.taskNumbers.newTask + 1, // Increment newTask count
          },
        };
      }
      return elem; // Return unchanged user data for other elements
    });

    // Update the context state
    setUserData(updatedUserData);

    // Clear form fields and show success alert
    setTitle("");
    setDate("");
    setAssignTo("");
    setCategory("");
    setDescription("");

    Swal.fire({
      icon: "success",
      title: "Task Created!",
      text: "New task added successfully to the respective employee's dashboard.",
      confirmButtonColor: "#4caf50",
    });
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="flex flex-wrap items-start justify-normal w-full bg-[#1c1c1c] mt-10 px-10 pt-5 rounded-md"
      >
        <div className="w-1/2">
          <div className="pb-2">
            <h3>Task title</h3>
            <input
              required
              className="bg-black rounded border border-1 border-white "
              type="text"
              placeholder="Make a UI design"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>

          <div className="pb-2">
            <h3>Date</h3>
            <div className="relative">
              <input
                required
                className="bg-black rounded border border-1 border-white text-white p-2 pr-10 "
                type="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
              <style jsx>
                {`
                  input[type="date"]::-webkit-calendar-picker-indicator {
                    background-color: white; /* Light background for the icon */
                    border-radius: 50%; /* Circular icon for better visibility */
                    padding: 4px; /* Add spacing around the icon */
                    cursor: pointer; /* Change cursor to pointer */
                  }
                `}
              </style>
            </div>
          </div>
          <div className="pb-2">
            <h3>Assign to</h3>
            <input
              required
              className="bg-black rounded border border-1 border-white "
              type="text"
              placeholder="Employee name"
              value={assignTo}
              onChange={(e) => {
                setAssignTo(e.target.value);
              }}
            />
          </div>
          <div className="pb-2">
            <h3>Category</h3>
            <input
              required
              className="bg-black rounded border border-1 border-white "
              type="text"
              placeholder="design, dev, etc"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            />
          </div>
        </div>
        <div>
          <div className="w-1/2">
            <h3>Description</h3>
            <textarea
              required
              className="bg-black rounded border border-1 border-white "
              name=""
              id=""
              cols="30"
              rows="8"
              placeholder="Give Description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>
          </div>
          <button className="text-black font-semibold bg-green-300 p-4 rounded-lg mt-4">
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default Createtask;
